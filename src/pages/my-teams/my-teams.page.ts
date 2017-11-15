import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';


@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.page.html',
})
export class MyTeamsPage {

  favourites = [ ]

  constructor(private navCtrl: NavController,
              private loadingController: LoadingController,
              private eliteApi: EliteApi, 
              private userSettings: UserSettings) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  ionViewDidEnter(){
    this.userSettings.getAllFavourites().then((items) => this.favourites = items);
    console.log("the favourites are:" + this.favourites);
  }

  favouriteTapped($event, favourite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();
    this.eliteApi.getTournamentData(favourite.tournamentId)
              .subscribe(t => this.navCtrl.push(TeamHomePage, favourite.team));
  }
  goToTornaments(){
    this.navCtrl.push(TournamentsPage)
  }
}
