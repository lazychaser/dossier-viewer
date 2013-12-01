App.AggregatedDossier = Ember.Object.extend({

    tanks: Ember.computed(function () {
        return this.get('filtered').sort(function (a, b) {
            if (a.tank.last_played_at > b.tank.last_played_at) return -1;
            if (a.tank.last_played_at < b.tank.last_played_at) return 1;

            return 0;
        });
    })
    .property('filtered').readOnly()

    , filtered: Ember.computed(function () {
        var tanks = this.get('data.tanks');

        if (!tanks) return [];

        tanks = tanks
            .map(function (tankBattles) {
                var battle = this.aggregateBattles(tankBattles.battles);

                if (battle) {
                    var tank = App.Dossier.Tank.create(tankBattles.tank);

                    return App.AggregatedDossier.Item.create({
                        tank: tank
                        , battle: battle
                        , owner: this
                    });
                }
            }, this)
            .filter(function (item) { return item !== undefined; });

        return Ember.A(tanks);
    })
    .property('filter.@each').readOnly()

    , totals: Ember.computed(function () {
        return App.AggregatedDossier.Item.create({ owner: this })
                .mergeAll(this.get('filtered'));
    })
    .property('filtered').readOnly()

    , aggregateBattles: function (battles) {

        var battle = App.Dossier.Battle.create()
            , filter = this.filter
            ;

        battles.forEach(function (item) {
            filter.battle(item) && battle.merge(item);
        });

        return battle.get('battles') > 0 && battle || null;
    }
});