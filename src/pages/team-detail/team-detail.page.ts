import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { MyTeamsPage, GamePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';
import * as _ from 'lodash';
import * as moment from 'moment';
import { retry } from 'rxjs/operator/retry';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html',
})
export class TeamDetailPage {

  allGames: any[];
  games: any[];
  team: any;
  teamStanding: any;
  dateFilter: string;
  private tourneyData: any;
  useDateFilter = false;
  isFollowing = false;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private userSettings: UserSettings) { 

    this.team = this.navParams.data;
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
    
  }

  private getData(){
    this.tourneyData = this.eliteApi.getCurrentTourney();
    
        this.games = _.chain(this.tourneyData.games)
                      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                      .map(g => {
                                  let isTeam1 = (g.team1Id === this.team.id);
                                  let opponentName = isTeam1 ? g.team2 : g.team1;
                                  let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
    
                                  return {
                                      gameId: g.id,
                                      opponent: opponentName,
                                      time: Date.parse(g.time),
                                      location: g.location,
                                      locationUrl: g.locationUrl,
                                      scoreDisplay: scoreDisplay,
                                      homeAway: (isTeam1 ? "vs." : "at")
                                  };
                        })
                      .value();
    
        this.allGames = this.games;
        this.teamStanding = _.find(this.tourneyData.standings, {'teamId': this.team.id});
        this.userSettings.isFavouriteTeam(this.team.id).then(value => this.isFollowing = value);
  }
  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }else{
      return "";
    }
  }

  goHome(){
    console.log('**parent', this.navCtrl.parent);
    this.navCtrl.parent.parent.popToRoot();    
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    console.log(sourceGame);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, "day"))
    }else{
      this.games = this.allGames;
    }
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : "";
  }
  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf("W:") === 0? "primary" : "danger";
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [{
          text: "Yes",
          handler: () => {
            this.isFollowing = false;
            this.userSettings.unfavouriteTeam(this.team);

            let toast = this.toastCtrl.create({
              message: 'You have unfollowed this team.',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }         
        },
        {
          text: "No"
        }]
      });

      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings
              .favouriteTeam(
                this.team,
                this.tourneyData.tournament.id, 
                this.tourneyData.tournament.name);
    }
  }

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.getData();
    });
  }

}
