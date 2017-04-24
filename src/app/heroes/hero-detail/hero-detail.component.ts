/*
* Ce composant permet de présenter les détails d'un héro et de modifier ses caractéristiques:
*      - la somme de toutes les valeurs du héro ne peut pas dépasser 40
*      - des messages d'erreurs sont affichés en cas d'ajustement nécessaire de l'utilisateur
*      - la validation du formulaire est possible uniquement si les valeurs saisies sont valides
*/

import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HeroService } from '../../service/hero.service';
import {WeaponService} from "../../service/weapon.service";

import { Hero } from '../../data/hero';
import {Weapon} from "../../data/weapon";

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, DoCheck{

  constructor(
    private heroService: HeroService,
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  oldHeroName: string;
  oldHeroAttaque: number;
  oldHeroEsquive: number;
  oldHeroDegats: number;
  oldHeroPv: number;

  messageName: string = "";
  messageAttaque: string = "";
  messageEsquive: string = "";
  messageDegats: string = "";
  messagePv: string = "";
  messageTotal: string = "";

  validForm: boolean;

  hero: Hero = new Hero();

  weapons: Weapon[];

  //Gestion des classes pour la validité des champs du formulaire
  nameClasses : {};
  attaqueClasses: {};
  esquiveClasses: {};
  degatsClasses: {};
  pvClasses: {};

  setNameClasses () {
      this.nameClasses = {
        valid: this.messageName.length == 0,
        invalid: this.messageName.length > 0
      };
    }

    setAttaqueClasses() {
      this.attaqueClasses = {
        valid: (this.messageAttaque.length == 0) && (this.messageTotal.length == 0),
        invalid: (this.messageAttaque.length > 0) || (this.messageTotal.length > 0)
      };
    }

    setEsquiveClasses() {
      this.esquiveClasses = {
        valid: (this.messageEsquive.length == 0) && (this.messageTotal.length == 0),
        invalid: (this.messageEsquive.length > 0) || (this.messageTotal.length > 0)
      };
    }

    setDegatsClasses() {
      this.degatsClasses = {
        valid: (this.messageDegats.length == 0) && (this.messageTotal.length == 0),
        invalid: (this.messageDegats.length > 0) || (this.messageTotal.length > 0)
      };
    }

    setPvClasses(){
    this.pvClasses = {
      valid: (this.messagePv.length == 0) && (this.messageTotal.length == 0),
      invalid: (this.messagePv.length > 0) || (this.messageTotal.length > 0)
    };
  }

  getWeapons(): void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }

  //Initialisation du composant
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);

    this.getWeapons();
  }

  /*
  * Observation des entrées de l'utilisateur au niveau du formulaire
  * Initialisation des messages d'erreur si les valeurs saisies sont invalides
  */
  ngDoCheck(): void {
    if((this.hero.name != this.oldHeroName) ||
        this.hero.attaque != this.oldHeroAttaque ||
          this.hero.esquive != this.oldHeroEsquive ||
            this.hero.degats != this.oldHeroDegats ||
              this.hero.pv != this.oldHeroPv){

      if(this.hero.name != this.oldHeroName){
        if(this.hero.name.trim().length == 0)
          this.messageName = 'Le nom du héro ne peut pas être vide';
        else
          this.messageName = '';

        this.oldHeroName = this.hero.name;
      }

      if(this.hero.attaque != this.oldHeroAttaque){
        if(this.hero.attaque < 1)
          this.messageAttaque = "La valeur de l'attaque doit être supérieure à 1";
        else
          this.messageAttaque = '';

        this.oldHeroAttaque = this.hero.attaque;
      }

      if(this.hero.esquive != this.oldHeroEsquive){
        if(this.hero.esquive < 1)
          this.messageEsquive = "La valeur de l'esquive doit être supérieure à 1";
        else
          this.messageEsquive = '';

        this.oldHeroEsquive = this.hero.esquive;
      }

      if(this.hero.degats != this.oldHeroDegats){
        if(this.hero.degats < 1)
          this.messageDegats = "La valeur des dégats doit être supérieure à 1";
        else
          this.messageDegats = '';

        this.oldHeroDegats = this.hero.degats;
      }

      if(this.hero.pv != this.oldHeroPv){
        if(this.hero.pv < 1)
          this.messagePv = "La valeur des points de vie doit être supérieure à 1";
        else
          this.messagePv = '';

        this.oldHeroPv = this.hero.pv;
      }

      let total = this.hero.attaque + this.hero.esquive + this.hero.degats + this.hero.pv;

      if(total > 40)
        this.messageTotal = 'La somme des valeurs ne peut pas excéder 40. Valeur actuelle: ' + total;
      else
        this.messageTotal = '';
    }

    //Initialisation des classes pour les styles du formulaire en fonction des messages d'erreur éventuels
    this.setNameClasses();
    this.setAttaqueClasses();
    this.setEsquiveClasses();
    this.setDegatsClasses();
    this.setPvClasses();

    this.validForm = (this.messageName.length == 0)
                      && (this.messageAttaque.length == 0)
                      && (this.messageDegats.length == 0
                      && (this.messageEsquive.length == 0)
                      && (this.messagePv.length == 0)
                      && (this.messageTotal.length == 0));
  }

  //Sauvegarde des modifications effectuées par l'utilisateur
  save(): void {
      this.heroService.update(this.hero)
        .then(() => this.goBack());
  }

  //Retour à la page précédente
  goBack(): void {
    this.location.back();
  }
}

