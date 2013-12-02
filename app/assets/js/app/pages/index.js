App.IndexController = Ember.ObjectController.extend({
    actions: {
        uploadDossier: function (response) {
            if (response.status === 'ok') {
                this.send('showDossier', App.Dossier.Store.fromJSON(response.data));
            } else {
                this.send('showError', trans('app.dossier.error.upload'));
            }
        }
    }
});

App.IndexRoute = App.Route.extend({});