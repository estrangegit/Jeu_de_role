import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { PlayingBoardComponent } from './playing-board/playing-board.component';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule
  ],

  declarations: [
    PlayingBoardComponent,
  ],
})

export class PlayingBoardModule {}

