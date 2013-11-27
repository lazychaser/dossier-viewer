App.Dossier.Totals = App.Dossier.Stats.extend({

    init: function() {

        this.set('isTotals', this.get('tank') === undefined);

        !this.get('tank') && 
            this.set('tank', App.Dossier.Tank.create());

        !this.get('battle') &&
            this.set('battle', App.Dossier.Battle.create());
    }

    , merge: function (other) {

        this.tank.merge(other.tank);
        this.battle.merge(other.battle);

        return this;
    }

    , title: function () {
        return this.get('isTotals') ? 'По аккаунту' : this.get('tank.info.title');
    }
    .property()

    , efficiency: function () {

        return this.get('controller.formula').compute(this);
    }
    .property('controller.formula').readOnly()

    , efficiencyKey: function () {

        return this.get('controller.formula').key(this.get('efficiency'));
    }
    .property('efficiency')

    , isMuted: function () {

        return this.get('battle').get('battles') < 50;
    }
    .property().readOnly()
});