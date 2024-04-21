let modInfo = {
	name: "Bar Game",
	id: "bargameC39",
	author: "Classified39",
	pointsName: "points",
	modFiles: ["bar.js", "tree.js", "achievements.js","metabar.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Oh So Meta.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2: Oh So Meta</h3><br>
		-Meta layer
		-5 more achievements
		-offline progress
		
	<h3>v0.1: 6 bars and a dream</h3><br>
		- 6 Progress Bars<br>
		- Max (visual) speed button and explanation.<br>
		-5 wholy unnecessary achievements.`

let winText = `You maxed out the red buyable! That will be the requirement for the next layer... WHEN THERE IS ONE.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	return new Decimal(0);
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player["m"].points.gte(1e6);
}


// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}