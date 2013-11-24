App.DossierRoute = App.Route.extend({

    model: function (params) {

        return App.Dossier.Store.byPlayer(params.player);
    }

    , serialize: function (model) { 

        return model.get('dossier');
    }

    , actions: {

        error: function (xhr, transition) {

            if (xhr.status !== 404) return true;

            this.transitionWithErrorTo('index', trans('app.dossier.error.not-found'));
        }
    }
});

App.DossierController = Ember.ObjectController.extend({

    actions: {

        updateDossier: function (dossier) {
            if (dossier.get('dossier.player') !== this.get('model.dossier.player')) {
                App.set('error', trans('app.dossier.error.wrong-player'));
            } else {
                App.set('success', trans('app.dossier.did-refresh'));
                this.send('showDossier', dossier);
            }
        }
    }
})