App.Dossier.WotFormula = App.Dossier.BaseFormula.extend({
    name: 'WoT'
    , code: 'wot'

    , cuts: [ 0, 1000, 3000, 5000, 7000 ]

    , compute: function (totals) {
        var b = totals.get('battle')
            , battles = b.get('battles')
            , battlesNew = b.get('battlesNew')
            ;

        if (!battles || !battlesNew) return null;

        var   win  = b.get('winRate')
            , surv = b.get('avgSurvived')
            , hit  = b.get('hitRate')
            , dmg  = b.get('avgDamageDealt')
            , xp   = b.xp_clean / battlesNew
            , v    = 0.0
            ;

        v += 3000 / (1 + Math.exp(13 - 25 * win));
        v += 1300 / (1 + Math.exp(7 - 22 * surv));
        v += 700 / (1 + Math.exp(14 - 24 * hit));
        v += 5 * xp * (2 / (1 + Math.exp(-battlesNew / 500)) - 1);
        v += dmg;

        v *= 2 / (1 + Math.exp(-battles / (totals.isTotals ? 3000 : 50))) - 1;

        return Math.round(v);
    }
});