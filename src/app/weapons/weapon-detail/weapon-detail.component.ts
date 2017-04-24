/*
 * Ce composant permet de présenter les détails d'une arme et de modifier ses caractéristiques:
 *      - la somme de toutes les valeurs de l'arme ne peut pas dépasser 0
 *      - des messages d'erreurs sont affichés en cas d'ajustement nécessaire de la part l'utilisateur
 *      - la validation du formulaire est possible uniquement si les valeurs saisies sont valides
 */

import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { WeaponService } from '../../service/weapon.service';


import { Weapon } from '../../data/weapon';

@Component({
  selector: 'my-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit, DoCheck{

  constructor(
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  oldWeaponName: string;
  oldWeaponBonusAttaque: number;
  oldWeaponBonusEsquive: number;
  oldWeaponBonusDegats: number;
  oldWeaponBonusPv: number;

  messageName: string = "";
  messageBonusAttaque: string = "";
  messageBonusEsquive: string = "";
  messageBonusDegats: string = "";
  messageBonusPv: string = "";
  messageTotal: string = "";

  validForm: boolean;

  weapon: Weapon = new Weapon();

  //Gestion des classes pour la validité des champs du formulaire
  nameClasses: {};
  bonusAttaqueClasses: {};
  bonusEsquiveClasses: {};
  bonusDegatsClasses: {};
  bonusPvClasses: {};

  setNameClasses () {
    this.nameClasses = {
      valid: this.messageName.length == 0,
      invalid: this.messageName.length > 0
    };
  }

  setBonusAttaqueClasses() {
    this.bonusAttaqueClasses = {
      valid: (this.messageBonusAttaque.length == 0) && (this.messageTotal.length == 0),
      invalid: (this.messageBonusAttaque.length > 0) || (this.messageTotal.length > 0)
    };
  }

  setBonusEsquiveClasses() {
    this.bonusEsquiveClasses = {
      valid: (this.messageBonusEsquive.length == 0) && (this.messageTotal.length == 0),
      invalid: (this.messageBonusEsquive.length > 0) || (this.messageTotal.length > 0)
    };
  }

  setBonusDegatsClasses() {
    this.bonusDegatsClasses = {
      valid: (this.messageBonusDegats.length == 0) && (this.messageTotal.length == 0),
      invalid: (this.messageBonusDegats.length > 0) || (this.messageTotal.length > 0)
    };
  }

  setBonusPvClasses() {
    this.bonusPvClasses = {
      valid: (this.messageBonusPv.length == 0) && (this.messageTotal.length == 0),
      invalid: (this.messageBonusPv.length > 0) || (this.messageTotal.length > 0)
    };
  }

  //Initialisation du composant
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.weaponService.getWeapon(+params['id']))
      .subscribe(weapon => this.weapon = weapon);
  }

  /*
   * Observation des entrées de l'utilisateur au niveau du formulaire
   * Initialisation des messages d'erreur si les valeurs saisies sont invalides
   */
  ngDoCheck(): void {
      if((this.weapon.name != this.oldWeaponName) ||
        this.weapon.bonusAttaque != this.oldWeaponBonusAttaque ||
        this.weapon.bonusEsquive != this.oldWeaponBonusEsquive ||
        this.weapon.bonusDegats != this.oldWeaponBonusDegats ||
        this.weapon.bonusPv != this.oldWeaponBonusPv){

        if(this.weapon.name != this.oldWeaponName){
          if(this.weapon.name.trim().length == 0)
            this.messageName = 'Le nom de l\'arme ne peut pas être vide';
          else
            this.messageName = '';

          this.oldWeaponName = this.weapon.name;
        }

        if(this.weapon.bonusAttaque != this.oldWeaponBonusAttaque){
          if((this.weapon.bonusAttaque < -5) || (this.weapon.bonusAttaque > 5) || (this.weapon.bonusAttaque == null))
            this.messageBonusAttaque = "La valeur du bonus d'attaque doit être compris entre -5 et 5";
          else
            this.messageBonusAttaque = '';

          this.oldWeaponBonusAttaque = this.weapon.bonusAttaque;
        }

        if(this.weapon.bonusEsquive != this.oldWeaponBonusEsquive){
          if((this.weapon.bonusEsquive < -5) || (this.weapon.bonusEsquive > 5) || (this.weapon.bonusEsquive == null))
            this.messageBonusEsquive = "La valeur du bonus d'esquive doit être comprise entre -5 et 5";
          else
            this.messageBonusEsquive = '';

          this.oldWeaponBonusEsquive = this.weapon.bonusEsquive;
        }

        if(this.weapon.bonusDegats != this.oldWeaponBonusDegats){
          if((this.weapon.bonusDegats < -5) || (this.weapon.bonusDegats > 5) || (this.weapon.bonusDegats == null))
            this.messageBonusDegats = "La valeur du bonus de dégats doit être comprise entre -5 et 5";
          else
            this.messageBonusDegats = '';

          this.oldWeaponBonusDegats = this.weapon.bonusDegats;
        }

        if(this.weapon.bonusPv != this.oldWeaponBonusPv){
          if((this.weapon.bonusPv < -5) || (this.weapon.bonusPv > 5) || (this.weapon.bonusPv == null))
            this.messageBonusPv = "La valeur du bonus de points de vie doit être compris entre -5 et 5";
          else
            this.messageBonusPv = '';

          this.oldWeaponBonusPv = this.weapon.bonusPv;
        }

        let total = this.weapon.bonusAttaque + this.weapon.bonusEsquive + this.weapon.bonusDegats + this.weapon.bonusPv;
        if((total !=0) && (this.weapon.bonusAttaque != null)
                            && (this.weapon.bonusEsquive != null)
                            && (this.weapon.bonusPv != null)
                            && (this.weapon.bonusDegats != null))
          this.messageTotal = 'La somme des valeurs des bonus doit être nulle. Valeur actuelle: ' + total;
        else
          this.messageTotal = '';
      }

    //Initialisation des classes pour les styles du formulaire en fonction des messages d'erreur éventuels
    this.setNameClasses();
    this.setBonusAttaqueClasses();
    this.setBonusDegatsClasses();
    this.setBonusEsquiveClasses();
    this.setBonusPvClasses();

    this.validForm = (this.messageName.length == 0)
      && (this.messageBonusAttaque.length == 0)
      && (this.messageBonusDegats.length == 0
      && (this.messageBonusEsquive.length == 0)
      && (this.messageBonusPv.length == 0)
      && (this.messageTotal.length == 0));
  }

  //Sauvegarde des modifications effectuées par l'utilisateur
  save(): void {
    this.weaponService.update(this.weapon)
      .then(() => this.goBack());
  }

  //Retour à la page précédente
  goBack(): void {
    this.location.back();
  }
}

