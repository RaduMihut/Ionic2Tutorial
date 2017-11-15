import { Injectable, Inject } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';

@Injectable()
export class UserSettings{

    constructor(private storage: Storage, 
                private events: Events) {        
        
    }

    favouriteTeam(team, tournamentId, tournamentName){
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish('favourites:changed');
    }

    unfavouriteTeam(team){
        this.storage.remove(team.id);
        this.events.publish('favourites:changed');
    }

    isFavouriteTeam(teamId){
        return this.storage.get(teamId).then(value => value? true : false );
    }

    getAllFavourites(){
        let items = [];

        let eachPromise = this.storage.forEach((value, key, index) => {
            items.push(JSON.parse(value));
        });   
        
        return new Promise<any[]>((resolve, reject) => {
            eachPromise.then(() => resolve(items));
        });
    }
}
