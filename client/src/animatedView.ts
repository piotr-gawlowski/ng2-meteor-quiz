/// <reference path="../../typings/all.d.ts" />
import {ElementRef} from 'angular2/angular2';

export class AnimatedView {
    private duration: number;

    constructor(private elementRef:ElementRef, private effect){
        this.duration = 700;
    }

    onActivate(){
        return new Promise((resolve)=>{
            //console.log('activate');
            $(this.elementRef.nativeElement).velocity(this.effect.activate, {
                display: 'flex',
                duration: this.duration,
                complete: function() {
                    //console.log('onActivate');
                    resolve();
                }
            });
        });
    }
    onDeactivate(){
        return new Promise((resolve)=>{
            //console.log('deactivate');
            $(this.elementRef.nativeElement).velocity(this.effect.deactivate, {
                display: 'flex',
                duration: this.duration,
                complete: function() {
                    //console.log('onActivate');
                    resolve();
                }
            });
        });
    }
}