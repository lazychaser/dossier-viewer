App.DossierRoute = App.Route.extend({

    model: function (params) {
        return App.Dossier.Store.byPlayer(params.player);
    }

    , actions: {

        error: function (xhr, transition) {

            if (xhr.status !== 404) return true;

            this.transitionWithErrorTo('index', trans('app.dossier.error.not-found'));
        }
    }
});

App.DossierController = Ember.ObjectController.extend({

    stats: Ember.computed.sort('statsFiltered', function (a, b) {
        if (a.tank.last_played_at > b.tank.last_played_at) return -1;
        if (a.tank.last_played_at < b.tank.last_played_at) return 1;

        return 0;
    })
    .readOnly()

    , init: function () {
        !this.get('formula') &&
            this.set('formula', App.Dossier.Wn7Formula.create());

        !this.get('filter') && 
            this.set('filter', App.Dossier.BattleTypeFilter.create());

        this.initColumns([
              'battle.avgTier:tier'
            , 'icon:icon'
            , 'title'
            , 'battle.battles'
            , 'battle.winRate:percent'
            , 'battle.avgDamageDealt:float'
            , 'battle.avgFrags:float'
            , 'battle.avgSpotted:float'
            , 'battle.hitRate:percent'
            , 'battle.piercingEfficiency:percent'
            , 'battle.armorEfficiency:percent'
            , 'efficiency:efficiency'
        ]);
    }

    , initColumns: function (columns) {

        var me = this
            , re = /^([^:]+):(.+)$/;

        this.set('columns', columns.map(function (v) {
            var matches = re.exec(v)
                , key = matches ? matches[1] : v
                , type = matches ? matches[2] : undefined
                ;

            return App.Dossier.Column.create({ 
                key: key, 
                owner: me 
            }, type);
        }));
    }

    , statsFiltered: function () {

        var me = this
            , tanks = me.get('model.tanks');

        if (!tanks) return [];

        return tanks
            .map(function (tankBattles) {
                var battle = me.aggregateBattles(tankBattles.battles);

                if (battle) {
                    tank = App.Dossier.Tank.create(tankBattles.tank);

                    return App.Dossier.Totals.create({
                        tank: tank
                        , battle: battle
                        , controller: me
                    });
                }
            })
            .filter(function (item) { return item; });
    }
    .property('model', 'filter.changed').readOnly()

    , totals: function () {
        if (this.get('statsFiltered').length === 0) return null;

        return App.Dossier.Totals.create({ controller: this })
                .mergeAll(this.get('statsFiltered'));
    }
    .property('statsFiltered').readOnly()

    , aggregateBattles: function (battles) {

        var battle = App.Dossier.Battle.create()
            , filter = this.get('filter')
            ;

        battles.forEach(function (item) {
            filter.battle(item) && battle.merge(item);
        });

        return battle.get('battles') > 0 && battle || null;
    }

    , actions: {

        updateDossier: function (dossier) {
            if (dossier.get('player') !== this.get('model.player')) {
                App.set('error', trans('app.dossier.error.wrong-player'));
            } else {
                App.set('success', trans('app.dossier.did-refresh'));
                this.set('model', dossier);
            }
        }
    }
});

App.DossierView = Ember.View.extend({
    
});