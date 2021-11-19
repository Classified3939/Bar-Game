addLayer("tfd", {
    name: "the_first_difficulty", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TFD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    effect:('tfd'.points),
    color: "#333333",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "THE FIRST DIFFICULTY", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Gain THE FIRST DIFFICULTY", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title: "Impossible to lose.",
            description: "You legit cannot lose to TFD. x5 win gain.",
            cost: new.Decimal(50)
        }
    }
})
