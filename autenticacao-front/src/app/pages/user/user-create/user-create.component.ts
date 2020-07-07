import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.entity';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;

  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router,
                      private readonly toastr: ToastrService,
                      private readonly service: UserService
                    ) { }

  public toLogin() {
    this.router.navigateByUrl('/user/login');
  }

  public createUser(data: any) {
    this.loading = true;

    let user = new User({
      name: data.name,
      surname: data.surname,
      email: data.email,
      whatzapp: data.whatzapp,
      username: data.username,
      password: data.password
    });

    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    
    this.service.create(user).subscribe( response => {
      this.router.navigateByUrl('/confirm/account');
    },
    erro => {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.errorMessage(erro);
    }).add( () => {
      this.loading = false;
    });
  }

  public showPassword(input: any, icon: any) {
    input.type = 'text';
    icon._elementRef.nativeElement.firstChild.data = 'visibility';
  }

  public hidePassword(input: any, icon: any) {
    icon._elementRef.nativeElement.firstChild.data = 'visibility_off';
    input.type = 'password';
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
      name: ['Samuel', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      surname: ['Souza', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['samueltaveira1@gmail.com', [Validators.required, Validators.email]],
      whatzapp: ['(85) 98971-1010', [Validators.required]],
      username: ['samuelgsete', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['123456', Validators.required]
    });
  }
}