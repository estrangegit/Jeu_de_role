/*
* Ce composant présente la liste des héros et propose plusieurs fonctionnalistés:
*     - tri en fonction des attributs du héro
*     - formulaire d'ajout d'un héro
*     - Navigation vers l'éditeur du héro et visionnage des détails
*/
import {Component} from '@angular/core';
import {OnInit, DoCheck} from '@angular/core';

import {Hero} from '../../data/hero';
import {HeroService} from "../../service/hero.service";
import {Router} from "@angular/router";


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
//  providers: [HeroService]
})


export class HeroesComponent implements OnInit, DoCheck{
  constructor(private heroService: HeroService, private router: Router,) {}

  selectedHero: Hero;
  heroes: Hero[];

  //Variables nécessaire aux fonctions de tri
  sortHeroIdAsc: boolean = true;
  sortHeroIdActive: boolean = false;
  sortHeroNameAsc: boolean = true;
  sortHeroNameActive: boolean = false;
  sortHeroAttaqueAsc: boolean = true;
  sortHeroAttaqueActive: boolean = false;
  sortHeroEsquiveAsc: boolean = true;
  sortHeroEsquiveActive: boolean = false;
  sortHeroDegatsAsc: boolean = true;
  sortHeroDegatsActive: boolean = false;
  sortHeroPvAsc: boolean = true;
  sortHeroPvActive: boolean = false;

  //Classes pour la gestion des styles des boutons de tri
  currentClassesSortIdButton: {};
  currentClassesSortNameButton: {};
  currentClassesSortAttaqueButton: {};
  currentClassesSortEsquiveButton: {};
  currentClassesSortDegatsButton: {};
  currentClassesSortPvButton: {};

  classesSortMessage: {};
  sortMessage: String = '';

  //Fonction de modification des valeurs pour les classes de style du message de filrage
  setClassesSortMessage(){
    this.classesSortMessage = {
      ascSortClass: (this.sortHeroIdActive && !this.sortHeroIdAsc) ||
                    (this.sortHeroNameActive && !this.sortHeroNameAsc) ||
                    (this.sortHeroAttaqueActive && !this.sortHeroAttaqueAsc) ||
                    (this.sortHeroEsquiveActive && !this.sortHeroEsquiveAsc) ||
                    (this.sortHeroDegatsActive && !this.sortHeroDegatsAsc) ||
                    (this.sortHeroPvActive && !this.sortHeroPvAsc),

      descSortClass: (this.sortHeroIdActive && this.sortHeroIdAsc) ||
                    (this.sortHeroNameActive && this.sortHeroNameAsc) ||
                    (this.sortHeroAttaqueActive && this.sortHeroAttaqueAsc) ||
                    (this.sortHeroEsquiveActive && this.sortHeroEsquiveAsc) ||
                    (this.sortHeroDegatsActive && this.sortHeroDegatsAsc) ||
                    (this.sortHeroPvActive && this.sortHeroPvAsc),
    }
  }

  //Fonction de modification des messages de tri
  setSortMessage(){
    if((this.sortHeroIdActive && this.sortHeroIdAsc) ||
      (this.sortHeroNameActive && this.sortHeroNameAsc) ||
      (this.sortHeroAttaqueActive && this.sortHeroAttaqueAsc) ||
      (this.sortHeroEsquiveActive && this.sortHeroEsquiveAsc) ||
      (this.sortHeroDegatsActive && this.sortHeroDegatsAsc) ||
      (this.sortHeroPvActive && this.sortHeroPvAsc))
      this.sortMessage = 'Tri par ordre décroissant';
    else if((this.sortHeroIdActive && !this.sortHeroIdAsc) ||
      (this.sortHeroNameActive && !this.sortHeroNameAsc) ||
      (this.sortHeroAttaqueActive && !this.sortHeroAttaqueAsc) ||
      (this.sortHeroEsquiveActive && !this.sortHeroEsquiveAsc) ||
      (this.sortHeroDegatsActive && !this.sortHeroDegatsAsc) ||
      (this.sortHeroPvActive && !this.sortHeroPvAsc))
        this.sortMessage = 'Tri par ordre croissant';
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par identifiant
  setCurrentClassesSortIdButton(){
    this.currentClassesSortIdButton = {
      ascSortClass: !this.sortHeroIdAsc,
      descSortClass: this.sortHeroIdAsc,
      sortInactive: !this.sortHeroIdActive
    }
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par le nom
  setCurrentClassesSortNameButton(){
    this.currentClassesSortNameButton = {
      ascSortClass: !this.sortHeroNameAsc,
      descSortClass: this.sortHeroNameAsc,
      sortInactive: !this.sortHeroNameActive
    }
  }

  //Fonction de modification des valeurs pour les classe de style pour le bouton de filtrage par l'attribut d'attaque
  setCurrentClassesSortAttaqueButton(){
    this.currentClassesSortAttaqueButton = {
      ascSortClass: !this.sortHeroAttaqueAsc,
      descSortClass: this.sortHeroAttaqueAsc,
      sortInactive: !this.sortHeroAttaqueActive
    }
  }

  //Fonction de modification des valeurs pour les classe de style pour le bouton de filtrage par l'attribut d'esquive
  setCurrentClassesSortEsquiveButton(){
    this.currentClassesSortEsquiveButton = {
      ascSortClass: !this.sortHeroEsquiveAsc,
      descSortClass: this.sortHeroEsquiveAsc,
      sortInactive: !this.sortHeroEsquiveActive
    }
  }

  //Fonction de modification des valeurs pour les classe de style pour le bouton de filtrage par l'attribut de dégats
  setCurrentClassesSortDegatsButton(){
    this.currentClassesSortDegatsButton = {
      ascSortClass: !this.sortHeroDegatsAsc,
      descSortClass: this.sortHeroDegatsAsc,
      sortInactive: !this.sortHeroDegatsActive
    }
  }

  //Fonction de modification des valeurs pour les classe de style pour le bouton de filtrage par l'attribut de points de vie
  setCurrentClassesSortPvButton(){
    this.currentClassesSortPvButton = {
      ascSortClass: !this.sortHeroPvAsc,
      descSortClass: this.sortHeroPvAsc,
      sortInactive: !this.sortHeroPvActive
    }
  }

  //fonction pour trier un tableau en utilisant une propriété spécifique
  dynamicSort(property){
    let sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  getHeroesSortedById(): void {
    if(this.sortHeroIdAsc)
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('id')));
    else
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('-id')));

