/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, NgZone, View} from 'angular2/angular2';
//import {Http, HTTP_PROVIDERS} from 'angular2/http'; //no http in my build, have to use fetch :|

@Component({
    selector: 'authorization'
})
@View({
    templateUrl: 'client/src/authorization/authorization.ng.html',
    styleUrls: ['client/src/authorization/authorization-card.css'],
})
export class Authorization {
    public processing:boolean;
    private slackAuthOptions:Meteor.LoginWithExternalServiceOptions;

    constructor(private zone:NgZone) {
        this.processing = false;
        this.slackAuthOptions = {
            requestPermissions: ['identify', 'read'],
            requestOfflineToken: true,
            forceApprovalPrompt: true,
            loginStyle: 'popup'
        };
        var u = Meteor.user();
        if(u) this.signin(u);
    }

    signin(user){
        this.processing = true;
        this.zone.runOutsideAngular(() => {
            fetch('https://slack.com/api/users.info?+' + `token=${user.services.slack.accessToken}&user=${user.services.slack.id}`)
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    this.zone.run(()=>{
                        this.processing = false;
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
