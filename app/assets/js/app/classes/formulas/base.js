App.Dossier.BaseFormula = Ember.Object.extend({

    compute: function (totals) { return 0; }

    , key: function (value) {

        var cuts = this.get('cuts')
            , key = App.Dossier.BaseFormula.ColorKeys[0]
            ;

        if (value < cuts[0]) return key;

        for (var i = App.Dossier.BaseFormula.ColorKeys.length - 2; i > 0; i--) {
            if (value >= cuts[i]) {
                key = App.Dossier.BaseFormula.ColorKeys[i + 1];
                break;
            }
        }

        return key;
    }
});

App.Dossier.BaseFormula.ColorKeys = [
    'bad',
    'below-average',
    'average',
    'good',
    'great',
    'unicum',
];