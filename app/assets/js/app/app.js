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
})

App.ApplicationRoute = App.Route.extend({

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

            this.transitionWithErrorTo('index', message);
        }

        , showDossier: function (dossier) {
            this.transitionTo('dossier', dossier);
        }
    }
});

App.AlertView = Ember.View.extend({
    templateName: 'alert'
    , tagName: 'p'
    , classNames: 'alert app-alert'
    , classNameBindings: ['message::is-hidden', 'typeClass']
    , message: null
    , type: 'danger'
    , timeout: null

    , typeClass: function () {
        return 'alert-' + this.get('type');
    }
    .property('type')

    , messageChanged: function () {
        var me = this
            , timeout = me.get('timeout')
            , message = me.get('message')
            ;

        timeout && message && setTimeout(function () { me.send('close'); }, timeout);
    }   
    .observes('message')

    , actions: {

        close: function () {
            this.set('message', null);
        }
    }
});