import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { HttpModule }         from '@angular/http';

import { HeroDetailComponent }   from './hero-detail/hero-detail.component';
import { HeroesComponent }     from './heroes/heroes.component';

@NgModule({
  imports: [
              FormsModule,
              HttpModule,
              CommonModule
            ],

  declarations: [
                  HeroDetailComponent,
                  HeroesComponent,
                ],
})

export class HeroesModule {}
