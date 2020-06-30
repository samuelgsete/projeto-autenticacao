import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.entity';

@Injectable()
export class UserService {

    private urlBase = "http://localhost:3000/user";

    public constructor(private http: HttpClient) { }

    public create(user: User): Observable<any> {
        return this.http.post(this.urlBase, user);
    }

    public finalizeRegistration(code: string): Observable<any> {
        return this.http.post(this.urlBase.concat(`/${code}`), {});
    }

    public resendCode(email: string): Observable<any> {
        return this.http.put(this.urlBase.concat(`/resend`), { email });
    }
}