/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

@Directive({
    selector: 'router-outlet'
})
export class AuthorizedOutlet extends RouterOutlet {
    publicRoutes:any;
    private parentRouter:Router;

    constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader, _parentRouter:Router, @Attribute('name') nameAttr:string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/auth': true,
        };
    }

    activate(instruction: ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!this.publicRoutes[url] && !Meteor.userId()) {
            this.parentRouter.navigateByUrl('/auth');
        }
        return super.activate(instruction);
    }
}