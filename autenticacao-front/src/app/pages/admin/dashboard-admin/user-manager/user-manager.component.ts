import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.entity';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  public nameAdmin: string;
  public loading: boolean = true;
  public rows: User[];

  public constructor(private readonly userService: UserService, private readonly toastr: ToastrService) {
    this.nameAdmin = localStorage.getItem('name_admin');
  }

  public load() {
    this.userService.findAll().subscribe( res => {
      this.rows = res;
      this.loading = false;
    },
    error => {
      this.errorMessage(error);
    });
  }

  public blockUser(user: User) {
    user.isActive = false;
    this.userService.update(user).subscribe( res => {
      this.load();
      this.toastr.info(`${user.name} foi bloqueado(a)`, 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    error => {
      this.errorMessage(error);
    })
  }

  public desblockUser(user: User) {
    user.isActive = true;
    this.userService.update(user).subscribe( res => {
      this.load();
      this.toastr.info(`${user.name} foi desbloqueado(a)`, 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    },
    error => {
      this.errorMessage(error);
    })
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
  }
}