App.Dossier = Ember.Object.extend({

    init: function () {

        var dossier = this.dossier;

        dossier.tanks = $.map(dossier.tanks, function (i) {

            return App.Dossier.TankBattles.create(i);
        });

        !this.get('formula')
            && this.set('formula', App.Dossier.Wn7Formula.create());

        !this.get('filter') && 
            this.set('filter', App.Dossier.BattleTypeFilter.create());
    }

    , tanks: function () {

        var me = this;

        var tanks = $.map(me.dossier.tanks, function (tankBattles) {
            var battle = me.aggregateBattles(tankBattles.battles);

            if (battle) {
                tank = App.Dossier.Tank.create(tankBattles.tank);

                return App.Dossier.Totals.create({
                    tank: tank
                    , battle: battle
                    , dossier: me
                });
            }
        });

        return _.sortBy(tanks, function (i) {
            return i.battle.battles > 0 ? -i.tank.last_played_at : 0;
        });

    }.property('filter.changed').readOnly()

    , totals: function () {

        var result = App.Dossier.Totals.create({
            dossier: this
        });

        result.mergeAll(this.get('tanks'));

        return result;

    }.property('tanks').readOnly()

    , aggregateBattles: function (battles) {

        var battle = App.Dossier.Battle.create()
            , filter = this.get('filter')
            ;

        $.each(battles, function () {
            filter.battle(this) && battle.merge(this);
        })

        return battle.get('battles') > 0 && battle || null;
    }

    , computeEfficiency: function () {
        var f = this.get('formula');

        this.get('totals').computeEfficiency(f);

        $.each(this.get('tanks'), function () { this.computeEfficiency(f); });
    }
    .observes('formula', 'tanks', 'totals').on('init')
});

App.Dossier.reopenClass({
    BattleTypes: {
          RANDOM: 0
        , CLAN: 1
        , COMPANY: 2
        , B7_42: 3
        , AGGREGATED: 255
    } 
});

App.Dossier.Store = {

    data: {}

    , byPlayer: function (player) {
        var me = this;

        if (me.data[player]) return this.fromJSON(this.data[player]);

        return $.getJSON('/' + player + '.json').then(function (resp) {

            me.data[player] = resp;

            return App.Dossier.Store.fromJSON(resp);
        });
    }

    , fromJSON: function (data) {

        return App.Dossier.create({ dossier: data });
    } 
}