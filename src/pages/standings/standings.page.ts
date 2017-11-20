import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { EliteApi } from '../../shared/shared'

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html',
})
export class StandingsPage {

  divisionFilter: string = "division";
  allStandings: any[];
  standings: any[];
  team: any;


  constructor(private navCtrl: NavController, private navParams: NavParams, private eliteApi: EliteApi) {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = tourneyData.standings;
    this.filterDivision();
    console.log(this.allStandings);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
  }

  getHeader(record, recordIndex, records){
    if(recordIndex === 0 || record.division !== records[recordIndex - 1].division){
      return record.division
    }

    return null;
  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    }else{
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }

    console.log(this.standings);
  }
}
