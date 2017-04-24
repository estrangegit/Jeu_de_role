import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 1, name: 'Mr. Nice', attaque: 1, esquive: 1, degats: 1, pv: 37, armes: [1, 2]},
      {id: 2, name: 'Narco', attaque: 1, esquive: 3, degats: 2, pv: 32, armes: [7,3]},
      {id: 3, name: 'Bombasto', attaque: 5, esquive: 4, degats: 1, pv: 27, armes: [5]},
      {id: 4, name: 'Celeritas', attaque: 2, esquive: 1, degats: 2, pv: 35, armes: [8]},
      {id: 5, name: 'Magneta', attaque: 7, esquive: 5, degats: 9, pv: 10, armes: [2,5]},
      {id: 6, name: 'RubberMan', attaque: 3, esquive: 5, degats: 3, pv: 26, armes: []},
      {id: 7, name: 'Dynama', attaque: 4, esquive: 4, degats: 4, pv: 18, armes: []},
      {id: 8, name: 'Dr IQ', attaque: 7, esquive: 2, degats: 3, pv: 15, armes: []},
      {id: 9, name: 'Magma', attaque: 2, esquive: 3, degats: 1, pv: 31, armes: []},
      {id: 10, name: 'Tornado', attaque: 2, esquive: 2, degats: 1, pv: 35, armes: []}
    ];

    let weapons = [
      {id: 1, name: 'Epée', bonusAttaque: 5, bonusEsquive: -5, bonusDegats: 3, bonusPv: -3},
      {id: 2, name: 'Dague', bonusAttaque: 2, bonusEsquive: -2, bonusDegats: 1, bonusPv: -1},
      {id: 3, name: 'Arbalète', bonusAttaque: 5, bonusEsquive: -5, bonusDegats: 5, bonusPv: -5},
      {id: 4, name: 'Bouclier', bonusAttaque: -5, bonusEsquive: 5, bonusDegats: -5, bonusPv: 5},
      {id: 5, name: 'Casque', bonusAttaque: -3, bonusEsquive: 3, bonusDegats: -3, bonusPv: 3},
      {id: 6, name: 'Pique', bonusAttaque: 3, bonusEsquive: -3, bonusDegats: 3, bonusPv: -3},
      {id: 7, name: 'Harnois', bonusAttaque: 0, bonusEsquive: -3, bonusDegats: 0, bonusPv: 3},
      {id: 8, name: 'Claymore', bonusAttaque: 5, bonusEsquive: -5, bonusDegats: 5, bonusPv: -5},
      {id: 9, name: 'Lance', bonusAttaque: 3, bonusEsquive: -3, bonusDegats: 3, bonusPv: -3},
      {id: 10, name: 'Côte', bonusAttaque: -3, bonusEsquive: -2, bonusDegats: 0, bonusPv: 5},
    ];

    return {heroes, weapons};
  }
}
