App.Dossier.EffFormula = App.Dossier.BaseFormula.extend({
    name: 'Eff'
    , code: 'eff'

    , cuts: [ 630, 860, 1140, 1460, 1735 ]

    , compute: function (totals) {
        var b = totals.battle
            , battles = b.battles;

        if (!battles) return null;

        var   tier = b.get('avgTier')
            , frag = b.get('avgFrags')
            , dmg  = b.get('avgDamageDealt')
            , spot = b.get('avgSpotted')
            , def  = b.get('avgDroppedCapturePoints')
            , capt = b.get('avgCapturePoints')
            , v    = 0.0
            ;

        v += dmg * (10 / (tier + 2)) * (0.21 + 3 * tier / 100);
        v += frag * 250;
        v += spot * 150;
        v += Math.log(capt + 1) / Math.log(1.732) * 150;
        v += def * 150;

        return Math.round(v);
    }
});