App.Dossier.Battle = App.Dossier.Stats.extend({

    mergeFields: {
        sum: [ 
            'tier',
            'battles',
            'battles_old',
            'wins',
            'losses',
            'survived',
            'won_and_survived',
            'shots',
            'hits',
            'he_hits',
            'pierced_hits',
            'received_hits',
            'received_he_hits',
            'received_pierced_hits',
            'damage_dealt',
            'damage_received',
            'damage_assisted_track',
            'damage_assisted_radio',
            'capture_points',
            'dropped_capture_points',
            'spotted',
            'frags',
            'xp',
            'xp_old',
            'xp_clean'
        ]
    }

    , merge: function (other) {
        this.type = this.type || other.type;
        this.type !== other.type && (this.type = App.Dossier.BattleTypes.AGGREGATED);

        return this._super(other);
    }

    , avgTier: function () { 

        return this.battles > 0 ? this.tier / this.battles : 0; 

    }.property()

    , winRate: function () { 

        return this.battles > 0 ? this.wins / this.battles : 0; 

    }.property()

    , avgDamageDealt: function () { 

        return this.battles > 0 ? this.damage_dealt / this.battles : 0; 

    }.property()

    , avgFrags: function () { 

        return this.battles > 0 ? this.frags / this.battles : 0; 

    }.property()

    , avgSpotted: function () { 

        return this.battles > 0 ? this.spotted / this.battles : 0; 

    }.property()

    , avgDroppedCapturePoints: function () { 

        return this.battles > 0 ? this.dropped_capture_points / this.battles : 0; 

    }.property()
});