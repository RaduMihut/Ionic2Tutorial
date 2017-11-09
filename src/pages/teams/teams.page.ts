import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages'

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html',
})
export class TeamsPage {

  teams = [
    {id:1, name: "HC Elite"},
    {id:2, name: "Team Takeover"},
    {id:3, name: "DC Thunder"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
