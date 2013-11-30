App.Favs = Ember.Object.extend({
    init: function () {
        var players = localStorage.getItem('favs');
        this.set('players', Ember.A(players && players.split(',') || []));
    }

    , exists: function (player) {
        return this.players.contains(player);
    }

    , toggle: function (player) {
        var exists = this.exists(player);

        if (exists) {
            this.players.removeObject(player);
        } else {
            this.players.pushObject(player);
        }

        return !exists;
    }

    , playersChanged: function () {
        localStorage.setItem('favs', this.players);
    }
    .observes('players.@each')
});

App.set('favs', App.Favs.create());