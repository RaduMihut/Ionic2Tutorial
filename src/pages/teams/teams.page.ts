import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash'
import { TeamHomePage } from '../pages'
import { EliteApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html',
})
export class TeamsPage {

  teams = [];
  private allTeams: any;
  private allTeamsDivision:any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi
      .getTournamentData(selectedTourney.id)
      .subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamsDivision = _.chain(data.teams)
                                .groupBy('division')
                                .toPairs()
                                .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                                .value();

        this.teams = this.allTeamsDivision;
        console.log('division teams', this.teams);
        loader.dismiss();
      });
    });
    
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
