import {Games} from '../../collections/games';

export function init() {

    if (Games.find().count() === 0) {
        var parties = [
            {
                'name': 'Friday quiz game',
                'description': 'Best wins',
                'location': 'WARP office'
            }
        ];

        for (var i = 0; i < parties.length; i++) {
            Games.insert(parties[i]);
        }
  }
}
