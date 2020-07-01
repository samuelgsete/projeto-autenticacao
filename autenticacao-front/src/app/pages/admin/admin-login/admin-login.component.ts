import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Admin } from 'src/app/shared/models/admin.entity';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false

  public constructor(
                        private readonly _fb: FormBuilder, 
                        private readonly router: Router,
                        private readonly toastr: ToastrService,
                        private readonly service: AuthService
                    ) { }

  public toUserLogin() {
    this.router.navigateByUrl('user/login');
  }
  
  public signIn(admin: Admin) {
    this.loading = true;
    this.service.loginAdmin(admin).subscribe( res => {
      this.decodePayloadJWT(res.access_token);
      this.router.navigateByUrl('admin/dashboard');
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
      localStorage.setItem('name_admin', result.name);
      localStorage.setItem('admin', result.admin);
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
      username: ['admin', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['admin', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

}
