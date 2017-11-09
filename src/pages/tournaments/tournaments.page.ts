import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage, TeamsPage} from '../pages';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: './tournaments.page.html',
})
export class TournamentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');
  }

  itemTapped() {
    console.log("tap!")
    this.navCtrl.push(TeamsPage);
  }
}
