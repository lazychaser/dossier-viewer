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

    , battlesNew: function () {

        return this.battles - this.battles_old;
    }
    .property()

    , winRate: function () { 

        return this.battles > 0 ? this.wins / this.battles : null; 
    }
    .property()

    , hitRate: function () { 

        return this.shots > 0 ? this.hits / this.shots : null; 
    }
    .property()

    , avgTier: function () { 

        return this.battles > 0 ? this.tier / this.battles : null; 
    }
    .property()

    , avgDamageDealt: function () { 

        return this.battles > 0 ? this.damage_dealt / this.battles : null; 
    }
    .property()

    , avgHits: function () { 

        return this.battles > 0 ? this.hits / this.battles : null; 
    }
    .property()

    , avgFrags: function () { 

        return this.battles > 0 ? this.frags / this.battles : null; 
    }
    .property()

    , avgSpotted: function () { 

        return this.battles > 0 ? this.spotted / this.battles : null; 
    }
    .property()

    , avgDroppedCapturePoints: function () { 

        return this.battles > 0 ? this.dropped_capture_points / this.battles : null; 
    }
    .property()

    , armorEfficiency: function () {

        if (!this.get('battlesNew')) return null;

        return this.received_hits > 0 ? 
            (1 - this.received_pierced_hits / this.received_hits) : null;
    }
    .property()

    , piercingEfficiency: function () {

        if (!this.get('battlesNew')) return null;

        return this.hits > 0 ? this.pierced_hits / this.hits : null;
    }
    .property()
});