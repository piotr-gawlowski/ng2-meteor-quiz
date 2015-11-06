/// <reference path="../../../typings/all.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

import {Games} from '../../../collections/games';

@Component({
    selector: 'app'
})
@View({
    templateUrl: 'client/src/games-list/games-list.ng.html',
    directives: [NgFor, RouterLink]
})
export class GamesList {
    games: Mongo.Cursor<any>;

    constructor() {
        this.games = Games.find();
    }
}
