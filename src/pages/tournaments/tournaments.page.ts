import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyTeamsPage, TeamsPage} from '../pages';
import { EliteApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: './tournaments.page.html',
})
export class TournamentsPage {

  tournaments: any;
  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {
  }  

  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }

  ionViewDidLoad() {
    console.log('## lifecycle ## ionViewDidLoad TournamentsPage');

    let loader = this.loadingController.create({
      content: "Getting tournaments..."
      //spinner: 'dots'
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments()
      .then(data =>{ 
        this.tournaments = data;
        loader.dismiss();
      });          
    });
  }  
}
