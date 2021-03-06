App.Dossier.BattleFilter = App.Dossier.BaseFilter.extend({
    random: true
    , clan: false
    , company: false
    , b7_42: false

    , all: Ember.computed(function (key, value) {
        if (arguments.length > 1) {
            this.setProperties({
                random: value
                , clan: value
                , company: value
                , b7_42: value
            });
        }

        return this.random && this.clan && this.company && this.b7_42;
    })
    .property('@each')

    , init: function () { this.get('@each'); }

    , battle: function (battle) {
        return !!this.get(this.key(battle.type));
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

    , '@each': Ember.computed(function () {
        console.log('battleType');
        return true;
    })
    .property('random', 'clan', 'company', 'b7_42').readOnly()
});

App.BattleFilterView = Ember.View.extend({
    classNames: ['btn-group', 'btn-group-xs']
    , templateName: 'views/battleFilter'

    , filter: null
});