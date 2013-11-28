App.Dossier.TankBattles = Ember.Object.extend({
    init: function () {
        this.set('battles', Ember.$.map(this.battles, function (item) {
            return App.Dossier.Battle.create(item);
        }));

        this.set('tank', App.Dossier.Tank.create(this.tank));
    }
});