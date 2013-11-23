App.DossierRoute = Ember.Route.extend({

    model: function (params) {

        return App.Dossier.byPlayer(params.player);
    }

    , serialize: function (model) { 

        return model.get('dossier');
    }

    , actions: {

        error: function (xhr) {
            if (xhr.code !== 404) return true;

            this.transitionTo('index');
            App.set('error', trans('app.dossier.error.not-found'));
        }
    }
});

App.DossierController = Ember.ObjectController.extend({

    actions: {

        updateDossier: function (dossier) {
            if (dossier.dossier.player !== this.get('model.dossier.player')) {
                App.set('error', trans('app.dossier.error.wrong-player'));
            } else {
                this.send('showDossier', dossier);
            }
        }
    }
})