$('#loading').remove();

App = Ember.Application.create();

App.Router.map(function () {
    this.resource('dossier', { path: ':player' });
});

App.Route = Ember.Route.extend({

    deactivate: function () { this.send('hideMessages'); }
    , beforeModel: function () { this.controller && this.send('hideMessages'); }

    , transitionWithErrorTo: function (route, message) {
        return this.transitionTo(route).then(function (route) {
            route.send('showError', message);
        });
    }
});

App.ApplicationRoute = App.Route.extend({

    actions: {

        /**
         * Handle general error from AJAX response.
         *
         * @param  {jqXHR} xhr
         * @param  {Ember.Transition} transition
         *
         * @return {void}
         */
        error: function (xhr, transition) {
            var message = xhr.responseJSON.error.message || trans('app.general-error');

            this.controller && this.controller.send('showError', message) ||
                this.transitionWithErrorTo('index', message);
        }

        , showError: function (message) {
            this.controller.set('error', message);
        }

        , showSuccess: function (message) {
            this.controller.set('success', message);
        }

        , hideMessages: function () {
            this.controller && this.controller.set('error', null);
            this.controller && this.controller.set('success', null);
        }

        , showDossier: function (dossier) {
            this.transitionTo('dossier', dossier);
        }
    }
});

App.ApplicationController = Ember.Controller.extend({
    error: null
    , success: null
});

App.LoadingRoute = App.Route.extend({});
App.LoadingView = Ember.View.extend({
    tagName: 'div'
    , classNames: 'app-loading'
});