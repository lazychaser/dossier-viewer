Ember.$('#loading').remove();

var App = window.App = Ember.Application.create();

App.Router.map(function () {
    this.resource('dossier', { path: ':player' });
    this.route('compare', { path: ':player/vs/:other' }); 
    this.route('help', { path: '/?' });
});

App.ApplicationRoute = Ember.Route.extend({

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
                this.transitionTo('index').then(function (route) {
                    route.send('showError', message);
                });
        }

        , loading: function () {
            var view = Ember.View.create({
                classNames: ['app-loading']
            })
            .append();

            this.router.one('didTransition', function () {
                view.destroy();
            });
        }

        , willTransition: function () {
            this.send('hideMessages');
        }

        , didTransition: function () {
            window.ga && ga('send', 'pageview', {
                page: window.location.hash
                , title: window.location.hash
            });
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

App.LoadingRoute = Ember.Route.extend({});
App.LoadingView = Ember.View.extend({
    tagName: 'div'
    , classNames: 'app-loading'
});