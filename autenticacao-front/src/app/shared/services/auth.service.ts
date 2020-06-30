import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user.entity';

@Injectable()
export class AuthService  {

  private urlBase: string = 'http://localhost:3000/auth';

  public constructor(private http: HttpClient,private router: Router) {}

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.urlBase.concat('/user'), user);
  }

  public logoutUser() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('name_user');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user/login');
  }

  public userIsAutenticate(): boolean {
    const user = localStorage.getItem('user');
    if(user) {
      return true;
    }
    return false;
  }
}
