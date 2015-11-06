/// <reference path="../../../typings/all.d.ts" />

import {Component, NgZone, View, Inject, ElementRef} from 'angular2/angular2';
import {ROUTER_PROVIDERS, Router} from 'angular2/router';

import {UserService} from '../user/userService';
import {AnimatedView} from "../animatedView";


@Component({
    selector: '.animated-view',
})
@View({
    templateUrl: 'client/src/authorization/authorization.ng.html',
    styleUrls: ['client/src/authorization/authorization-card.css'],
})
export class Authorization extends AnimatedView {
    public processing:boolean;
    private user: UserService;
    private slackAuthOptions:Meteor.LoginWithExternalServiceOptions;

    constructor(private zone:NgZone, private elementRef:ElementRef, private router:Router, UserService:UserService) {
        super(elementRef, {
            activate: "transition.bounceLeftIn",
            deactivate: "transition.bounceRightOut"
        });
        this.processing = false;
        this.user = UserService;
        this.slackAuthOptions = {
            requestPermissions: ['identify', 'read'],
            requestOfflineToken: true,
            forceApprovalPrompt: true,
            loginStyle: 'popup'
        };
    }
    onActivate(){
        super.onActivate().then(()=>{
            var u = Meteor.user();
            if(u){
                this.autologin(u); //autologin
            }
        });
    }

    /**********************************
     *              METHODS
     **********************************/

    autologin(user){
        this.processing = true;
        this.zone.runOutsideAngular(() => {
            setTimeout(()=> {
                this.user.authWithSlack(user).then(()=> {
                    this.zone.run(()=> {
                        this.processing = false;
                        this.router.navigate(['/UserDetails']);
                    });
                });
            }, 2000);
        });
    }

    slackAuth(){
        this.processing = true;
        Meteor.loginWithSlack(this.slackAuthOptions, ()=> {
            var user = Meteor.user();
            if(user){
                this.autologin(user);
            }
        });
    }
}
