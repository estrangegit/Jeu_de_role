/*
 * Ce composant présente la liste des armes et propose plusieurs fonctionnalistés:
 *     - tri en fonction des attributs de l'arme
 *     - formulaire d'ajout d'une arme
 *     - Navigation vers l'éditeur de l'arme et visionnage des détails
 */
import {Component} from '@angular/core';
import {OnInit, DoCheck} from '@angular/core';

import {Weapon} from '../../data/weapon';
import {Hero} from '../../data/hero';
import {WeaponService} from "../../service/weapon.service";
import {HeroService} from "../../service/hero.service";
import {Router} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'my-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css'],
//  providers: [WeaponService]
})


export class WeaponsComponent implements OnInit, DoCheck {
  constructor(private weaponService: WeaponService,
              private heroService: HeroService,
              private router: Router) {}

  selectedWeapon: Weapon;

  weapons: Weapon[];
  heroes: Hero[];

  //Variables nécessaire aux fonctions de tri
  sortWeaponIdAsc: boolean = true;
  sortWeaponIdActive: boolean = false;
  sortWeaponNameAsc: boolean = true;
  sortWeaponNameActive: boolean = false;
  sortWeaponBonusAttaqueAsc: boolean = true;
  sortWeaponBonusAttaqueActive: boolean = false;
  sortWeaponBonusEsquiveAsc: boolean = true;
  sortWeaponBonusEsquiveActive: boolean = false;
  sortWeaponBonusDegatsAsc: boolean = true;
  sortWeaponBonusDegatsActive: boolean = false;
  sortWeaponBonusPvAsc: boolean = true;
  sortWeaponBonusPvActive: boolean = false;

  //Classes pour la gestion des styles des boutons de tri
  currentClassesSortIdButton: {};
  currentClassesSortNameButton: {};
  currentClassesSortBonusAttaqueButton: {};
  currentClassesSortBonusEsquiveButton: {};
  currentClassesSortBonusDegatsButton: {};
  currentClassesSortBonusPvButton: {};


  classesSortMessage: {};
  sortMessage: String = '';

  //Fonction de modification des valeurs pour les classes de style du message de filrage
  setClassesSortMessage(){
    this.classesSortMessage = {
      ascSortClass: (this.sortWeaponIdActive && !this.sortWeaponIdAsc) ||
      (this.sortWeaponNameActive && !this.sortWeaponNameAsc) ||
      (this.sortWeaponBonusAttaqueActive && !this.sortWeaponBonusAttaqueAsc) ||
      (this.sortWeaponBonusEsquiveActive && !this.sortWeaponBonusEsquiveAsc) ||
      (this.sortWeaponBonusDegatsActive && !this.sortWeaponBonusDegatsAsc) ||
      (this.sortWeaponBonusPvActive && !this.sortWeaponBonusPvAsc),

      descSortClass: (this.sortWeaponIdActive && this.sortWeaponIdAsc) ||
      (this.sortWeaponNameActive && this.sortWeaponNameAsc) ||
      (this.sortWeaponBonusAttaqueActive && this.sortWeaponBonusAttaqueAsc) ||
      (this.sortWeaponBonusEsquiveActive && this.sortWeaponBonusEsquiveAsc) ||
      (this.sortWeaponBonusDegatsActive && this.sortWeaponBonusDegatsAsc) ||
      (this.sortWeaponBonusPvActive && this.sortWeaponBonusPvAsc),
    }
  }

