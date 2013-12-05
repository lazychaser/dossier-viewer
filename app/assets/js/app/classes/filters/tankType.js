App.Dossier.TankTypeFilter = App.Dossier.BaseFilter.extend({
    lite: true
    , medium: true
    , heavy: true
    , td: true
    , artillery: true

    , all: Ember.computed(function (key, value) {
        if (arguments.length > 1) {
            this.setProperties({
                lite: value
                , medium: value
                , heavy: value
                , td: value
                , artillery: value
            });
        }

        return this.lite && this.medium && this.heavy && this.td && this.artillery;
    })
    .property('@each')

    , init: function () { this.get('@each'); }

    , tank: function (tank) {
        return !!this.get(this.key(tank.info.type));
    }

    , key: function (battleType) {
        switch (battleType)
        {
            case 1: return 'lite';
            case 2: return 'medium';
            case 3: return 'heavy';
            case 4: return 'td';
            case 5: return 'artillery';
        }
    }

    , '@each': Ember.computed(function () {
        console.log('tankType');
        return true;
    })
    .property('lite', 'medium', 'heavy', 'td', 'artillery').readOnly()


});

App.TankTypeFilterView = Ember.View.extend({
    classNames: ['btn-group', 'btn-group-xs']
    , templateName: 'views/tankTypeFilter'
});