    this.sortHeroIdAsc = !this.sortHeroIdAsc;

    this.sortHeroIdActive = true;
    this.sortHeroNameActive = false;
    this.sortHeroAttaqueActive = false;
    this.sortHeroEsquiveActive = false;
    this.sortHeroDegatsActive = false;
    this.sortHeroPvActive = false;
  }

  getHeroesSortedByName(): void {
    if(this.sortHeroNameAsc)
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('name')));
    else
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('-name')));

    this.sortHeroNameAsc = !this.sortHeroNameAsc;
    this.sortHeroIdActive = false;
    this.sortHeroNameActive = true;
    this.sortHeroAttaqueActive = false;
    this.sortHeroEsquiveActive = false;
    this.sortHeroDegatsActive = false;
    this.sortHeroPvActive = false;
  }

  getHeroesSortedByAttaque(): void {
    if(this.sortHeroAttaqueAsc)
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('attaque')));
    else
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('-attaque')));

    this.sortHeroAttaqueAsc = !this.sortHeroAttaqueAsc;
    this.sortHeroIdActive = false;
    this.sortHeroNameActive = false;
    this.sortHeroAttaqueActive = true;
    this.sortHeroEsquiveActive = false;
    this.sortHeroDegatsActive = false;
    this.sortHeroPvActive = false;
  }

  getHeroesSortedByEsquive(): void {
    if(this.sortHeroEsquiveAsc)
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('esquive')));
    else
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('-esquive')));

    this.sortHeroEsquiveAsc = !this.sortHeroEsquiveAsc;
    this.sortHeroIdActive = false;
    this.sortHeroNameActive = false;
    this.sortHeroAttaqueActive = false;
    this.sortHeroEsquiveActive = true;
    this.sortHeroDegatsActive = false;
    this.sortHeroPvActive = false;
  }

  getHeroesSortedByDegats(): void {
    if(this.sortHeroDegatsAsc)
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('degats')));
    else
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('-degats')));

    this.sortHeroDegatsAsc = !this.sortHeroDegatsAsc;
    this.sortHeroIdActive = false;
    this.sortHeroNameActive = false;
    this.sortHeroAttaqueActive = false;
    this.sortHeroEsquiveActive = false;
    this.sortHeroDegatsActive = true;
    this.sortHeroPvActive = false;
  }

  getHeroesSortedByPv(): void {
    if(this.sortHeroPvAsc)
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('pv')));
    else
      this.heroService.getHeroes().then(heroes => this.heroes = heroes.sort(this.dynamicSort('-pv')));

    this.sortHeroPvAsc  = !this.sortHeroPvAsc;
    this.sortHeroIdActive = false;
    this.sortHeroNameActive = false;
    this.sortHeroAttaqueActive = false;
    this.sortHeroEsquiveActive = false;
    this.sortHeroDegatsActive = false;
    this.sortHeroPvActive = true;
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    this.getHeroesSortedById();
  }

  ngDoCheck(): void{
    this.setCurrentClassesSortIdButton();
    this.setCurrentClassesSortNameButton();
    this.setCurrentClassesSortAttaqueButton();
    this.setCurrentClassesSortEsquiveButton();
    this.setCurrentClassesSortDegatsButton();
    this.setCurrentClassesSortPvButton();

    this.setClassesSortMessage();
    this.setSortMessage();
  }

  //Navigation vers la page de visualisation des caractéristiques et l'éditeur de héro
  gotoDetail(): void {
    this.router.navigate(['/detailHero', this.selectedHero.id]);
  }

  //Fonction appelée lors de l'ajout d'un héro
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  //Fonction appelée lors de la suppression d'un héro
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

}