  //Fonction de modification des messages de tri
  setSortMessage(){
    if((this.sortWeaponIdActive && this.sortWeaponIdAsc) ||
      (this.sortWeaponNameActive && this.sortWeaponNameAsc) ||
      (this.sortWeaponBonusAttaqueActive && this.sortWeaponBonusAttaqueAsc) ||
      (this.sortWeaponBonusEsquiveActive && this.sortWeaponBonusEsquiveAsc) ||
      (this.sortWeaponBonusDegatsActive && this.sortWeaponBonusDegatsAsc) ||
      (this.sortWeaponBonusPvActive && this.sortWeaponBonusPvAsc))
      this.sortMessage = 'Tri par ordre décroissant';
    else if((this.sortWeaponIdActive && !this.sortWeaponIdAsc) ||
      (this.sortWeaponNameActive && !this.sortWeaponNameAsc) ||
      (this.sortWeaponBonusAttaqueActive && !this.sortWeaponBonusAttaqueAsc) ||
      (this.sortWeaponBonusEsquiveActive && !this.sortWeaponBonusEsquiveAsc) ||
      (this.sortWeaponBonusDegatsActive && !this.sortWeaponBonusDegatsAsc) ||
      (this.sortWeaponBonusPvActive && !this.sortWeaponBonusPvAsc))
      this.sortMessage = 'Tri par ordre croissant';
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par identifiant
  setCurrentClassesSortIdButton(){
    this.currentClassesSortIdButton = {
      ascSortClass: !this.sortWeaponIdAsc,
      descSortClass: this.sortWeaponIdAsc,
      sortInactive: !this.sortWeaponIdActive
    }
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par le nom
  setCurrentClassesSortNameButton(){
    this.currentClassesSortNameButton = {
      ascSortClass: !this.sortWeaponNameAsc,
      descSortClass: this.sortWeaponNameAsc,
      sortInactive: !this.sortWeaponNameActive
    }
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par le bonus d'attaque
  setCurrentClassesSortBonusAttaqueButton(){
    this.currentClassesSortBonusAttaqueButton = {
      ascSortClass: !this.sortWeaponBonusAttaqueAsc,
      descSortClass: this.sortWeaponBonusAttaqueAsc,
      sortInactive: !this.sortWeaponBonusAttaqueActive
    }
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par le bonus d'esquive
  setCurrentClassesSortBonusEsquiveButton(){
    this.currentClassesSortBonusEsquiveButton = {
      ascSortClass: !this.sortWeaponBonusEsquiveAsc,
      descSortClass: this.sortWeaponBonusEsquiveAsc,
      sortInactive: !this.sortWeaponBonusEsquiveActive
    }
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par le bonus de dégats
  setCurrentClassesSortBonusDegatsButton(){
    this.currentClassesSortBonusDegatsButton = {
      ascSortClass: !this.sortWeaponBonusDegatsAsc,
      descSortClass: this.sortWeaponBonusDegatsAsc,
      sortInactive: !this.sortWeaponBonusDegatsActive
    }
  }

  //Fonction de modification des valeurs pour les classes de style pour le bouton de filtrage par le bonus de points de vie
  setCurrentClassesSortBonusPvButton(){
    this.currentClassesSortBonusPvButton = {
      ascSortClass: !this.sortWeaponBonusPvAsc,
      descSortClass: this.sortWeaponBonusPvAsc,
      sortInactive: !this.sortWeaponBonusPvActive
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

  getWeapons(): void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }

  getHeroes(): void{
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  getWeaponsSortedById(): void {
    if(this.sortWeaponIdAsc)
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('id')));
    else
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('-id')));

    this.sortWeaponIdAsc = !this.sortWeaponIdAsc;

    this.sortWeaponIdActive = true;
    this.sortWeaponNameActive = false;
    this.sortWeaponBonusAttaqueActive = false;
    this.sortWeaponBonusEsquiveActive = false;
    this.sortWeaponBonusDegatsActive = false;
    this.sortWeaponBonusPvActive = false;
  }

  getWeaponsSortedByName(): void {
    if(this.sortWeaponNameAsc)
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('name')));
    else
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('-name')));

