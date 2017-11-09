import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage } from '../pages'

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html',
})
export class TeamDetailPage {

  team: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
    console.log("**nav params:", this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }

  goHome(){
    // this.navCtrl.push(MyTeamsPage);
    // this.navCtrl.popToRoot();
    console.log('**parent', this.navCtrl.parent);
    this.navCtrl.parent.parent.popToRoot();
  }
}
