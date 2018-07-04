

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
    domain: string = 'http://localhost:3000/';

  constructor(public http: HttpClient) {
    console.log('Hello PeopleProvider Provider');

  }
  getToken(newAuth): Observable < any >  {
    return this.http.post(`${this.domain}api/authenticate`, newAuth)
      .map(res => res);

  }

}
