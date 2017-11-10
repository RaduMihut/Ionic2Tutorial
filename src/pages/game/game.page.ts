import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html',
})
export class GamePage {

  game: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private eliteApi: EliteApi) {
    console.log("created a game page");
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    
    console.log("the game:");
    console.log(this.game);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team  = tourneyData.teams.find(t => t.id == teamId);

    this.navCtrl.push(TeamHomePage, team);
  }
}
