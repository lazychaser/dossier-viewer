App.CompareRoute = App.Route.extend({

    model: function (params) {
        var dfd = $.Deferred()
            , store = App.Dossier.Store
            ;

        // Resolve player first
        store.byPlayer(params.player).then(function (player) {
            // Then resolve data for the player to compare against.
            store.byPlayer(params.other).then(function (other) {
                dfd.resolve({
                    player: player
                    , other: other
                });
            }, dfd.reject);
        }, dfd.reject);

        return dfd.promise();
    }

    , serialize: function (model) {
        return {
            player: model.player.player
            , other: model.other.player
        };
    }
});

App.CompareController = App.DossierBaseController.extend({

    aggregated: Ember.computed(function () {
        var tankDictionary = {}
            , player = this.get('aggregatedPlayer')
            , other = this.get('aggregatedOther')
            , commonTankList = []
            ;

        other.get('filtered').forEach(function (i) {
            tankDictionary[i.get('tank.info.id')] = i;
        });

        player.get('tanks').forEach(function (i) {
            var id = i.get('tank.info.id');

            id in tankDictionary && commonTankList.push(Ember.Object.create({
                other: tankDictionary[id]
                , player: i
            }));
        });

        var commonTotals = Ember.Object.create({
            player:  App.AggregatedDossier.Item.create({ title: 'По общим танкам' })
            , other: App.AggregatedDossier.Item.create()
            , isTotals: true
        });

        commonTankList.forEach(function (item) {
            commonTotals.player.merge(item.player);
            commonTotals.other.merge(item.other);
        });

        return {
            tanks: commonTankList
            , totals: Ember.Object.create({
                player: player.get('totals')
                , other: other.get('totals')
                , isTotals: true
            })
            , commonTotals: commonTotals
        };
    })
    .property('aggregatedPlayer', 'aggregatedCompareTo', 'filter.@each')

    , aggregatedPlayer: Ember.computed(function () {
        return App.AggregatedDossier.create({
            data: this.content.player
            , filter: this.filter
        });
    })
    .property('content')

    , aggregatedOther: Ember.computed(function () {
        return App.AggregatedDossier.create({
            data: this.content.other
            , filter: this.filter
        });
    })
    .property('content')

    , swappedContent: Ember.computed(function () {
        return {
            player: this.content.other
            , other: this.content.player
        };
    })
    .property('content')

});