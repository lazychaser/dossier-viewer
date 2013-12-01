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

App.Dossier.Store = (function ($) {

    var cache = {};

    function create (data) {
        data.tanks = data.tanks.map(function (v) { 
            return App.Dossier.TankBattles.create(v); 
        });

        return App.Dossier.create(data);
    }

    return {
        byPlayer: function (player) {
            var dfd = $.Deferred();

            player in cache && dfd.resolve(cache[player]) || 
                $.getJSON('/' + player + '.json').then(function (resp) {
                    dfd.resolve(App.Dossier.Store.fromJSON(resp));
                }, dfd.reject);

            return dfd.promise();
        }

        , fromJSON: function (data) {

            /* jshint boss:true */
            return cache[data.player] = create(data);
        }
    };
})(Ember.$);