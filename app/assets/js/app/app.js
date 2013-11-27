$('#loading').remove();

App = Ember.Application.create({
    error: null
    , success: null
});

App.Router.map(function () {
    this.resource('dossier', { path: ':player' });
});

App.Route = Ember.Route.extend({

    deactivate: function () { App.set('error', null); }
    , beforeModel: function () { App.set('error', null); }

    , transitionWithErrorTo: function (route, message) {

        this.transitionTo(route).then(function () {
            App.set('error', message);
        });
    }
});

App.ApplicationRoute = App.Route.extend({

    actions: {
        /*loading: function () {

            var view = Ember.View.create({
                
            })
            .append();

            this.router.one('didTransition', function () {
                view.destroy();
            });
        }

        , */error: function (xhr, transition) {
            var message = xhr.responseJSON.error.message || trans('app.general-error');

            this.transitionWithErrorTo('index', message);
        }

        , showDossier: function (dossier) {
            this.transitionTo('dossier', dossier);
        }
    }
});

App.LoadingRoute = App.Route.extend({});
App.LoadingView = Ember.View.extend({
    tagName: 'div'
    , classNames: 'app-loading'
});