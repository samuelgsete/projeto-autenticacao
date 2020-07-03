import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  public nameuser: string;

  public constructor(
                      private readonly router: Router,
                      private readonly toastr: ToastrService,
                      private readonly service: AuthService
                    ) {
    this.nameuser = localStorage.getItem('name_user');
  }

  public signOut() {
    this.service.logoutUser();
    this.toastr.success('Você está desconectado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    this.router.navigateByUrl('user/login');
  }

  public toProfile() {
    this.router.navigateByUrl(`user/profile/6`);
  }

  ngOnInit(): void {
  }

}
