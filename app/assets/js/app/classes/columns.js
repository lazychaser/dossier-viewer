App.Dossier.Column = Ember.Object.extend({

    key: null
    , enabled: true
    , position: 0
    , type: null
    , comparable: false

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

        if (model.other) {
            this.comparable ? this.renderCompare(b, model) : this.renderCell(b, model.player);
        } else {
            this.renderCell(b, model);
        }

        b.push('</td>');
    }

    , renderCell: function (b, model) {
        var value = this.getValue(model);

        value === null ? this.renderEmpty(b) : b.push(this.format(value, model));
    }

    , renderEmpty: function (b) {
        b.push('&mdash;');
    }

    , renderCompare: function (b, model) {
        var playerValue = this.getValue(model.player)
            , otherValue = this.getValue(model.other)
            , diff = playerValue - otherValue;

        if (playerValue === null || otherValue === null) {
            this.renderEmpty(b);
            return;
        }

        this.renderCell(b, model.player);

        if (diff === 0) {
            return;
        }

        var sign = diff > 0 ? 'gt' : 'lt';

        b.push('<span class="compare-value compare-value-' + sign + '">' + this.format(Math.abs(diff), model) + '</span>');
    }

    , getValue: function (model) {
        return model.get(this.get('key'));
    }

    , format: function (value, model) {
        return value;
    }
});

App.Dossier.TransparentColumn = App.Dossier.Column.extend({
    type: 'transparent'
});

App.Dossier.NumberColumn = App.Dossier.Column.extend({
    type: 'number'
    , comparable: true
});

App.Dossier.FloatColumn = App.Dossier.Column.extend({
    type: 'float'
    , comparable: true

    , format: function (value) {
        return value.toFixed(2);
    }
});

App.Dossier.TierColumn = App.Dossier.Column.extend({
    type: 'tier'
    , comparable: true

    , format: function (value, model) {
        return model.isTotals ? value.toFixed(2) : value;
    }
});

App.Dossier.PercentColumn = App.Dossier.Column.extend({
    type: 'percent'
    , comparable: true

    , format: function (value, model) {
        return (100 * value).toFixed(2) + '%';
    }
});

App.Dossier.EfficiencyColumn = App.Dossier.Column.extend({
    type: 'efficiency'
    , comparable: true

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

    , getValue: function (model) {
        return this.get('owner.formula').compute(model);
    }
});

App.Dossier.IconColumn = App.Dossier.Column.extend({
    type: 'icon'

    , renderCell: function (b, model) {
        var icon = model.isTotals ? 'Observer' : model.tank.info.icon;

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
        , 'number': App.Dossier.NumberColumn
    }

    , create: function (params, type) {
        var constructor = this.Repository[type] || App.Dossier.TransparentColumn;

        return constructor.create(params);
    }
});