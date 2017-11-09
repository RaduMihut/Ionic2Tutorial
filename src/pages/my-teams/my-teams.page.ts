import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TournamentsPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.page.html',
})
export class MyTeamsPage {

  constructor(private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTornaments(){
    this.navCtrl.push(TournamentsPage)
  }
}
