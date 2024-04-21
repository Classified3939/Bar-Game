addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        oneKMeta: false,
    }},

    color: "#EFFD5F",                       // The color for this layer, which affects many elements.
    resource: "achievements",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    type: "none",                         // Determines the formula used for calculating prestige currency.

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    achievements:{
        11:{
            name:"Look ma, no hands!",
            tooltip: "Fill up the first bar five times by doing... absolutely nothing!",
            done() {return player["b"].pointMultipliers[0].gt(1.5)},
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
        12:{
            name:"10 Bar Points is a lot",
            tooltip: "Purchase the Orange Bar",
            done() {return player["b"].barsUnlocked.gte(2)},
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
        13:{
            name:"Eco-friendly",
            tooltip: "Get a Green Multiplier of at least 2.5x",
            done() {return player["b"].pointMultipliers[3].gte(2.5)},
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
        14:{
            name:"Ah yes, the 6 colors of the rainbow.",
            tooltip: "Purchase the Purple Bar",
            done() {return player["b"].barsUnlocked.gte(6)},
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
        15:{
            name:"Multiplicity",
            tooltip: "Get 1 million points every bar fill. Reward: Unlock Meta-bar layer.",
            done() {
                return layers["b"].getTotalMultiplier().gte(1e6);
            },
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
        21:{
            name: "Supply Limit Exceeded",
            tooltip: "Get 100 levels of Red Bar",
            done(){
                return getBuyableAmount("b","redBarLevel").gte(100);
            },
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
        22:{
            name: "Under the Rainbow",
            tooltip: "Get 1 billion total bar multiplier with only Red and Orange unlocked (auto-unlocks if you miss it)",
            done(){
                return layers["b"].getTotalMultiplier().gte(1e9) && player["b"].barsUnlocked.lte(2) || hasAchievement("a","24"); 
            }
        },
        23:{
            name: "That's Pretty Meta",
            tooltip: "Get 1,000 Meta-Bar points in a single Meta reset. Reward: Gain 100% of your Bar Point gain each second.",
            done(){
                return player[this.layer].oneKMeta;
            }
        },
        24: {
            name: "Need a New Supplier",
            tooltip: "Get 100 levels of all 6 bars. Reward: Start with all 6 bars unlocked.",
            done(){
                return getBuyableAmount("b","redBarLevel").gte(100) && getBuyableAmount("b","orangeBarLevel").gte(100)
                && getBuyableAmount("b","yellowBarLevel").gte(100) && getBuyableAmount("b","greenBarLevel").gte(100)
                && getBuyableAmount("b","blueBarLevel").gte(100) && getBuyableAmount("b","purpleBarLevel").gte(100);
            },
            effect(){
                if (hasAchievement("a","24") && player["b"].barsUnlocked.lte(6)) player["b"].barsUnlocked = new Decimal(6);
            }
        },
        25:{
            name:"Meta-Millions",
            tooltip: "Get 1 million Meta-bar points. Reward: Win Bar Game v0.2!",
            done() {
                return player["m"].points.gte(1e6);
            },
            onComplete(){
                console.log("CONGRATS");
            }
        }
    }
})