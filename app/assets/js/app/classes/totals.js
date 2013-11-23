App.Dossier.Totals = App.Dossier.Stats.extend({

    efficiency: null

    , init: function() {

        this.isTotals = this.tank === undefined;
        this.tank = this.tank || App.Dossier.Tank.create();
        this.battle = this.battle || App.Dossier.Battle.create();
    }

    , merge: function (other) {

        this.tank.merge(other.tank);
        this.battle.merge(other.battle);

        return this;
    }

    , computeEfficiency: function (formula) {

        this.set('efficiency', formula.compute(this));

        return this;
    }

    , isMuted: function () {

        return this.get('battle').get('battles') < 50;
    }
    .property().readOnly()
});