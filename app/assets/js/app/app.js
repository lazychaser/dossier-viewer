$('#loading').remove();

App = Ember.Application.create({
    error: null
});

App.Router.map(function () {
    this.resource('dossier', { path: ':player' });
});

App.ApplicationRoute = Ember.Route.extend({

    actions: {
        loading: function () {

            var view = Ember.View.create({
                tagName: 'div'
                , classNames: 'app-loading'
            }).append();

            this.router.one('didTransition', function () {
                view.destroy();
            });
        }

        , error: function (xhr, transition) {
            var message = xhr.responseJSON.error.message || trans('app.general-error');

            App.set('error', message);
            this.transitionTo('index');
        }

        , showDossier: function (dossier) {
            this.transitionTo('dossier', dossier);
        }
    }
});

App.ErrorView = Ember.View.extend({
    tagName: 'p',
    classNames: 'alert alert-danger app-error',

    didInsertElement: function () { this.$().fadeIn('fast'); },
    willDestroyElement: function () { this.$().fadeOut('fast'); }
});