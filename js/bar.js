addLayer("b", {
    name: "bar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        progressMult: [new Decimal(0.6),new Decimal(0.3),new Decimal(0.2),new Decimal(0.15),new Decimal(0.1), new Decimal(0.07)],
        barProgress: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
        barsUnlocked: new Decimal(1),
        pointMultipliers: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)],
        multPerFill: [new Decimal(0.1),new Decimal(0.1),new Decimal(0.1),new Decimal(0.1),new Decimal(0.1),new Decimal(0.1)],
    }},
    color: "#F94144",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "bar points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bar points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    bars: {
        redBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult[0].gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress[0]
            },
            unlocked(){ return true},
            fillStyle: {"background-color":"#F94144","transition-duration":"0.05s"},
            display(){
                if (player[this.layer].progressMult[0].gt(options.maxBarSpeed)) return format(player[this.layer].progressMult[0]) + "/s";
            },
        },
        orangeBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult[1].gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress[1]
            },
            unlocked(){ return player[this.layer].barsUnlocked.gte(2)},
            fillStyle: {"background-color":"#F3722C","transition-duration":"0.05s"},
            display(){
                if (player[this.layer].progressMult[1].gt(options.maxBarSpeed))
                    return format(player[this.layer].progressMult[1]) + "/s";
            },
        },
        yellowBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult[2].gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress[2]
            },
            unlocked(){ return player[this.layer].barsUnlocked.gte(3)},
            fillStyle: {"background-color":"#E9B73F","transition-duration":"0.05s"},
            display(){
                if (player[this.layer].progressMult[2].gt(options.maxBarSpeed))
                    return format(player[this.layer].progressMult[2]) + "/s";
            },
        },
        greenBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult[3].gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress[3]
            },
            unlocked(){ return player[this.layer].barsUnlocked.gte(4)},
            fillStyle: {"background-color":"#90BE6D","transition-duration":"0.05s"},
            display(){
                if (player[this.layer].progressMult[3].gt(options.maxBarSpeed))
                    return format(player[this.layer].progressMult[3]) + "/s";
            },
        },
        blueBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult[4].gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress[4]
            },
            unlocked(){ return player[this.layer].barsUnlocked.gte(5)},
            fillStyle: {"background-color":"#277DA1","transition-duration":"0.05s"},
            display(){
                if (player[this.layer].progressMult[4].gt(options.maxBarSpeed)) 
                    return format(player[this.layer].progressMult[4]) + "/s";
            },
        },
        purpleBar: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() { 
                if (player[this.layer].progressMult[5].gt(options.maxBarSpeed)) return 1;
                else return player[this.layer].barProgress[5]
            },
            unlocked(){ return player[this.layer].barsUnlocked.gte(6)},
            fillStyle: {"background-color":"#6A4C93","transition-duration":"0.05s"},
            display(){
                if (player[this.layer].progressMult[5].gt(options.maxBarSpeed)) 
                    return format(player[this.layer].progressMult[5]) + "/s";
            },
        },
    },
    buyables:{
        redBarLevel:{
            cost(x) {return (new Decimal(1).mul(x).mul(new Decimal(1.02).pow(x)))},
            display() {return "Red Bar Lv."+getBuyableAmount("b","redBarLevel")+"<br> "+
            "+0.06 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult[0] = player[this.layer].progressMult[0].add(0.06);
            },
            style: {"width":"100px","height":"100px"}
        },
        orangeBarLevel:{
            cost(x) {return (new Decimal(10).mul(x).mul(new Decimal(1.05).pow(x)))},
            display() {return "Orange Bar Lv."+getBuyableAmount("b","orangeBarLevel")+"<br> "+
            "+0.03 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult[1] = player[this.layer].progressMult[1].add(0.03);
            },
            unlocked(){return player[this.layer].barsUnlocked.gte(2)},
            style() {if (this.canAfford()) return {"width":"100px","height":"100px","background-color":"#F3722C"}
                else return {"width":"100px","height":"100px"}}
        },
        yellowBarLevel:{
            cost(x) {return (new Decimal(50).mul(x).mul(new Decimal(1.07).pow(x)))},
            display() {return "Yellow Bar Lv."+getBuyableAmount("b","yellowBarLevel")+"<br> "+
            "+0.02 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult[2] = player[this.layer].progressMult[2].add(0.02);
            },
            unlocked(){return player[this.layer].barsUnlocked.gte(3)},
            style() {if (this.canAfford()) return {"width":"100px","height":"100px","background-color":"#E9B73F"}
            else return {"width":"100px","height":"100px"}}
        },
        greenBarLevel:{
            cost(x) {return (new Decimal(150).mul(x).mul(new Decimal(1.09).pow(x)))},
            display() {return "Green Bar Lv."+getBuyableAmount("b","greenBarLevel")+"<br> "+
            "+0.015 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult[3] = player[this.layer].progressMult[3].add(0.015);
            },
            unlocked(){return player[this.layer].barsUnlocked.gte(4)},
            style() {if (this.canAfford()) return {"width":"100px","height":"100px","background-color":"#90BE6D"}
            else return {"width":"100px","height":"100px"}}
        },
        blueBarLevel:{
            cost(x) {return (new Decimal(300).mul(x).mul(new Decimal(1.11).pow(x)))},
            display() {return "Blue Bar Lv."+getBuyableAmount("b","blueBarLevel")+"<br> "+
            "+0.01 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult[4] = player[this.layer].progressMult[4].add(0.01);
            },
            unlocked(){return player[this.layer].barsUnlocked.gte(5)},
            style() {if (this.canAfford()) return {"width":"100px","height":"100px","background-color":"#277DA1"}
            else return {"width":"100px","height":"100px"}}
        },
        purpleBarLevel:{
            cost(x) {return (new Decimal(1500).mul(x).mul(new Decimal(1.13).pow(x)))},
            display() {return "Purple Bar Lv."+getBuyableAmount("b","purpleBarLevel")+"<br> "+
            "+0.007 fills/s per level.<br>Cost: "+format(this.cost())},
            canAfford(){return player[this.layer].points.gte(this.cost())},
            buy(){
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1));
                player[this.layer].progressMult[5] = player[this.layer].progressMult[5].add(0.007);
            },
            unlocked(){return player[this.layer].barsUnlocked.gte(6)},
            style() {if (this.canAfford()) return {"width":"100px","height":"100px","background-color":"#6A4C93"}
            else return {"width":"100px","height":"100px"}}
        },
    },
    upgrades:{
        unlockOrange:{
            description: "Unlock Bar 2",
            cost: new Decimal(10),
            onPurchase(){player[this.layer].barsUnlocked = player[this.layer].barsUnlocked.add(1)},
            unlocked(){return player[this.layer].barsUnlocked.lt(2)}
        },
        unlockYellow:{
            description: "Unlock Bar 3",
            cost: new Decimal(50),
            onPurchase(){player[this.layer].barsUnlocked = player[this.layer].barsUnlocked.add(1)},
            unlocked(){return player[this.layer].barsUnlocked.lt(3) && hasUpgrade("b","unlockOrange")}
        },
        unlockGreen:{
            description: "Unlock Bar 4",
            cost: new Decimal(150),
            onPurchase(){player[this.layer].barsUnlocked = player[this.layer].barsUnlocked.add(1)},
            unlocked(){return player[this.layer].barsUnlocked.lt(4) && hasUpgrade("b","unlockYellow")}
        },
        unlockBlue:{
            description: "Unlock Bar 5",
            cost: new Decimal(300),
            onPurchase(){player[this.layer].barsUnlocked = player[this.layer].barsUnlocked.add(1)},
            unlocked(){return player[this.layer].barsUnlocked.lt(5) && hasUpgrade("b","unlockGreen")}
        },
        unlockPurple:{
            description: "Unlock Bar 6",
            cost: new Decimal(1500),
            onPurchase(){player[this.layer].barsUnlocked = player[this.layer].barsUnlocked.add(1)},
            unlocked(){return player[this.layer].barsUnlocked.lt(6) && hasUpgrade("b","unlockBlue")}
        },

    },
    infoboxes:{
        maxBarSpeed:{
            title: "IMPORTANT",
            body() {return "Progress bars in this game can fill and empty rapidly, up to 5 times per second before they become one solid color.<br>"
            +"If this causes you any issues, you should go to the gear tab in the upper left and change 'Max Bar Speed' "
            +"to something more comfortable.<br>This change is completely cosmetic, and text will display over "+
            "all solid bars to tell you the 'actual' fill rate.<br><br>Pushing the limits of both sanity and screen refresh rates, "+
            "there is also an EXTREME max visual speed of 10/s. Not recommended, but you do you."}
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text",
            function(){
                var pointsToAdd = new Decimal(1);
                for (var m = 0; m < player[this.layer].barsUnlocked; m++){
                    pointsToAdd = pointsToAdd.mul(player[this.layer].pointMultipliers[m]);
                }
                return "Adding " + format(pointsToAdd) + (" points every bar fill!");
            }],
        "blank",
        ["row",[["bar","redBar"],"blank",["display-text",function(){return format(player[this.layer].pointMultipliers[0])
            + "x point gain."}],["buyable","redBarLevel"]]],
        ["row",[["upgrade","unlockOrange"],["bar","orangeBar"],"blank",["display-text",function(){if (player[this.layer].barsUnlocked.gte(2)) return format(player[this.layer].pointMultipliers[1])
            + "x point gain."}],["buyable","orangeBarLevel"]]],
        ["row",[["upgrade","unlockYellow"],["bar","yellowBar"],"blank",["display-text",function(){if (player[this.layer].barsUnlocked.gte(3)) return format(player[this.layer].pointMultipliers[2])
            + "x point gain."}],["buyable","yellowBarLevel"]]],
        ["row",[["upgrade","unlockGreen"],["bar","greenBar"],"blank",["display-text",function(){if (player[this.layer].barsUnlocked.gte(4)) return format(player[this.layer].pointMultipliers[3])
            + "x point gain."}],["buyable","greenBarLevel"]]],
        ["row",[["upgrade","unlockBlue"],["bar","blueBar"],"blank",["display-text",function(){if (player[this.layer].barsUnlocked.gte(5)) return format(player[this.layer].pointMultipliers[4])
            + "x point gain."}],["buyable","blueBarLevel"]]],
        ["row",[["upgrade","unlockPurple"],["bar","purpleBar"],"blank",["display-text",function(){if (player[this.layer].barsUnlocked.gte(6)) return format(player[this.layer].pointMultipliers[5])
            + "x point gain."}],["buyable","purpleBarLevel"]]],
        "blank",
        ["infobox","maxBarSpeed"]
    ],
    update(diff){
        if(player[this.layer].barProgress[0] === undefined) return;
        for (var i = 0; i < player[this.layer].barsUnlocked; i++){
            var currentProgress = player[this.layer].barProgress[i]
            player[this.layer].barProgress[i] = currentProgress.add(player[this.layer].progressMult[i].times(diff));
            if (player[this.layer].barProgress[i].gte(1)){
                player[this.layer].barProgress[i] = new Decimal(0);
                var pointsToAdd = new Decimal(1);
                for (var m = 0; m < player[this.layer].barsUnlocked; m++){
                    pointsToAdd = pointsToAdd.mul(player[this.layer].pointMultipliers[m]);
                }
                player.points = player.points.add(pointsToAdd);
                player[this.layer].pointMultipliers[i] = player[this.layer].pointMultipliers[i].add(player[this.layer].multPerFill[i]);
            }
        }
    }
})
