/// <reference path="../../../typings/all.d.ts" />

//import {Http, HTTP_PROVIDERS} from 'angular2/http'; //no http in my build, have to use fetch :|
declare var fetch;

export interface IProfile {
    email: string,
    name: string,
    image: string
}

export class UserService {
    public isAuth:boolean;
    public profile:IProfile;

    constructor(){
        this.profile = null;
        this.isAuth = false;
    }

    setup(profile:IProfile){
        this.isAuth = true;
        this.profile = profile;
    }

    authWithSlack(user){
        return new Promise((resolve, reject)=> {
            fetch('https://slack.com/api/users.info?+' + `token=${user.services.slack.accessToken}&user=${user.services.slack.id}`)
                .then(r => r.json())
                .then(data => {
                    if(data.ok) {
                        this.setup({
                            email: data.user.profile.email,
                            name: data.user.profile.real_name,
                            image: data.user.profile.image_original
                        });
                        resolve();
                    } else {
                        alert('Authorization failed - try to refresh');
                        reject(false);
                    }
                });
        });
    }
}