App.ButtonToggle = Ember.View.extend({
    tagName: 'button'
    , classNames: ['btn']
    , classNameBindings: ['checked:active']

    , init: function () {
        this._super();
        this.on('click', this, this._toggle);
    }

    , _toggle: function () {
        this.toggleProperty('checked');
    }
});