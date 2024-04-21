addLayer("m", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,             // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        barProgress: new Decimal(0),
        progressMult: new Decimal(0),
        power: new Decimal(0),
        powerOnFill: new Decimal(0.1),
    }},

    layerShown(){
        return hasAchievement("a","15");
    },
    symbol: "M",
    color: "whitesmoke",                       // The color for this layer, which affects many elements.
    resource: "meta-bar points",            // The name of this layer's main prestige resource.
    row: 1,
    branches:["b"],

    baseResource: "total bar multiplier",                 // The name of the resource your prestige gain is based on.
    baseAmount() {
        if (layers["b"].getTotalMultiplier() === undefined) return new Decimal(1);
        return layers["b"].getTotalMultiplier();
    },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e6),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.25,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    getSpeedMult(){
        if (!player["m"].unlocked) return new Decimal(1)
        if (player[this.layer].points.eq(0)) return new Decimal(1.5);
        return (new Decimal(2).add(player[this.layer].points.ln().div(new Decimal(1).add(player[this.layer].points.log10()))))
    },
    bars:{
        whiteBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult.gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress
            },
            unlocked(){ return true},
            fillStyle: {"background-color":"whitesmoke","transition-duration":"0.05s"},
            textStyle: {"color":"black"},
            display(){
                if (player[this.layer].progressMult.gt(options.maxBarSpeed)) 
                    return format(player[this.layer].progressMult) + "/s";
            },
        }
    },
    buyables:{
        11:{
            cost(x) {return (new Decimal(1).mul(x.add(1)).mul(new Decimal(1.02).pow(x)))},
            display() {return "Small Meta-Progress Lv."+getBuyableAmount(this.layer,this.id)+"<br> "+
            "+0.1 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult = player[this.layer].progressMult.add(0.1);
            },
        },
        12:{
            cost(x) {return (new Decimal(10).mul(x.add(1)).mul(new Decimal(1.03).pow(x)))},
            display() {return "Medium Meta-Progress Lv."+getBuyableAmount(this.layer,this.id)+"<br> "+
            "+1 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult = player[this.layer].progressMult.add(1);
            },
        },
        13:{
            cost(x) {return (new Decimal(100).mul(x.add(1)).mul(new Decimal(1.04).pow(x)))},
            display() {return "Large Meta-Progress Lv."+getBuyableAmount("m","11")+"<br> "+
            "+5 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult = player[this.layer].progressMult.add(5);
            },
        },
    },
    milestones:{
        0:{
            requirementDescription: "5 Meta-bar Power.",
            effectDescription: "1/2 of Meta-bar power adds to Orange Bar mult/fill",
            done(){
                return player[this.layer].power.gte(5);
            }
        },
        1:{
            requirementDescription: "20 Meta-bar Power",
            effectDescription: "1/3rd of Meta-bar power adds to Yellow Bar mult/fill",
            done(){
                return player[this.layer].power.gte(20);
            }
        },
        2:{
            requirementDescription: "75 Meta-bar Power",
            effectDescription: "1/5th of Meta-bar power adds to Green Bar mult/fill",
            done(){
                return player[this.layer].power.gte(75);
            }
        },
        3:{
            requirementDescription: "400 Meta-bar Power",
            effectDescription: "1/7th of Meta-bar power adds to Blue Bar mult/fill",
            done(){
                return player[this.layer].power.gte(400);
            }
        },
        4:{
            requirementDescription: "1500 Meta-bar Power",
            effectDescription: "1/10th of Meta-bar Power adds to Purple Bar mult/fill",
            done(){
                return player[this.layer].power.gte(1500);
            }
        }
    },
    tabFormat: [
        ["main-display",1],
        "prestige-button",
        ["display-text", function(){
            return "Your Meta-bar points give a bar speed multiplier of " + format(layers[this.layer].getSpeedMult());
        }],
        ["display-text", function(){
            return "You have " + format(player[this.layer].power) +" Meta-bar Power.<br>(Adds to Red Bar mult/fill)"
        }],
        "blank",
        ["bar","whiteBar"],
        "buyables",
        "blank",
        "milestones",
    ],
    update(diff){
        if(player[this.layer].barProgress === undefined) return;
        var currentProgress = player[this.layer].barProgress
        player[this.layer].barProgress = currentProgress.add(player[this.layer].progressMult.times(diff));
        while (player[this.layer].barProgress.gte(1)){
            player[this.layer].barProgress = player[this.layer].barProgress.sub(1);
            player[this.layer].power = player[this.layer].power.add(player[this.layer].powerOnFill);
        }
    },
    onPrestige(gain){
        if (gain.gte(1e3)) player["a"].oneKMeta = true;
    },
})