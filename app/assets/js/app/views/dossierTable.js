App.DossierTableView = Ember.View.extend({

    render: function (b) {
        var stats = this.get('owner.stats');

        if (stats.length === 0) {
            b.push('<p>' + trans('app.dossier.no-tanks') + '</p>');

            return;
        }

        var totals = this.get('owner.totals')
            , columns = this.get('owner.columns');

        b.push('<table class="dossier-table table table-hover table-condensed">');
        
        this.renderHead(b, columns);
        this.renderTotals(b, columns, totals);
        this.renderItems(b, columns, stats);

        b.push('</table>');
    }

    , renderHead: function (b, columns) {
        b.push('<thead><tr>');

        columns.forEach(function (column) { column.renderHead(b); });

        b.push('</tr></thead>');
    }

    , renderTotals: function (b, columns, item) {
        b.push('<tbody class="account">');

        this.renderRow(b, columns, item);

        b.push('</tbody>');
    }

    , renderItems: function (b, columns, items) {
        var me = this;

        b.push('<tbody class="items">');

        items.forEach(function (model) { me.renderRow(b, columns, model); });

        b.push('</tbody>');
    }

    , renderRow: function (b, columns, model) {
        b.push('<tr class="item');

        model.get('isTotals') && b.push(' is-totals');
        model.get('isMuted') && b.push(' is-muted');

        b.push('">');

        columns.forEach(function (column) { column.render(b, model); });

        b.push('</tr>');
    }

    , needRerender: function () {
        this.rerender();
    }
    .observes('owner.stats')
});