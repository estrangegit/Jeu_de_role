import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { HeroesModule }       from './heroes/heroes.module';
import { WeaponsModule }      from './weapons/weapons.module';
import { DashBoardModule }    from './dashboard/dashboard.module';
import { PlayingBoardModule } from './playing-board/playing-board.module';

import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';

import { HeroService }         from './service/hero.service';
import { WeaponService }       from './service/weapon.service';

import { AppRoutingModule }     from './routing/app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './service/in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HeroesModule,
    WeaponsModule,
    DashBoardModule,
    PlayingBoardModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),

    AppRoutingModule,
    AlertModule.forRoot(),
  ],
  providers: [
    HeroService,
    WeaponService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
