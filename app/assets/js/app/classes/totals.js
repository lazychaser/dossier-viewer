App.Dossier.Totals = App.Dossier.Stats.extend({
    title: Ember.computed(function () {
        return this.get('isTotals') ? 'По аккаунту' : this.get('tank.info.title');
    })

    , init: function() {
        this.set('isTotals', this.tank === undefined);
        !this.tank && this.set('tank', App.Dossier.Tank.create());
        !this.battle && this.set('battle', App.Dossier.Battle.create());
    }

    , merge: function (other) {
        this.tank.merge(other.tank);
        this.battle.merge(other.battle);

        return this;
    }
});