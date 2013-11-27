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