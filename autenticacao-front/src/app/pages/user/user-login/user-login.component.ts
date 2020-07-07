import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';

import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.entity';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;
  
  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router,
                      private readonly toastr: ToastrService,
                      private readonly service: AuthService
                    ) { }

  public toNewUser() {
    this.router.navigateByUrl('/user/create');
  }

  public toRecoverAccount() {
    this.router.navigateByUrl('/recover/account');
  }

  public signIn(user: User) {
    this.loading = true;
    this.service.loginUser(user).subscribe( res => {
      this.decodePayloadJWT(res.access_token);
      this.router.navigateByUrl('/user/dashboard');
      this.toastr.success('Você está autenticado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    err => {
      this.errorMessage(err);
    }).add( () => {
      this.loading = false;
    });
  }

  public decodePayloadJWT(token: any): any {
    localStorage.setItem("id_token", token);
    try {
      const result = jwt_decode(token);
      localStorage.setItem('name_user', result.name);
      localStorage.setItem('user_id', result.userid);
      localStorage.setItem('user', result.user);
    }catch (Error) {
      return null;
    }
  }

  private errorMessage(response: any) {
    const error = response.error;
    if(response.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(error.message, 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['samuelgsete', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['123456', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }
}