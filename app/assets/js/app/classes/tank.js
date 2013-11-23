App.Dossier.Tank = App.Dossier.Stats.extend({

    mergeFields: { 
        sum: ['battles', 'battles_old', 'mileage', 'trees_cut']
        , max: ['last_played_at', 'created_at', 'updated_at']
    }

    , icon: function () {

        return 'icon-tank-' + this.get('info.icon');
    }
    .property()
});