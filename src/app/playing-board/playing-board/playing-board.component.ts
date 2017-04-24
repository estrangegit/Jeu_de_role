/*
* Ce composant a pour rôle de présenter le plateau de jeu et de gérer une partie
* entre deux joueurs.
* Il y a deux temps dans la gestion des événements:
*  1. Sélection des joueurs et lancement d'une partie
*  2. Déroulement d'une partie
*/

import {Component, SimpleChanges} from '@angular/core';
import {OnInit, DoCheck, AfterViewChecked} from '@angular/core';

import {Hero} from '../../data/hero';
import {Weapon} from '../../data/weapon';
import {HeroService} from "../../service/hero.service";
import {WeaponService} from "../../service/weapon.service";

declare let $:any;

@Component({
  selector: 'playing-board',
  templateUrl: './playing-board.component.html',
  styleUrls: ['./playing-board.component.css'],
})


export class PlayingBoardComponent implements OnInit, DoCheck, AfterViewChecked{
  constructor(private heroService: HeroService,
              private weaponService: WeaponService) {

    //Initialisation du modèle de plateau de jeu
    for(let li = 1; li <= 6; li++){
      this.cellValues.push([]);
      for(let col = 1; col <= 6; col++){
        this.cellValues[li-1].push(0);
      }
    }

    //Initialisation du tableau de style
    let cellClasses = {
      player1Move : false,
      player2Move : false,
      player1Attack: false,
      player2Attack: false
    };

    for(let li = 1; li <= 6; li++){
      this.cellClasses.push([]);
      for(let col = 1; col <= 6; col++){
        this.cellClasses[li-1].push(cellClasses);
      }
    }
  }

  heroes: Hero[];

  //Variables pour gérer la sélection des joueurs et de leurs armes
  player1Id: number;
  oldPlayer1Id: number;
  playerOneSelected: boolean = false;
  playerTwoSelected: boolean = false;
  player2Id: number;
  oldPlayer2Id: number;

  player1Weapons: Weapon[];
  player2Weapons: Weapon[];

  //Variables pour la gestions des caractéristiques des joueurs durant le déroulement d'un combat
  player1: Hero = new Hero();
  player1Attaque: number;
  player1Esquive: number;
  player1Degats: number;
  player1Pv: number;

  oldPlayer1Name: string;

  player2: Hero = new Hero();
  player2Attaque: number;
  player2Esquive: number;
  player2Degats: number;
  player2Pv: number;

  oldPlayer2Name: string;

  //Variables permettant de compter le nombre de callBacks pour le chargement des armes
  nbWeaponsCallBackToDo: number = 0;
  nbWeaponsCallBackDone: number = 0;
  callBackFinished: boolean = false;


  //Variables pour la gestion du plateau de jeu
  gameOn: boolean = false;
  player1Turn: boolean = true;
  player1Won: boolean = false;
  player2Won: boolean = false;
  messageAttaque: string = "";
  messageResultatAttaque: string = "";

  cellClasses: any[] = [];
  cellValues: any[] = [];

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  addPlayerWeapon(id:number, playerWeapons: Weapon[]): void {
    this.weaponService.getWeapon(id).then(weapon => playerWeapons.push(weapon)).then(weapon => this.nbWeaponsCallBackDone++);
  }

  getPlayer1(id:number): void {
    this.heroService.getHero(id).then(hero => this.player1 = hero);
  }

  getPlayer2(id:number): void {
    this.heroService.getHero(id).then(hero => this.player2 = hero);
  }

  ngOnInit(): void {
    this.getHeroes();

    //Permet d'ajuster la taille du plateau de jeu lors d'un changement de taille de la fenètre
    window.addEventListener("resize", this.resizePlayingBoard);
  }

  //Permet d'ajuster la taille des cellules du plateau de jeu en cas de modification de la taille de la fenêtre
  ngAfterViewChecked(): void {
    this.resizePlayingBoard();
  }

  //Gestion des la hauteur des cellules du plateau de jeu
  resizePlayingBoard(): void {
    $('#playingBoard td').each(function(){
      let width = $(this).css('width');
      $(this).css('height', width);
    });
  }

