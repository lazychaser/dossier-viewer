App.Dossier.BattleTypeFilter = App.Dossier.BaseFilter.extend({

    component: 'battle-type-filter'

    , random: true
    , clan: false
    , company: false
    , b7_42: false

    , init: function () { this.get('changed'); }

    , battle: function (battle) {

        return !!this.get(this.key(battle.get('type')));
    }

    , key: function (battleType) {

        switch (battleType)
        {
            case 0: return 'random';
            case 1: return 'clan';
            case 2: return 'company';
            case 3: return 'b7_42';
        }
    }

    , changed: function () {}
    .property('random', 'clan', 'company', 'b7_42').readOnly()
});

App.Dossier.BattleTypeFilterComponent = Ember.Component.extend({
    templateName: 'filters/battleType'

});