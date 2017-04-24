/*
* Ce composant présente:
*      - les 4 premiers héros présents dans les données de jeu
*      - les 4 premières armes présentes dans les données de jeu
*
* Ce composant propose un filtre de sélection sur le nom des joueurs ou des armes
*/

import { Component, OnInit } from '@angular/core';

import { Hero } from '../../data/hero';
import { HeroService } from '../../service/hero.service';

import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../service/weapon.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  weapons: Weapon[] = [];

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(0, 4));

    this.weaponService.getWeapons()
      .then(weapons => this.weapons = weapons.slice(0, 4));
  }
}

