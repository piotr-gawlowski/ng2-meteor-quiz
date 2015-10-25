/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, View, NgClass} from 'angular2/angular2';

@Component({
    selector: 'authorization'
})
@View({
    templateUrl: 'client/src/authorization/authorization.ng.html',
    styleUrls: ['client/src/authorization/authorization-card.css'],
    directives: [NgClass]
})
export class Authorization {
    public processing:boolean;

    constructor() {
        this.processing = false;
    }
    slackAuth(){
        this.processing = true;
        Meteor.loginWithSlack(() =>{
            var user = Meteor.user();
            console.log(this);
            this.processing = false;
            if(user){
                console.log('Authorized - get user.info', user);
            }
        });
        console.log(this);
    }
}
