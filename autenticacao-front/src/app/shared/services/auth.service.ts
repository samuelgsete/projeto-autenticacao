import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.entity';
import { Admin } from '../models/admin.entity';

@Injectable()
export class AuthService  {

  private urlBase: string = 'http://localhost:3000/auth';

  public constructor(private http: HttpClient) {}

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.urlBase.concat('/user'), user);
  }

  public logoutUser() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('name_user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user');
  }

  public userIsAutenticate(): boolean {
    const user = localStorage.getItem('user');
    if(user) {
      return true;
    }
    return false;
  }

  public loginAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(this.urlBase.concat('/admin'), admin);
  }

  public logoutAdmin() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('name_admin');
    localStorage.removeItem('admin');
  }

  public adminIsAutenticate(): boolean {
    const admin = localStorage.getItem('admin');
    if(admin) {
      return true;
    }
    return false;
  }
}