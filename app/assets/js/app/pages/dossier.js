App.DossierRoute = Ember.Route.extend({
    model: function (params) {
        return App.Dossier.byPlayer(params.player);
    }

    , serialize: function (model) { return model.get('dossier'); }
});