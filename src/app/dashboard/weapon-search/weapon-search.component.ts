/*
 * Ce composant est utilisé dans le Dashboard du jeu et permet de filtrer les armes par leur nom
 */

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { WeaponSearchService } from '../../service/weapon-search.service';
import { Weapon } from '../../data/weapon';

@Component({
  moduleId: module.id,
  selector: 'weapon-search',
  templateUrl: './weapon-search.component.html',
  styleUrls: [ './weapon-search.component.css' ],
  providers: [WeaponSearchService]
})

export class WeaponSearchComponent implements OnInit {

  weapons: Observable<Weapon[]>;

  private searchTerms = new Subject<string>();

  constructor(
    private weaponSearchService: WeaponSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.weapons = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.weaponSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Weapon[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Weapon[]>([]);
      });
  }

  gotoDetail(weapon: Weapon): void {
    let link = ['/detailArme', weapon.id];
    this.router.navigate(link);
  }
}

