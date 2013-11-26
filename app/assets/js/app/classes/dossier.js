(function (App) {
    App.Dossier = Ember.Object.extend({});

    App.Dossier.reopenClass({
        BattleTypes: {
              RANDOM: 0
            , CLAN: 1
            , COMPANY: 2
            , B7_42: 3
            , AGGREGATED: 255
        }
    });

    var cache = {};

    function create (data) {
        data.tanks = data.tanks.map(function (v) { 
            return App.Dossier.TankBattles.create(v); 
        });

        return App.Dossier.create(data);
    }

    App.Dossier.Store = {

        byPlayer: function (player) {
            if (cache[player]) return cache[player];

            return $.getJSON('/' + player + '.json').then(this.fromJSON);
        }

        , fromJSON: function (data) {

            /* jshint boss:true */
            return cache[data.player] = create(data);
        }
    };
})(App);
