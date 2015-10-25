/**
 * Created by d3vilroot on 25-10-15.
 */

interface IProfile {
    email: string,
    name: string,
    image: string
}

export class UserService {
    public isAuth:boolean;
    public profile:IProfile;

    constructor(){

    }

    signin(profile:IProfile){
        this.isAuth = true;
        this.profile = profile;
    }
}