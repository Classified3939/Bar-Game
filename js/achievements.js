addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#EFFD5F",                       // The color for this layer, which affects many elements.
    resource: "achievements",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    type: "none",                         // Determines the formula used for calculating prestige currency.

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    achievements:{
        11:{
            name:"Look ma, no hands!",
            tooltip: "Fill up the first bar a few times by doing... absolutely nothing!",
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
            tooltip: "Get 1e5 points every bar fill.",
            done() {
                let pointsEveryBar = new Decimal(1)
                for (let i = 0; i < player["b"].barsUnlocked; i++){
                    pointsEveryBar = pointsEveryBar.mul(player["b"].pointMultipliers[i])
                }
                return pointsEveryBar.gte(1e5);
            },
            onComplete(){
                player[this.layer].points = player[this.layer].points.add(1);
            }
        },
    }
})