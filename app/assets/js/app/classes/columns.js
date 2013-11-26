App.Dossier.Column = Ember.Object.extend({

    key: null
    , enabled: true
    , position: 0
    , type: null

    , title: function () {

        return trans('app.dossier.columns.' + this.get('key'));
    }
    .property()

    , className: function () {

        return 'col-' + this.get('type') + ' col-' + this.get('key').replace(/\./g, '-');
    }
    .property()

    , getValue: function (model) {

        return model.get(this.get('key'));
    }
});

App.Dossier.TransparentColumn = App.Dossier.Column.extend({
    type: 'transparent'
});

App.Dossier.FloatColumn = App.Dossier.Column.extend({
    type: 'float'

    , getValue: function (model) {

        var value = this._super(model);

        if (value === null) return '&mdash;';

        return value.toFixed(2);
    }
});

App.Dossier.TierColumn = App.Dossier.Column.extend({
    type: 'tier'

    , getValue: function (model) {

        var value = this._super(model);

        return model.get('isTotals') ? value.toFixed(2) : value;
    }
});

App.Dossier.PercentColumn = App.Dossier.Column.extend({
    type: 'percent'

    , getValue: function (model) {

        var value = this._super(model);

        if (value === null) return '&mdash;';

        return (100 * value).toFixed(2) + '%';
    }
});

App.Dossier.EfficiencyColumn = App.Dossier.Column.extend({
    type: 'efficiency'

    , title: function () {
        return this.get('owner.formula.name');
    }
    .property('owner.formula')

    , getValue: function (model) {

        var formula = this.get('owner.formula')
            , value = formula.compute(model)
            , key = formula.key(value);

        return '<span class="color-scale ' + key + '"></span> ' + value;
    }
});

App.Dossier.Column.reopenClass({

    Repository: {
        'float': App.Dossier.FloatColumn
        , 'tier': App.Dossier.TierColumn
        , 'percent': App.Dossier.PercentColumn
        , 'efficiency': App.Dossier.EfficiencyColumn
    }

    , create: function (params, type) {

        var constructor = this.Repository[type] || App.Dossier.TransparentColumn;

        return constructor.create(params);
    }
});

Ember.Handlebars.helper('cols', function (model, options) {

    var columns = options.data.keywords.controller.get('columns')
        , buf = '';

    columns.forEach(function (col) {
        buf += '<td class="' + col.get('className') + '">' + col.getValue(model) + '</td>';
    });

    return new Ember.Handlebars.SafeString(buf);
});