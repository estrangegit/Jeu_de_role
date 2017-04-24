import { NgModule }           from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { WeaponDetailComponent }   from './weapon-detail/weapon-detail.component';
import { WeaponsComponent }     from './weapons/weapons.component';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule
  ],

  declarations: [
    WeaponDetailComponent,
    WeaponsComponent,
  ],
})

export class WeaponsModule {}
