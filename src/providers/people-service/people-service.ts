import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the PeopleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


import 'rxjs/add/operator/map';

import { People } from '../../models/people/people.model' ;


@Injectable()
export class PeopleProvider {
    domain: string = 'http://localhost:3000/';
    id: string = '9229021';  //example run

  constructor(public http: HttpClient) {
    console.log('Hello PeopleProvider Provider');
    // console.log(localStorage.getItem('myToken'))
  }
  getPeoples(): Observable < any >   {
    return this.http.get<People[]>(`${this.domain}api/tripulante/${this.id}`)
      .map(res => res);
  }
}
