import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Weapon } from '../data/weapon';


@Injectable()
export class WeaponService {

  private weaponsUrl = 'api/weapons';  // URL to web api

  constructor(private http: Http) { }

  getWeapons(): Promise<Weapon[]> {
    return this.http.get(this.weaponsUrl)
      .toPromise()
      .then(response => response.json().data as Weapon[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getWeapon(id: number): Promise<Weapon> {
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Weapon)
      .catch(this.handleError);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(weapon: Weapon): Promise<Weapon> {
    const url = `${this.weaponsUrl}/${weapon.id}`;
    return this.http
      .put(url, JSON.stringify(weapon), {headers: this.headers})
      .toPromise()
      .then(() => weapon)
      .catch(this.handleError);
  }

  create(name: string): Promise<Weapon> {
    return this.http
      .post(this.weaponsUrl, JSON.stringify({name: name, bonusAttaque: 0, bonusEsquive: 0, bonusDegats: 0, bonusPv: 0}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
