import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.entity';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  public form: FormGroup;
  public nameAdmin: string;
  public loading: boolean = true;
  public rows: User[];

  public constructor(
                      private readonly _fb: FormBuilder,
                      private readonly userService: UserService, 
                      private readonly toastr: ToastrService
                    ) 
    {
    this.nameAdmin = localStorage.getItem('name_admin');
  }

  public load() {
    this.loading = true;
    this.userService.findAll().subscribe( res => {
      this.rows = res;
    },
    error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  public blockUser(user: User) {
    user.isActive = false;
    this.userService.update(user).subscribe( res => {
      this.toastr.info(`${user.name} foi bloqueado(a)`, 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
      this.load();
    });
  }

  public desblockUser(user: User) {
    user.isActive = true;
    this.userService.update(user).subscribe( res => {
      this.toastr.info(`${user.name} foi desbloqueado(a)`, 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
      this.load();
    });
  }

  public changeStatus(user: User) {
    this.loading = true;
    if(user.isActive) {
      this.blockUser(user);
    }
    else {
      this.desblockUser(user);
    }
  }

  public viewUser(modal: any, user: User) {
    modal.show();
    this.form.patchValue({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      whatzapp: user.whatzapp,
      username: user.username,
      password: user.password,
      isActive: user.isActive,
      updated: user.updated
    })
  }

  public updateUser(modal: any, userUpdated: User) {
    this.loading = true;
    const user = new User({
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
    this.userService.update(user).subscribe( res => {
      this.toastr.success('Dados atualizado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
      this.load();
      modal.hide();
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
    this.load();
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
  }
}