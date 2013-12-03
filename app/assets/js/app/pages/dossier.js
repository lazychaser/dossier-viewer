App.DossierRoute = Ember.Route.extend({

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

App.DossierBaseController = Ember.ObjectController.extend({

    init: function () {
        !this.formula &&
            this.set('formula', App.Dossier.Wn7Formula.create());

        !this.filter && 
            this.set('filter', App.Dossier.BattleTypeFilter.create());

        this.initColumns([
              'battle.avgTier:tier'
            , 'icon:icon'
            , 'title'
            , 'battle.battles:number'
            , 'battle.winRate:percent'
            , 'battle.avgDamageDealt:float'
            , 'battle.avgFrags:float'
            , 'battle.avgSpotted:float'
            , 'battle.hitRate:percent'
            // , 'battle.piercingEfficiency:percent'
            // , 'battle.armorEfficiency:percent'
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
});

App.DossierController = App.DossierBaseController.extend({

    aggregated: Ember.computed(function () {
        return App.AggregatedDossier.create({
            data: this.content
            , filter: this.filter
        });
    })  
    .property('content', 'filter.@each')

    , actions: {
        updateDossier: function (response) {
            if (response.status === 'ok') {
                if (response.data.player !== this.get('content.player')) {
                    this.send('showError', trans('app.dossier.error.wrong-player'));
                } else {
                    this.send('showSuccess', trans('app.dossier.did-refresh'));
                    this.set('content', App.Dossier.Store.fromJSON(response.data));
                }
            } else {
                this.send('showError', trans('app.dossier.error.upload'));
            }
        }
    }
});

App.DossierView = Ember.View.extend({
    
});