  //Gestion des styles pour une cellule particulière
  setCellClass(x:number, y:number, player1Class: boolean, player2Class: boolean, player1Attack: boolean, player2Attack: boolean): void{
    let cellClasses = {
      player1Move : player1Class,
      player2Move : player2Class,
      player1Attack: player1Attack,
      player2Attack: player2Attack
    };

    this.cellClasses[y-1][x-1] = cellClasses;
  }

  /*Gestion de la valeur pour une case du tableau
  *     - valeur 0 pour une case vide
  *     - valeur 1 pour une case occupée par le joueur 1
  *     - valeur 2 pour une case occupée par le joueur 2
  */
  setCellValue(x:number, y:number, value:number): void{
    this.cellValues[y-1][x-1] = value;
  }

  getPlayer1position(): any{
    for(let y = 1; y <= 6; y++){
      for(let x = 1; x <= 6; x++){
        if(this.cellValues[y-1][x-1] == 1)
          return {x:x, y:y};
      }
    }
  }

  getPlayer2position(): any{
    for(let y = 1; y <= 6; y++){
      for(let x = 1; x <= 6; x++){
        if(this.cellValues[y-1][x-1] == 2)
          return {x:x, y:y};
      }
    }
  }

  lancerD3(n:number): number{
    let res = n * Math.floor((Math.random() * 3) + 1)
    return res;
  }

  /* Cycle de vie du composant ngDoCheck:
  *     permet d'initialiser les variables de jeu durant la phase sélection des joueurs
  */
  ngDoCheck(): void {

    if((this.player1Id != this.oldPlayer1Id) && (this.player1Id != null)){

      this.getPlayer1(this.player1Id);
      this.oldPlayer1Id = this.player1Id;
    }

    if((this.player2Id != this.oldPlayer2Id) && (this.player2Id != null)){

      this.getPlayer2(this.player2Id);
      this.oldPlayer2Id = this.player2Id;
    }

    if((this.player1.name != this.oldPlayer1Name) && (typeof this.player1.name != 'undefined')){

      this.playerOneSelected = true;

      this.nbWeaponsCallBackToDo += this.player1.armes.length;

      this.player1Weapons = [];
      for(let i = 0; i < this.player1.armes.length; i++){
        let weaponId = this.player1.armes[i];
        this.addPlayerWeapon(weaponId, this.player1Weapons);
      }

      this.oldPlayer1Name = this.player1.name;
    }

    if((this.player2.name != this.oldPlayer2Name) && (typeof this.player2.name != 'undefined')){

      this.playerTwoSelected = true;

      this.nbWeaponsCallBackToDo += this.player2.armes.length;

      this.player2Weapons = [];
      for(let i = 0; i < this.player2.armes.length; i++){
        let weaponId = this.player2.armes[i];
        this.addPlayerWeapon(weaponId, this.player2Weapons);
      }

      this.oldPlayer2Name = this.player2.name;
    }

    if(this.nbWeaponsCallBackToDo == this.nbWeaponsCallBackDone){
      this.callBackFinished = true;
    }else{
      this.callBackFinished = false;
    }
  }

  //Initialisation de la position des joueurs et du style des cases au début du jeu
  startGame(): void {
    this.gameOn = true;
    this.player1Turn = true;
    this.player1Won = false;
    this.player2Won = false;

    //Réinitialisation des messages indicatifs pour les attaques
    this.messageAttaque = "";
    this.messageResultatAttaque = "";

    //Initialisation des paramètres des joueurs
    this.player1Attaque = this.player1.attaque;
    this.player1Degats = this.player1.degats;
    this.player1Esquive = this.player1.esquive;
    this.player1Pv = this.player1.pv;

    for(let i = 0; i < this.player1Weapons.length; i++){
      this.player1Attaque = this.player1Attaque + this.player1Weapons[i].bonusAttaque;
      this.player1Degats = this.player1Degats + this.player1Weapons[i].bonusDegats;
      this.player1Esquive = this.player1Esquive + this.player1Weapons[i].bonusEsquive;
      this.player1Pv = this.player1Pv + this.player1Weapons[i].bonusPv;
    }

    this.player2Attaque = this.player2.attaque;
    this.player2Degats = this.player2.degats;
    this.player2Esquive = this.player2.esquive;
    this.player2Pv = this.player2.pv;

    for(let i = 0; i < this.player2Weapons.length; i++){
      this.player2Attaque = this.player2Attaque + this.player2Weapons[i].bonusAttaque;
      this.player2Degats = this.player2Degats + this.player2Weapons[i].bonusDegats;
      this.player2Esquive = this.player2Esquive + this.player2Weapons[i].bonusEsquive;
      this.player2Pv = this.player2Pv + this.player2Weapons[i].bonusPv;
    }

    //Initialisation de la position des joueurs
    this.setCellValue(1, 1, 1);
    this.setCellValue(6, 6, 2);

    //Initialisation des styles pour le premier mouvement du jeu
    this.setCellClass(2, 1, true, false, false, false);
    this.setCellClass(2, 2, true, false, false, false);
    this.setCellClass(1, 2, true, false, false, false);

    this.resizePlayingBoard();
  }

