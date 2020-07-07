import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/shared/models/user.entity';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  public form: FormGroup;
  public user: User = new User();
  public loading: boolean = true;

  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router,
                      private readonly toastr: ToastrService,
                      private readonly service: UserService
                    ) { }

  public load() {
    this.loading = true;
    const id = parseInt(localStorage.getItem('user_id'));
    this.service.findById(id).subscribe( res => {
      this.user = res;
      this.form.patchValue({
        id: this.user.id,
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        whatzapp: this.user.whatzapp,
        username: this.user.username,
        password: this.user.password,
        isActive: this.user.isActive,
        updated: this.user.updated
      })
    },
    error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  public toDashboard() {
    this.router.navigateByUrl('user/dashboard');
  }

  public updateProfile(userUpdated: any) {
    this.loading = true;
    this.user = new User({
      id: userUpdated.id,
      name: userUpdated.name,
      surname: userUpdated.surname,
      email: userUpdated.email,
      whatzapp: userUpdated.whatzapp,
      username: userUpdated.username,
      password: userUpdated.password,
      isActive: userUpdated.isActive,
      updated: userUpdated.updated
    });
    this.service.update(this.user).subscribe( res => {
      this.toastr.success('Dados atualizado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    error => {
      this.errorMessage(error);
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
      id: [],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      whatzapp: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', Validators.required],
      isActive: [],
      updated: []
    });
    this.load();
  }
}