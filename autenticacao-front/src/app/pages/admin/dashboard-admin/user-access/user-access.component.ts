import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { UserAccess } from 'src/app/shared/models/user-access.entity';
import { UserAccessService } from 'src/app/shared/services/user-access.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {

  public nameAdmin: string;
  public loading: boolean = true;
  public rows: UserAccess[];

  public constructor(private readonly toastr: ToastrService, private readonly service: UserAccessService) {
    this.nameAdmin = localStorage.getItem('name_admin');
  }

  public load() {
    this.service.findAll().subscribe( res => {
      this.loading = false;
      this.rows = res;
    },
    error => {
      this.errorMessage(error);
    });
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