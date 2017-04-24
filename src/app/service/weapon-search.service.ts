import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Weapon }           from '../data/weapon';

@Injectable()
export class WeaponSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Weapon[]> {
    return this.http
      .get(`app/weapons/?name=${term}`)
      .map(response => response.json().data as Weapon[]);
  }
}
