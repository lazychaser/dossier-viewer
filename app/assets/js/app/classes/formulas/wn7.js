App.Dossier.Wn7Formula = App.Dossier.BaseFormula.extend({
    
    name: 'Wn7'
    , code: 'wn7'

    , cuts: [ 455, 815, 1180, 1570, 1890 ]

    , compute: function (totals) {
        var b = totals.get('battle')
            , battles = b.get('battles');

        if (!battles) return 0;

        var   tier = b.get('avgTier')
            , frag = b.get('avgFrags')
            , dmg  = b.get('avgDamageDealt')
            , spot = b.get('avgSpotted')
            , def  = b.get('avgDroppedCapturePoints')
            , win  = totals.get('isTotals') ? 100 * b.get('winRate') : 50
            , v    = 0.0
            ;

        v += (1240 - 1040 / Math.pow(Math.min(tier, 6), 0.164)) * frag;
        v += dmg * 530 / (184 * Math.exp(0.24 * tier) + 130);
        v += spot * 125 * Math.min(tier, 3) / 3;
        v += Math.min(def, 2.2) * 100;
        v += (185 / (0.17 + Math.exp((win - 35) * -0.134)) - 500) * 0.45;
        v -= ((5 - Math.min(tier, 5)) * 125) /  
            (1 + Math.exp((tier - Math.pow(battles / 220, 3 / tier)) * 1.5));

        return Math.round(v);
    }
});