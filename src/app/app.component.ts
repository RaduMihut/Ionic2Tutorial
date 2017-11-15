import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage, TournamentsPage, TeamDetailPage, TeamHomePage } from '../pages/pages'
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi,
    UserSettings
  ]  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favouriteTeams: any[];

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private userSettings: UserSettings,
              private loadingController: LoadingController,
              private eliteApi: EliteApi,
              private events: Events) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.refreshFavourites();

      this.events.subscribe('favourites:changed', () => this.refreshFavourites());
    });
  }

  refreshFavourites(){
    this.userSettings.getAllFavourites().then(values => this.favouriteTeams = values);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(favourite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();
    this.eliteApi
            .getTournamentData(favourite.tournamentId)
            .subscribe(l => this.nav.push(TeamHomePage, favourite.team));
  }
}
