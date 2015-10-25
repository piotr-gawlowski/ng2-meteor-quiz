/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {UserService} from '../user/userService';


@Component({
    selector: 'user-details',
    providers: [UserService]
})
@View({
    templateUrl: 'client/src/user/user-details.ng.html',
    directives: [NgFor, RouterLink]
})
export class UserDetails {
    public fadeIn:boolean;
    public fadeOut:boolean;

    constructor(public user:UserService) {

    }

    onActivate(){
        this.fadeIn = true;
        setTimeout(()=>this.fadeIn=false, 1100);
    }
}
