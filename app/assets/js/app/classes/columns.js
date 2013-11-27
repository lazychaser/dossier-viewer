App.Dossier.Column = Ember.Object.extend({

    key: null
    , enabled: true
    , position: 0
    , type: null

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
        b.push(this.getValue(model));
    }

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

    , renderHeadCell: function (b) {
        b.push(this.get('owner.formula.name'));
    }

    , renderCell: function (b, model) {
        var formula = this.get('owner.formula')
            , value = this.getValue(model)
            ;

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

Ember.Handlebars.helper('cols', function (model, options) {

    var columns = options.data.keywords.controller.get('columns')
        , buf = '';

    columns.forEach(function (col) {
        buf += '<td class="' + col.get('className') + '">' + col.getValue(model) + '</td>';
    });

    return new Ember.Handlebars.SafeString(buf);
});