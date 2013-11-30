App.FavsView = Ember.View.extend({
    classNames: ['fav-player']
    , classNameBindings: ['checked:active']
    , repository: App.favs

    , checked: Ember.computed(function () {
        return App.favs.exists(this.player);
    })
    .property('player', 'repository.players.@each')

    , click: function () {
        this.repository.toggle(this.player);
    }
});