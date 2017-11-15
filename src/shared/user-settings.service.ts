import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { window } from 'rxjs/operators/window';

@Injectable()
export class UserSettings{

    constructor(private storage: Storage) {        
        
    }

    favouriteTeam(team, tournamentId, tournamentName){
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(team.id, JSON.stringify(item));
    }

    unfavouriteTeam(team){
        this.storage.remove(team.id);
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
