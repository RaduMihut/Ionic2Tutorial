import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandingsPage } from './standings.page';

@NgModule({
  declarations: [
    StandingsPage,
  ],
  imports: [
    IonicPageModule.forChild(StandingsPage),
  ],
})
export class StandingsPageModule {}
