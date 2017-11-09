import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage, MyTeamsPage } from '../pages'

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.page.html',
})
export class TeamHomePage {

  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome() {
    // this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }

}
