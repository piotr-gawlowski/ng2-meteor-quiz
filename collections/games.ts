/// <reference path="../typings/angular2-meteor.d.ts" />
export var Games = new Mongo.Collection('games');

interface IGame {
    _id?:   string;
    owner:  string;
}


Games.allow({
    insert: function (userId, game:IGame) {
        return userId && game.owner === userId;
    },
    update: function (userId, game:IGame, fields, modifier) {
        return userId && game.owner === userId;
    },
    remove: function (userId, game:IGame) {
        return userId && game.owner === userId;
    }
});