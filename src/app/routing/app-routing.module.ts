import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { DashboardComponent }     from '../dashboard/dashboard/dashboard.component';
import { HeroesComponent }        from '../heroes/heroes/heroes.component';
import { PlayingBoardComponent }  from '../playing-board/playing-board/playing-board.component';

import { HeroDetailComponent }    from '../heroes/hero-detail/hero-detail.component';
import { WeaponDetailComponent }  from '../weapons/weapon-detail/weapon-detail.component';

import { WeaponsComponent }       from '../weapons/weapons/weapons.component';

//Définition des routes nécessaires à la navigation au sein de l'application
const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard',  component: DashboardComponent },
{ path: 'detailHero/:id', component: HeroDetailComponent },
{ path: 'detailArme/:id', component: WeaponDetailComponent },
{ path: 'heroes',     component: HeroesComponent },
{ path: 'playingBoard',     component: PlayingBoardComponent },
{ path: 'weapons',    component: WeaponsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
