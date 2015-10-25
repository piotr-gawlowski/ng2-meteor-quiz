/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, NgZone, View, Inject} from 'angular2/angular2';
import {ROUTER_PROVIDERS, Router} from 'angular2/router';
//import {Http, HTTP_PROVIDERS} from 'angular2/http'; //no http in my build, have to use fetch :|
declare var fetch;

import {UserService} from '../user/userService';


@Component({
    selector: 'authorization',
    providers: [UserService]
})
@View({
    templateUrl: 'client/src/authorization/authorization.ng.html',
    styleUrls: ['client/src/authorization/authorization-card.css'],
})
export class Authorization {
    //helper for animation - remove in future
    public fadeOut:boolean;
    public fadeIn:boolean;

    public processing:boolean;
    private slackAuthOptions:Meteor.LoginWithExternalServiceOptions;

    constructor(private zone:NgZone, private router:Router, private user:UserService) {
        this.processing = false;
        this.fadeOut = false;
        this.user = new UserService();
        this.slackAuthOptions = {
            requestPermissions: ['identify', 'read'],
            requestOfflineToken: true,
            forceApprovalPrompt: true,
            loginStyle: 'popup'
        };
    }
    onActivate(){
        this.fadeIn = true;
        setTimeout(()=>{
            this.fadeIn = false;
            var u = Meteor.user();
            if(u) this.signin(u);
        }, 1100);
    }
    onDeactivate(){
        return new Promise((resolve)=>{
            this.fadeOut = true;
            setTimeout(resolve, 1100);
        });
    }

    signin(user){
        this.processing = true;
        this.zone.runOutsideAngular(() => {
            fetch('https://slack.com/api/users.info?+' + `token=${user.services.slack.accessToken}&user=${user.services.slack.id}`)
                .then(r => r.json())
                .then(data => {
                    this.zone.run(()=>{
                        this.processing = false;
                        this.user.signin({
                            email: data.user.profile.email,
                            name: data.user.profile.real_name,
                            image: data.user.profile.image_original
                        });
                        this.router.navigate(['/UserDetails']);
                    });
                });
        });
    }

    slackAuth(){
        this.processing = true;
        Meteor.loginWithSlack(this.slackAuthOptions, ()=> {
            var user = Meteor.user();
            if(user){
                this.signin(user);
            }
        });
    }
}
