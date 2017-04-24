import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
    import { FormsModule }    from '@angular/forms';
import { HttpModule }         from '@angular/http';

import { HeroSearchComponent }     from './hero-search/hero-search.component';
import { WeaponSearchComponent }   from './weapon-search/weapon-search.component';
import { DashboardComponent }      from './dashboard/dashboard.component';

import { AppRoutingModule }     from '../routing/app-routing.module';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule
  ],

  declarations: [
    HeroSearchComponent,
    WeaponSearchComponent,
    DashboardComponent
  ],
})

export class DashBoardModule {}