    this.sortWeaponNameAsc = !this.sortWeaponNameAsc;
    this.sortWeaponIdActive = false;
    this.sortWeaponNameActive = true;
    this.sortWeaponBonusAttaqueActive = false;
    this.sortWeaponBonusEsquiveActive = false;
    this.sortWeaponBonusDegatsActive = false;
    this.sortWeaponBonusPvActive = false;
  }

  getWeaponsSortedByBonusAttaque(): void {
    if(this.sortWeaponBonusAttaqueAsc)
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('bonusAttaque')));
    else
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('-bonusAttaque')));

    this.sortWeaponBonusAttaqueAsc = !this.sortWeaponBonusAttaqueAsc;
    this.sortWeaponIdActive = false;
    this.sortWeaponNameActive = false;
    this.sortWeaponBonusAttaqueActive = true;
    this.sortWeaponBonusEsquiveActive = false;
    this.sortWeaponBonusDegatsActive = false;
    this.sortWeaponBonusPvActive = false;
  }

  getWeaponsSortedByBonusEsquive(): void {
    if(this.sortWeaponBonusEsquiveAsc)
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('bonusEsquive')));
    else
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('-bonusEsquive')));

    this.sortWeaponBonusEsquiveAsc = !this.sortWeaponBonusEsquiveAsc;
    this.sortWeaponIdActive = false;
    this.sortWeaponNameActive = false;
    this.sortWeaponBonusAttaqueActive = false;
    this.sortWeaponBonusEsquiveActive = true;
    this.sortWeaponBonusDegatsActive = false;
    this.sortWeaponBonusPvActive = false;
  }

  getWeaponsSortedByBonusDegats(): void {
    if(this.sortWeaponBonusDegatsAsc)
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('bonusDegats')));
    else
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('-bonusDegats')));

    this.sortWeaponBonusDegatsAsc = !this.sortWeaponBonusDegatsAsc;
    this.sortWeaponIdActive = false;
    this.sortWeaponNameActive = false;
    this.sortWeaponBonusAttaqueActive = false;
    this.sortWeaponBonusEsquiveActive = false;
    this.sortWeaponBonusDegatsActive = true;
    this.sortWeaponBonusPvActive = false;
  }

  getWeaponsSortedByBonusPv(): void {
    if(this.sortWeaponBonusPvAsc)
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('bonusPv')));
    else
      this.weaponService.getWeapons().then(weapons => this.weapons = weapons.sort(this.dynamicSort('-bonusPv')));

    this.sortWeaponBonusPvAsc  = !this.sortWeaponBonusPvAsc;
    this.sortWeaponIdActive = false;
    this.sortWeaponNameActive = false;
    this.sortWeaponBonusAttaqueActive = false;
    this.sortWeaponBonusEsquiveActive = false;
    this.sortWeaponBonusDegatsActive = false;
    this.sortWeaponBonusPvActive = true;
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  ngOnInit(): void {
    this.getWeaponsSortedById();
    this.getHeroes();
  }

  ngDoCheck(): void{
    this.setCurrentClassesSortIdButton();
    this.setCurrentClassesSortNameButton();
    this.setCurrentClassesSortBonusAttaqueButton();
    this.setCurrentClassesSortBonusEsquiveButton();
    this.setCurrentClassesSortBonusDegatsButton();
    this.setCurrentClassesSortBonusPvButton();

    this.setClassesSortMessage();
    this.setSortMessage();
  }

  //Navigation vers la page de visualisation des caractéristiques et l'éditeur de l'arme
  gotoDetail(): void {
    this.router.navigate(['/detailArme', this.selectedWeapon.id]);
  }

  //Fonction appelée lors de l'ajout d'une arme
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.weaponService.create(name)
      .then(weapon => {
        this.weapons.push(weapon);
        this.selectedWeapon = null;
      });
  }

  //Fonction appelée lors de la suppression d'une arme
  delete(weapon: Weapon): void {
    this.weaponService
      .delete(weapon.id)
      .then(() => {
        //gestion des variables weapons et selectedWeapon du composant
        this.weapons = this.weapons.filter(h => h !== weapon);
        if (this.selectedWeapon === weapon) { this.selectedWeapon = null; }
      })
      .then(()=>{
        //suppression de l'arme pour le joueur qui l'utilise
        for(let i = 0; i < this.heroes.length; i++){
          let hero = this.heroes[i];
          let indexArme = hero.armes.indexOf(weapon.id);

          if(indexArme >= 0){
            hero.armes.splice(indexArme, 1);
            this.heroService.update(hero);
          }
        }
      });
  }

}
