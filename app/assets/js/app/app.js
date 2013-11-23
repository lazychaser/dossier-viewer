$('#loading').remove();

App = Ember.Application.create({
    error: null
});

App.Router.map(function () {
    this.resource('dossier', { path: ':player' });
});

App.LoadingRoute = Ember.Route.extend({});

App.ErrorView = Ember.View.extend({
    tagName: 'p',
    classNames: 'alert alert-danger app-error',

    didInsertElement: function () { this.$().fadeIn('fast'); },
    willDestroyElement: function () { this.$().fadeOut('fast'); }
});