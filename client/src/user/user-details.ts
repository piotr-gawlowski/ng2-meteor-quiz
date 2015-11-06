/// <reference path="../../../typings/all.d.ts" />


import {Component, View, NgFor, Inject, NgIf, NgStyle, ElementRef} from 'angular2/angular2';
import {ROUTER_PROVIDERS, RouterLink, Router} from 'angular2/router';

import {UserService} from '../user/userService';
import {AnimatedView} from '../animatedView';
import {IProfile} from "./userService";

@Component({
    selector: '.animated-view',
})
@View({
    templateUrl: 'client/src/user/user-details.ng.html',
    directives: [NgFor, RouterLink, NgIf, NgStyle]
})
export class UserDetails extends AnimatedView {
    public user: UserService;
    public profile: IProfile;

    constructor(private router:Router, private elementRef:ElementRef, UserService:UserService) {
        super(elementRef,{
            activate: "transition.flipXIn",
            deactivate: "transition.flipXOut"
        });
        this.profile = null;
        this.user = UserService;
    }
    onActivate(){
        if(!this.user.isAuth){
            var u = Meteor.user();
            if(u){
                this.user.authWithSlack(u).then(()=>{
                    super.onActivate();
                    this.profile = this.user.profile;
                }); //autologin
            }
            else {
                this.router.navigate(['/Authorization']);
            }
        } else {
            super.onActivate();
            this.profile = this.user.profile;
        }
    }

    /**********************************
     *              METHODS
     **********************************/

    ready(){
        console.log('ready');
    }

    logout(){
        Meteor.logout(()=>{
            this.router.navigate(['/Authorization']);
        });
    }
}
