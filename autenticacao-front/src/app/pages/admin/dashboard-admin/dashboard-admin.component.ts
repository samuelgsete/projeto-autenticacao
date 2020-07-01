import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  public nameAdmin: string;

  public constructor(
                        private readonly router: Router,
                        private readonly toastr: ToastrService,
                        private readonly service: AuthService
                    ) 
  { 
    this.nameAdmin = localStorage.getItem('name_admin');
  }

  public signOut() {
    this.service.logoutAdmin();
    this.toastr.warning('Você está desconectado', 'Tudo ok', { progressBar: true, positionClass: 'toast-bottom-center' });
    this.router.navigateByUrl('admin/login');
  }

  ngOnInit(): void {
  }
}