  /*
  * Gestion des intentions de déplacements des joueurs.
  * Deux cas peuvent se présenter:
  *      - déplacement du joueur si le mouvement est autorisé et si la case de destination est libre
  *      - attaque du joueur adverse si la case visé par le déplacement est occupée
  */
  movePlayer(x, y): void {
    if(this.gameOn) {
      let possibleMoves = [];
      let possibleAttack = [];
      let playerNumber;
      let hasMoved = false;
      let hasAttacked = false;
      this.messageAttaque = "";
      this.messageResultatAttaque = "";

      let xPlayer;
      let yPlayer;

      let xEnnemy;
      let yEnnemy;


      if (!this.player1Won && !this.player2Won) {

        if (this.player1Turn) {
          xPlayer = this.getPlayer1position().x;
          yPlayer = this.getPlayer1position().y;

          xEnnemy = this.getPlayer2position().x;
          yEnnemy = this.getPlayer2position().y;

          playerNumber = 1;
        } else {
          xPlayer = this.getPlayer2position().x;
          yPlayer = this.getPlayer2position().y;

          xEnnemy = this.getPlayer1position().x;
          yEnnemy = this.getPlayer1position().y;

          playerNumber = 2;
        }

        //Calcul des positions possibles pour le mouvement du joueur
        for (let deltax = -1; deltax <= 1; deltax++) {
          for (let deltay = -1; deltay <= 1; deltay++) {
            if (((xPlayer + deltax) >= 1) && ((xPlayer + deltax) <= 6) && ((yPlayer + deltay) >= 1) && ((yPlayer + deltay) <= 6)) {
              if (deltax != 0 || deltay != 0) {
                if (xPlayer + deltax != xEnnemy || yPlayer + deltay != yEnnemy) {
                  //ajout de la cellule en tant que mouvement possible
                  possibleMoves.push({x: (xPlayer + deltax), y: (yPlayer + deltay)});
                } else {
                  possibleAttack.push({x: (xPlayer + deltax), y: (yPlayer + deltay)})
                }
              }
            }
          }
        }

        for (let index = 0; index < possibleMoves.length; index++) {
          if ((possibleMoves[index].x == x) && (possibleMoves[index].y == y)) {
            //Il y a eu mouvement du joueur
            this.setCellValue(xPlayer, yPlayer, 0);
            this.setCellValue(x, y, playerNumber);
            hasMoved = true;
          }
        }

        if (possibleAttack.length > 0 && ((possibleAttack[0].x == x) && (possibleAttack[0].y == y))) {
          //Il y a eu une attaque
          if (this.player1Turn) {
            this.messageAttaque = "Le joueur 1 a attaqué le joueur 2";

            let resultatAttaque = this.lancerD3(this.player1Attaque);
            let resultatEsquive = this.lancerD3(this.player2Esquive);

            if (resultatAttaque > resultatEsquive) {
              if (this.player1Degats > 0) {
                this.player2Pv = Math.max(this.player2Pv - this.player1Degats, 0);
                this.messageResultatAttaque = "Le joueur 2 perd " + this.player1Degats + " points de vie";
              } else {
                this.messageResultatAttaque = "Le joueur 2 perd 0 point de vie";
              }

              if (this.player2Pv == 0) {
                this.player1Won = true;
                this.messageAttaque = "Le joueur 1 a gagné la partie";
                this.messageResultatAttaque = "";
              }

            } else {
              this.messageResultatAttaque = "Le joueur 2 esquive l'attaque";
            }

          }
          else {
            this.messageAttaque = "Le joueur 2 a attaqué le joueur 1";

            let resultatAttaque = this.lancerD3(this.player2Attaque);
            let resultatEsquive = this.lancerD3(this.player1Esquive);

            if (resultatAttaque > resultatEsquive) {
              if (this.player2Degats > 0) {
                this.player1Pv = Math.max(this.player1Pv - this.player2Degats, 0);
                this.messageResultatAttaque = "Le joueur 1 perd " + this.player2Degats + " points de vie";
              } else {
                this.messageResultatAttaque = "Le joueur 1 perd 0 point de vie";
              }

              if (this.player1Pv == 0) {
                this.player2Won = true;
                this.messageAttaque = "Le joueur 2 a gagné la partie";
                this.messageResultatAttaque = "";
              }

            } else {
              this.messageResultatAttaque = "Le joueur 1 esquive l'attaque";
            }
          }
          hasAttacked = true;
        }
      }

      if (hasMoved || hasAttacked) {
        //Réinitialisation des styles pour toutes les cellules
        for (let xCoordinate = 1; xCoordinate <= 6; xCoordinate++) {
          for (let yCoordinate = 1; yCoordinate <= 6; yCoordinate++) {
            this.setCellClass(xCoordinate, yCoordinate, false, false, false, false);
          }
        }

        if (!this.player1Won && !this.player2Won) {
          //Calcul des positions possibles pour l'adversaire et modification des styles des cases associées
          for (let deltax = -1; deltax <= 1; deltax++) {
            for (let deltay = -1; deltay <= 1; deltay++) {
              if (((xEnnemy + deltax) >= 1) && ((xEnnemy + deltax) <= 6) && ((yEnnemy + deltay) >= 1) && ((yEnnemy + deltay) <= 6)) {
                if (deltax != 0 || deltay != 0) {
                  if (hasMoved) {
                    //Gestion des styles si le joueur a bougé (on prend en compte la nouvelle position)
                    if (xEnnemy + deltax != x || yEnnemy + deltay != y) {
                      if (this.player1Turn)
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, false, true, false, false);
                      else
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, true, false, false, false);
                    } else {
                      if (this.player1Turn)
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, false, false, false, true);
                      else
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, false, false, true, false);
                    }
                    //Gestion des styles si le joueur a attaqué (on prend en compte la position actuelle)
                  } else if (hasAttacked) {
                    if (xEnnemy + deltax != xPlayer || yEnnemy + deltay != yPlayer) {
                      if (this.player1Turn)
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, false, true, false, false);
                      else
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, true, false, false, false);
                    } else {
                      if (this.player1Turn)
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, false, false, false, true);
                      else
                        this.setCellClass(xEnnemy + deltax, yEnnemy + deltay, false, false, true, false);
                    }
                  }
                }
              }
            }
          }
        }
        this.player1Turn = !this.player1Turn;
      }
    }
  }

  //Gestion de la fin de partie et réinitialisation des variables de jeu
  endGame(): void {
    this.gameOn = false;
    this.player1Id = null;
    this.player2Id = null;
    this.oldPlayer1Id = null;
    this.oldPlayer2Id = null;
    this.oldPlayer1Name = null;
    this.oldPlayer2Name = null;
    this.player1 = new Hero();
    this.player2 = new Hero();
    this.player1Pv = null;
    this.player1Attaque = null;
    this.player1Esquive = null;
    this.player1Degats = null;
    this.player2Pv = null;
    this.player2Attaque = null;
    this.player2Esquive = null;
    this.player2Degats = null;
    this.playerOneSelected = false;
    this.playerTwoSelected = false;

    //Réinitialisation des styles pour toutes les cellules et de la position des joueurs sur le plateau
    for(let xCoordinate = 1; xCoordinate <= 6; xCoordinate++){
      for(let yCoordinate = 1; yCoordinate <= 6; yCoordinate++){
        this.setCellClass(xCoordinate, yCoordinate, false, false, false, false);
        this.setCellValue(xCoordinate, yCoordinate, 0);
      }
    }
  }
}

