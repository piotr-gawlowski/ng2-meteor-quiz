/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, provide} from 'angular2/angular2';
import {bootstrap} from 'angular2-meteor';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';

import {GamesList} from 'client/src/games-list/games-list';
import {Authorization} from 'client/src/authorization/authorization';

@Component({
    selector: 'app'
})
@View({
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {
        path: '/',
        as: 'GamesList',
        component: GamesList
    },
    {
        path: '/auth',
        as: 'Authorization',
        component: Authorization
    },
])
class Quiz {}

bootstrap(Quiz, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
