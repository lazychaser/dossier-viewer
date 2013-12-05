App.Dossier.FilterCollection = App.Dossier.BaseFilter.extend({
    battleType: App.Dossier.BattleFilter.create()
    , tankType: App.Dossier.TankTypeFilter.create()

    , init: function () { this.get('@each'); }

    , tank: function (tank) { return this.tankType.tank(tank); }
    , battle: function (battle) { return this.battleType.battle(battle); }

    , '@each': Ember.computed(function () {
        console.log('collection');
        return true;
    })
    .property('battleType.@each', 'tankType.@each')

    , filterChanged: function() {}
    .observes('battleType.@each', 'tankType.@each')
});