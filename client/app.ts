/// <reference path="../typings/all.d.ts" />

import {Component, View} from 'angular2/angular2';
import {bootstrap} from 'angular2-meteor';
import {ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';

import {GamesList} from './src/games-list/games-list';
import {Authorization} from './src/authorization/authorization';
import {AuthorizedOutlet} from "./src/authorization/autorizedOutlet";
import {UserDetails} from './src/user/user-details';
import {UserService} from './src/user/userService';

@Component({
    selector: 'app',
})
@View({
    template: '<router-outlet></router-outlet>',
    directives: [AuthorizedOutlet]
})
@RouteConfig([
    {
        path: '/',
        as: 'GamesList',
        component: GamesList,
    },
    {
        path: '/user_details',
        as: 'UserDetails',
        component: UserDetails
    },
    {
        path: '/auth',
        as: 'Authorization',
        component: Authorization,
    },
])
class Quiz {}

bootstrap(Quiz, [ROUTER_PROVIDERS, UserService]);
