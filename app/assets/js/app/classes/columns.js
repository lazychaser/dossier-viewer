App.Dossier.Column = Ember.Object.extend({

    key: null
    , enabled: true
    , position: 0
    , type: null

    , className: Ember.computed(function () {
        return 'col-' + this.get('type') + ' col-' + this.get('key').replace(/\./g, '-');
    })

    , renderHead: function (b) {
        b.push('<th class="' + this.get('className') + '">');

        this.renderHeadCell(b);

        b.push('</th>');
    }

    , renderHeadCell: function (b) {
        b.push(trans('app.dossier.columns.' + this.get('key')));
    }

    , render: function (b, model) {
        b.push('<td class="' + this.get('className') + '">');

        this.renderCell(b, model);

        b.push('</td>');
    }

    , renderCell: function (b, model) {
        var value = this.getValue(model);

        value === null ? this.renderEmpty(b) : b.push(value);
    }

    , renderEmpty: function (b) {
        b.push('&mdash;');
    }

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

        return value === null ? null : value.toFixed(2);
    }
});

App.Dossier.TierColumn = App.Dossier.Column.extend({
    type: 'tier'

    , getValue: function (model) {
        var value = this._super(model);

        if (value === null) return value;

        return model.get('isTotals') ? value.toFixed(2) : value;
    }
});

App.Dossier.PercentColumn = App.Dossier.Column.extend({
    type: 'percent'

    , getValue: function (model) {
        var value = this._super(model);

        if (value === null) return null;

        return value !== null && (100 * value).toFixed(2) + '%' || null;
    }
});

App.Dossier.EfficiencyColumn = App.Dossier.Column.extend({
    type: 'efficiency'

    , renderHeadCell: function (b) {
        b.push(this.get('owner.formula.name'));
    }

    , renderCell: function (b, model) {
        var formula = this.get('owner.formula')
            , value = formula.compute(model)
            ;

        if (value === null) {
            this.renderEmpty(b);
            return;
        }

        b.push('<span class="color-scale ' + formula.key(value) + '"></span> ');
        b.push(value);
    }
});

App.Dossier.IconColumn = App.Dossier.Column.extend({
    type: 'icon'

    , renderCell: function (b, model) {
        var icon = model.get('isTotals') ? 'Observer' : model.get('tank.info.icon');

        b.push('<span class="icon-tank icon-tank-' + icon + '"></span>');
    }
});

App.Dossier.Column.reopenClass({

    Repository: {
        'float': App.Dossier.FloatColumn
        , 'tier': App.Dossier.TierColumn
        , 'percent': App.Dossier.PercentColumn
        , 'efficiency': App.Dossier.EfficiencyColumn
        , 'icon': App.Dossier.IconColumn
    }

    , create: function (params, type) {
        var constructor = this.Repository[type] || App.Dossier.TransparentColumn;

        return constructor.create(params);
    }
});