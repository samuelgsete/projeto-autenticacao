import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAccess } from '../models/user-access.entity';

@Injectable()
export class UserAccessService {

    private urlBase = "http://localhost:3000/user-access";

    public constructor(private http: HttpClient) { }

    public findAll(): Observable<UserAccess[]> {
        return this.http.get<UserAccess[]>(this.urlBase);
    }
}