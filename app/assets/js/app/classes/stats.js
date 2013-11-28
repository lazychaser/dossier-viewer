App.Dossier.Stats = Ember.Object.extend({
    merge: function (other) {
        var me = this
            , merge = me.get('mergeFields');

        $.each(merge, function (func, fields) {

            func = me[func] || function () { return 0; };

            $.each(fields, function (i, field) {

                var value = me[field] || 0;

                me[field] = func(value, other[field]);
            });
        });

        return me;
    }

    , mergeAll: function (others) {
        others.forEach(function (item) { this.merge(item); }, this);

        return this;
    }

    , sum: function (a, b) { return a + b; }
    , max: function (a, b) { return Math.max(a, b); }
});