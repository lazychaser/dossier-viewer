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

    , battlesNew: Ember.computed(function () {

        return this.battles - this.battles_old;
    })

    , winRate: Ember.computed(function () { 

        return this.battles > 0 ? this.wins / this.battles : null; 
    })

    , hitRate: Ember.computed(function () { 

        return this.shots > 0 ? this.hits / this.shots : null; 
    })

    , avgSurvived: Ember.computed(function () { 

        return this.battles > 0 ? this.survived / this.battles : null; 
    })

    , avgTier: Ember.computed(function () { 

        return this.battles > 0 ? this.tier / this.battles : null; 
    })

    , avgDamageDealt: Ember.computed(function () {

        return this.battles > 0 ? this.damage_dealt / this.battles : null; 
    })

    , avgHits: Ember.computed(function () { 

        return this.battles > 0 ? this.hits / this.battles : null; 
    })

    , avgFrags: Ember.computed(function () { 

        return this.battles > 0 ? this.frags / this.battles : null; 
    })

    , avgSpotted: Ember.computed(function () { 

        return this.battles > 0 ? this.spotted / this.battles : null; 
    })

    , avgCapturePoints: Ember.computed(function () { 

        return this.battles > 0 ? this.capture_points / this.battles : null; 
    })

    , avgDroppedCapturePoints: Ember.computed(function () { 

        return this.battles > 0 ? this.dropped_capture_points / this.battles : null; 
    })

    , armorEfficiency: Ember.computed(function () {

        if (!this.get('battlesNew')) return null;

        return this.received_hits > 0 ? 
            (1 - this.received_pierced_hits / this.received_hits) : null;
    })

    , piercingEfficiency: Ember.computed(function () {

        if (!this.get('battlesNew')) return null;

        return this.hits > 0 ? this.pierced_hits / this.hits : null;
    })

    , merge: function (other) {
        this.type = this.type || other.type;
        this.type !== other.type && (this.type = App.Dossier.BattleTypes.AGGREGATED);

        return this._super(other);
    }
});