App.Dossier.TankBattles = Ember.Object.extend({

    init: function () {
        
        this.battles = $.map(this.battles, function (i) {

            return App.Dossier.Battle.create(i);
        });

        this.tank = App.Dossier.Tank.create(this.tank);
    }
});