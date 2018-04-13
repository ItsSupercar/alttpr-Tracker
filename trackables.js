
items = {				//a list of everything we're tracking-- includes all inventory items and also some other variables
	bow: { val: 0, max: 3 },
	boomerang: { val: 0, max: 3 },
	hookshot: { val: 0, max: 1 },
	bomb: { val: 1, max: 1 },		//this is the only item checked off by default
	mushroom: { val: 0, max: 1 },
	powder: { val: 0, max: 1 },
	mushroompowder: { val: 0, max: 3 },
	firerod: { val: 0, max: 1 },
	icerod: { val: 0, max: 1 },
	bombos: { val: 0, max: 1 },
	ether: { val: 0, max: 1 },
	quake: { val: 0, max: 1 },
	lamp: { val: 0, max: 1 },
	hammer: { val: 0, max: 1 },
	shovel: { val: 0, max: 1 },
	flute: { val: 0, max: 1 },
	shovelflute: { val: 0, max: 3 },
	net: { val: 0, max: 1 },
	book: { val: 0, max: 1 },
	bottle: { val: 0, max: 4 },
	somaria: { val: 0, max: 1 },
	byrna: { val: 0, max: 1 },
	cape: { val: 0, max: 1 },
	mirror: { val: 0, max: 1 },
	sword: { val: 0, max: 4 },
	shield: { val: 0, max: 3 },
	mail: { val: 0, max: 2 },
	pearl: { val: 0, max: 1 },
	boots: { val: 0, max: 1 },
	glove: { val: 0, max: 2 },
	flippers: { val: 0, max: 1 },
	halfmagic: { val: 0, max: 2 },
	boss0: { val: 0, max: 1 }, //EP
	boss1: { val: 0, max: 1 }, //DP
	boss2: { val: 0, max: 1 }, //ToH
	boss3: { val: 0, max: 1 }, //PoD
	boss4: { val: 0, max: 1 }, //SP
	boss5: { val: 0, max: 1 }, //SW
	boss6: { val: 0, max: 1 }, //TT
	boss7: { val: 0, max: 1 }, //IP
	boss8: { val: 0, max: 1 }, //MM
	boss9: { val: 0, max: 1 }, //TR
	boss10: { val: 0, max: 1 }, //GT
	boss11: { val: 0, max: 1 }, //Agahnim
	prize0: { val: 0, max: 4 }, //EP
	prize1: { val: 0, max: 4 }, //DP
	prize2: { val: 0, max: 4 }, //ToH
	prize3: { val: 0, max: 4 }, //PoD
	prize4: { val: 0, max: 4 }, //SP
	prize5: { val: 0, max: 4 }, //SW
	prize6: { val: 0, max: 4 }, //TT
	prize7: { val: 0, max: 4 }, //IP
	prize8: { val: 0, max: 4 }, //MM
	prize9: { val: 0, max: 4 }, //TR
	medal8: { val: 0, max: 3 }, //MM required medal
	medal9: { val: 0, max: 3 }, //TR required medal
	key1: { val: 0, max: 1 }, //DP
	key2: { val: 0, max: 1 }, //ToH
	key3: { val: 0, max: 6 }, //PoD
	key4: { val: 0, max: 1 }, //SP
	key5: { val: 0, max: 3 }, //SW
	key6: { val: 0, max: 1 }, //TT
	key7: { val: 0, max: 2 }, //IP
	key8: { val: 0, max: 3 }, //MM
	key9: { val: 0, max: 4 }, //TR
	key10: { val: 0, max: 4 }, //GT
	key11: { val: 0, max: 2 }, //Castle Tower
	key12: { val: 0, max: 1 }, //Hyrule Castle
	keyAny: { val: 0, max: 29 }, //Retro Mode -- Generic Key
	keyShopFound: { val: 0, max: 1 }, //Retro mode -- means the player can now get infinite keys
	bigKey0: { val: 0, max: 1 }, //EP
	bigKey1: { val: 0, max: 1 }, //DP
	bigKey2: { val: 0, max: 1 }, //ToH
	bigKey3: { val: 0, max: 1 }, //PoD
	bigKey4: { val: 0, max: 1 }, //SP
	bigKey5: { val: 0, max: 1 }, //SW
	bigKey6: { val: 0, max: 1 }, //TT
	bigKey7: { val: 0, max: 1 }, //IP
	bigKey8: { val: 0, max: 1 }, //MM
	bigKey9: { val: 0, max: 1 }, //TR
	bigKey10: { val: 0, max: 1 }, //GT
	pendant: { val: 0, max: 3 },
	greenPendant: { val: 0, max: 1 },
	crystal: { val: 0, max: 7 },
	redCrystal: { val: 0, max: 2 },
}

chests = {
	0: { world: "LW", amount: 3, xPos: 82.5, yPos: 42.5, opened: false, status: null, name: "Sahasrahla's Hut" },
	1: { world: "LW", amount: 1, xPos: 81.0, yPos: 46.0, opened: false, status: null, name: "Sahasrahla" },
	2: { world: "LW", amount: 1, xPos: 97.0, yPos: 12.0, opened: false, status: null, name: "King Zora" },
	3: { world: "LW", amount: 1, xPos: 80.1, yPos: 32.7, opened: false, status: null, name: "Potion Shop" },
	4: { world: "LW", amount: 1, xPos: 95.5, yPos: 15.5, opened: false, status: null, name: "Zora's Ledge" },
	5: { world: "LW", amount: 2, xPos: 90.1, yPos: 14.0, opened: false, status: null, name: "Waterfall Fairy" },
	6: { world: "LW", amount: 1, xPos: 4.50, yPos: 3.00, opened: false, status: null, name: "Master Sword Pedestal" },
	7: { world: "LW", amount: 1, xPos: 60.8, yPos: 29.7, opened: false, status: null, name: "King's Tomb" },
	8: { world: "LW", amount: 1, xPos: 16.1, yPos: 58.3, opened: false, status: null, name: "Kakariko Tavern" },
	9: { world: "LW", amount: 1, xPos: 10.1, yPos: 53.2, opened: false, status: null, name: "Chicken House" },
	10: { world: "LW", amount: 5, xPos: 3.50, yPos: 42.5, opened: false, status: null, name: "Kakariko Well" },
	11: { world: "LW", amount: 5, xPos: 12.9, yPos: 41.3, opened: false, status: null, name: "Blind's Hideout" },
	12: { world: "LW", amount: 1, xPos: 39.2, yPos: 29.3, opened: false, status: null, name: "Pegasus Rocks" },
	13: { world: "LW", amount: 1, xPos: 9.10, yPos: 46.4, opened: false, status: null, name: "Bottle Merchant" },
	14: { world: "LW", amount: 1, xPos: 32.0, yPos: 56.6, opened: false, status: null, name: "Magic Bat" },
	15: { world: "LW", amount: 1, xPos: 15.7, yPos: 53.2, opened: false, status: null, name: "Sick Kid" },
	16: { world: "LW", amount: 1, xPos: 18.8, yPos: 13.8, opened: false, status: null, name: "Lost Woods Hideout" },
	17: { world: "LW", amount: 1, xPos: 30.1, yPos: 7.40, opened: false, status: null, name: "Lumberjack Tree" },
	18: { world: "LW", amount: 1, xPos: 56.5, yPos: 27.0, opened: false, status: null, name: "Graveyard Ledge" },
	19: { world: "LW", amount: 1, xPos: 12.3, yPos: 8.60, opened: false, status: null, name: "Mushroom" },
	20: { world: "LW", amount: 2, xPos: 46.9, yPos: 93.5, opened: false, status: null, name: "Dam" },
	21: { world: "LW", amount: 1, xPos: 54.6, yPos: 68.0, opened: false, status: null, name: "Link's House" },
	22: { world: "LW", amount: 1, xPos: 20.0, yPos: 82.5, opened: false, status: null, name: "Aginah's Cave" },
	23: { world: "LW", amount: 5, xPos: 65.3, yPos: 93.8, opened: false, status: null, name: "Mini Moldorm Cave" },
	24: { world: "LW", amount: 1, xPos: 89.5, yPos: 76.9, opened: false, status: null, name: "Ice Rod Cave" },
	25: { world: "LW", amount: 1, xPos: 70.6, yPos: 69.7, opened: false, status: null, name: "Hobo" },
	26: { world: "LW", amount: 1, xPos: 22.0, yPos: 92.0, opened: false, status: null, name: "Bombos Tablet" },
	27: { world: "LW", amount: 1, xPos: 26.6, yPos: 82.5, opened: false, status: null, name: "Cave 45" },
	28: { world: "LW", amount: 1, xPos: 17.7, yPos: 77.5, opened: false, status: null, name: "Checkerboard Cave" },
	29: { world: "LW", amount: 1, xPos: 15.6, yPos: 65.4, opened: false, status: null, name: "Library" },
	30: { world: "LW", amount: 1, xPos: 2.90, yPos: 70.0, opened: false, status: null, name: "Maze Race" },
	31: { world: "LW", amount: 1, xPos: 2.90, yPos: 91.5, opened: false, status: null, name: "Desert Ledge" },
	32: { world: "LW", amount: 1, xPos: 72.5, yPos: 83.4, opened: false, status: null, name: "Lake Hylia Island" },
	33: { world: "LW", amount: 1, xPos: 29.0, yPos: 66.5, opened: false, status: null, name: "Flute Spot" },
	34: { world: "LW", amount: 1, xPos: 46.2, yPos: 26.5, opened: false, status: null, name: "Sanctuary" },
	35: { world: "LW", amount: 3, xPos: 52.0, yPos: 29.4, opened: false, status: null, name: "Sewers - Secret Room" },
	36: { world: "LW", amount: 1, xPos: 51.0, yPos: 36.5, opened: false, status: null, name: "Sewers - Dark Cross" },
	37: { world: "LW", amount: 3, xPos: 50.0, yPos: 43.6, opened: false, status: null, name: "Hyrule Castle" },
	38: { world: "LW", amount: 2, xPos: 57.3, yPos: 42.3, opened: false, status: null, name: "Link's Uncle" },
	39: { world: "LW", amount: 1, xPos: 40.7, yPos: 18.6, opened: false, status: null, name: "Old Man" },
	40: { world: "LW", amount: 1, xPos: 48.9, yPos: 14.5, opened: false, status: null, name: "Spectacle Rock Cave" },
	41: { world: "LW", amount: 1, xPos: 42.1, yPos: 2.60, opened: false, status: null, name: "Ether Tablet" },
	42: { world: "LW", amount: 1, xPos: 50.8, yPos: 8.50, opened: false, status: null, name: "Spectacle Rock" },
	43: { world: "LW", amount: 1, xPos: 79.6, yPos: 8.90, opened: false, status: null, name: "Spiral Cave" },
	44: { world: "LW", amount: 1, xPos: 84.7, yPos: 8.90, opened: false, status: null, name: "Mimic Cave" },
	45: { world: "LW", amount: 7, xPos: 86.0, yPos: 18.0, opened: false, status: null, name: "Paradox Cave" },
	46: { world: "LW", amount: 1, xPos: 81.3, yPos: 2.60, opened: false, status: null, name: "Floating Island" },
	47: { world: "DW", amount: 2, xPos: 84.3, yPos: 14.4, opened: false, status: null, name: "Superbunny Cave" },
	48: { world: "DW", amount: 3, xPos: 81.8, yPos: 4.40, opened: false, status: null, name: "Hookshot Cave" },
	49: { world: "DW", amount: 1, xPos: 84.3, yPos: 6.90, opened: false, status: null, name: "Hookshot Cave - Bottom Chest" },
	50: { world: "DW", amount: 1, xPos: 57.5, yPos: 14.6, opened: false, status: null, name: "Spike Cave" },
	51: { world: "DW", amount: 1, xPos: 89.7, yPos: 17.2, opened: false, status: null, name: "Catfish" },
	52: { world: "DW", amount: 1, xPos: 58.1, yPos: 46.0, opened: false, status: null, name: "Pyramid" },
	53: { world: "DW", amount: 2, xPos: 47.0, yPos: 48.6, opened: false, status: null, name: "Pyramid Fairy" },
	54: { world: "DW", amount: 1, xPos: 10.9, yPos: 57.8, opened: false, status: null, name: "Brewery" },
	55: { world: "DW", amount: 1, xPos: 20.6, yPos: 47.7, opened: false, status: null, name: "C-Shaped House" },
	56: { world: "DW", amount: 1, xPos: 5.00, yPos: 46.2, opened: false, status: null, name: "Chest Game" },
	57: { world: "DW", amount: 1, xPos: 31.7, yPos: 60.5, opened: false, status: null, name: "Hammer Pegs" },
	58: { world: "DW", amount: 1, xPos: 34.3, yPos: 15.5, opened: false, status: null, name: "Bumper Cave" },
	59: { world: "LW", amount: 1, xPos: 30.6, yPos: 51.7, opened: false, status: null, name: "Blacksmith" },
	60: { world: "DW", amount: 1, xPos: 30.5, yPos: 52.5, opened: false, status: null, name: "Purple Chest" },
	61: { world: "DW", amount: 5, xPos: 59.9, yPos: 77.8, opened: false, status: null, name: "Hype Cave" },
	62: { world: "DW", amount: 1, xPos: 30.9, yPos: 68.5, opened: false, status: null, name: "Stumpy" },
	63: { world: "DW", amount: 1, xPos: 5.00, yPos: 69.9, opened: false, status: null, name: "Digging Game" },
	64: { world: "DW", amount: 2, xPos: 4.00, yPos: 79.5, opened: false, status: null, name: "Mire Shed" },
};

dungeons = {
	0: { world: "LW", xPos: 92.9, yPos: 40.0, chests0: 3, chests1: 6, chests2: 3, openChests: 0, completed: false, status: null, prize: 0, name: "Eastern Palace" },
	1: { world: "LW", xPos: 7.00, yPos: 78.5, chests0: 2, chests1: 6, chests2: 3, openChests: 0, completed: false, status: null, prize: 0, name: "Desert Palace" },
	2: { world: "LW", xPos: 56.0, yPos: 4.00, chests0: 2, chests1: 6, chests2: 3, openChests: 0, completed: false, status: null, prize: 0, name: "Tower of Hera" },
	3: { world: "DW", xPos: 92.9, yPos: 40.0, chests0: 5, chests1: 14, chests2: 11, openChests: 0, completed: false, status: null, prize: 0, name: "Palace of Darkness" },
	4: { world: "DW", xPos: 45.5, yPos: 91.5, chests0: 6, chests1: 10, chests2: 7, openChests: 0, completed: false, status: null, prize: 0, name: "Swamp Palace" },
	5: { world: "DW", xPos: 5.00, yPos: 5.00, chests0: 2, chests1: 8, chests2: 5, openChests: 0, completed: false, status: null, prize: 0, name: "Skull Woods" },
	6: { world: "DW", xPos: 12.0, yPos: 48.0, chests0: 4, chests1: 8, chests2: 5, openChests: 0, completed: false, status: null, prize: 0, name: "Thieves Town" },
	7: { world: "DW", xPos: 79.0, yPos: 85.0, chests0: 3, chests1: 8, chests2: 5, openChests: 0, completed: false, status: null, prize: 0, name: "Ice Palace" },
	8: { world: "DW", xPos: 9.00, yPos: 83.2, chests0: 2, chests1: 8, chests2: 5, openChests: 0, completed: false, status: null, prize: 0, name: "Misery Mire" },
	9: { world: "DW", xPos: 92.9, yPos: 5.00, chests0: 5, chests1: 12, chests2: 9, openChests: 0, completed: false, status: null, prize: 0, name: "Turtle Rock" },
	10: { world: "DW", xPos: 56.0, yPos: 4.00, chests0: 20, chests1: 27, chests2: 24, openChests: 0, completed: false, status: null, prize: 0, name: "Ganon's Tower" },
	11: { world: "LW", xPos: 50.0, yPos: 51.0, chests0: 0, chests1: 2, chests2: 2, openChests: 0, completed: false, status: null, prize: "AGA", name: "Agahnim's Tower" },
};

keyShops = {
	0: { world: "LW", xPos: 71.1, yPos: 75.0, active: false, name: "Lake Hylia Shop" },
	1: { world: "LW", xPos: 9.40, yPos: 56.3, active: false, name: "Kakariko Shop" },
	2: { world: "LW", xPos: 84.0, yPos: 11.9, active: false, name: "Death Mountain Shop" },
	3: { world: "DW", xPos: 63.3, yPos: 78.0, active: false, name: "Dark Lake Hylia Shop" },
	4: { world: "DW", xPos: 85.0, yPos: 9.20, active: false, name: "Dark Death Mountain Shop" },
	5: { world: "DW", xPos: 18.7, yPos: 50.9, active: false, name: "Village of Outcasts Shop" },
	6: { world: "DW", xPos: 31.7, yPos: 43.4, active: false, name: "Dark World Forest Shop" },
	7: { world: "DW", xPos: 32.1, yPos: 3.40, active: false, name: "Dark World Lumberjack Shop" },
	8: { world: "DW", xPos: 78.9, yPos: 31.3, active: false, name: "Dark World Potion Shop" },
}



map = {
	populate: function () {
		$.each(chests, function (id, chest) {	//places all the chest icons onto the map
			$("#map" + chest.world).append("<div class=chest onclick=toggle.chest(" + id + ") id=chest" + id + " style=left:" + chest.xPos + "%;top:" + chest.yPos + "%;z-index:" + (1000 - id) + ">" + ((chest.amount > 1) ? chest.amount : "") + "</div>");
		});

		$.each(dungeons, function (id, dungeon) {	//places all the dungeon icons onto the map
			$("#map" + dungeon.world).append("<div class=dungeon onclick=toggle.boss(" + id + ") id=dungeon" + id + " style=left:" + dungeon.xPos + "%;top:" + dungeon.yPos + "%;z-index:" + (1100 - id) + "></div>");
			$("#map" + dungeon.world).append("<div class='chest dungeonChest' onclick=toggle.dungeonChest(" + id + ") id=dungeonChest" + id + " style=left:" + dungeon.xPos + "%;top:" + dungeon.yPos + "%;z-index:" + (1200 - id) + ">" + dungeon["chests" + settings.keyMode] + "</div>");
		});

		$('.dungeonChest').mousedown(function (event) {	//adds right-click functionality to dungeon chest counters
			if (event.which == 3) {
				toggle.dungeonChest((this.id.replace(/\D/g, '')), true);
			};
		});

		$("#dungeon10").css({ 'background-image': 'none' }).html("GT");	//replaces prize icons with text for these dungeons
		$("#dungeon11").css({ 'background-image': 'none' }).html("AGA");

		$.each(keyShops, function (id, shop) {		//places all the shops onto the map (only matters in Retro mode)
			$("#map" + shop.world).append("<div class=keyShop onclick=toggle.keyShop(" + id + ") id=keyShop" + id + " style=left:" + shop.xPos + "%;top:" + shop.yPos + "%;z-index:" + (1000 - id) + ">F<div class=keyCirc></div></div>");
		});

		map.placeMiniChests();	 //places the proper amount of pips for each dungeon's chests, depending on mode

		$(".dungeon").hover(function () {	//Writes dungeon names to the caption when hovering
			id = (this.id.replace(/\D/g, ''));
			$("#caption").html(dungeons[id].name + " Boss");
		}, function () {
			$("#caption").html("");
		});


		$(".chest, .keyShop").hover(function () {	//Writes chest names to the caption when hovering

			var states = ["UNAVAILABLE","AVAILABLE","DARK","POSSIBLE","CHECKABLE"];
			id = (this.id.replace(/\D/g, ''));
			if (this.id.indexOf("dungeonChest") >= 0) {
				$("#caption").html(dungeons[id].name + " Chests");
			} else if (this.id.indexOf("keyShop") >= 0) {
				var state = logic.keyShops[id]();
				$("#caption").html(keyShops[id].name+" &nbsp;<span class='captionState"+state+"'>"+states[state]+"</span>");
			} else {
				var state = logic.chests[id]();
				$("#caption").html(chests[id].name+" &nbsp;<span class='captionState"+state+"'>"+states[state]+"</span>");
			}

		}, function () {
			$("#caption").html("");
		});

		$(".icon, .dungeonChest, #timer").on("contextmenu", function () {
			return false;
		});

	},
	placeMiniChests: function () {		//puts the mini chests pips onto each dungeon on the map
		$(".chestPip").remove();	//clears existing chest pips

		$.each(dungeons, function (id, dungeon) {

			count = dungeon["chests" + settings.keyMode]; //checks how many chests the dungeon has in this mode
			for (chest = 1; chest <= count; chest++) {


				$("#map" + dungeon.world).append("<div class=chestPip id=chestPip" + id + "-" + chest + " style=left:" + dungeon.xPos + "%;top:" + dungeon.yPos + "%;z-index:" + (1100 - id) + "></div>"); //creates the pip

				//calculations to figure out the position and angle of each pip
				if (count <= 11) {
					pos = chest;
				} else {
					len = Math.min(11, Math.round(count * (11 / 27)));
					if (chest <= len) {
						pos = chest;
					} else {
						pos = chest + (11 - len);
					}
				}

				if (pos <= 11) {
					angle = (-22 * pos) + 89;
					dist = 21;
				} else {
					angle = (-15.667 * pos) + 262;
					dist = 28;
				}

				//places the pip
				TweenMax.set("#chestPip" + id + "-" + chest, { 'transform-origin': ('4px -' + (dist - 5) + 'px'), y: dist, rotationZ: angle, force3D: true });

			}

		});
	}
};








toggle = {
	chest: function (id) {							//toggles a chest's open status
		chests[id].opened = !chests[id].opened;
		logic.apply();
	},
	boss: function (id) {							//toggles a dungeon's completion and marks its boss icon appropriately
		dungeons[id].completed = !dungeons[id].completed;
		items["boss" + id].val = items["boss" + id].val ? 0 : 1;
		$('#boss' + id)
			.attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); })
			.addClass("state" + (dungeons[id].completed ? 1 : 0));
		$("#bigPrize" + id).toggleClass("complete", dungeons[id].completed);
		logic.apply();
	},
	dungeonChest: function (id, reverse = false) {			//increments or decrements a dungeon's open chest count
		dungeons[id].openChests += reverse ? -1 : 1;
		if (dungeons[id].openChests > dungeons[id]["chests" + settings.keyMode]) { dungeons[id].openChests = 0; }
		if (dungeons[id].openChests < 0) { dungeons[id].openChests = dungeons[id]["chests" + settings.keyMode]; }
		logic.apply();
	},
	keyShop: function (id) {								//toggles whether a shop is marked as having a key
		keyShops[id].active = !keyShops[id].active;
		$("#keyShop" + id).toggleClass("active", keyShops[id].active);
		logic.apply();
	},
	icon: function (icon, reverse = false) {			//toggles icons on the tracker

		if (icon.id.indexOf("bigPrize") >= 0) {			//if icon is a Bigprize, changes the target
			num = icon.id.replace(/\D/g, '');
			icon = $("#prize" + num)[0];
		}

		if (icon.id.indexOf("abbr") >= 0) {			//if icon is a dungeon abbr, changes the target
			num = icon.id.replace(/\D/g, '');
			icon = $("#boss" + num)[0];
		}

		//increments or decrements the icon state
		curVal = items[icon.id].val;
		if (reverse == false) {
			items[icon.id].val = (curVal == items[icon.id].max) ? 0 : (curVal + 1);
		} else {
			items[icon.id].val = (curVal == 0) ? items[icon.id].max : (curVal - 1);
		}

		if (icon.id.indexOf("boss") >= 0) {								//if it's a boss, do the boss toggle stuff
			num = icon.id.replace(/\D/g, '');
			dungeons[num].completed = !dungeons[num].completed;
			$("#bigPrize" + num).toggleClass("complete", dungeons[num].completed);
		}

		if (icon.id.indexOf("prize") >= 0) {							//if it's a prize, toggle the prize
			num = icon.id.replace(/\D/g, '');
			dungeons[num].prize = items[icon.id].val;
			$("#dungeon" + num + ",#bigPrize" + num)
				.attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); })
				.addClass("state" + dungeons[num].prize);
			;
		}

		if (icon.id == "mushroompowder" || icon.id == "shovelflute") {		//this ensures that the separated mushroom/powder and shovel/flute icons always match the combined versions of those icons
			items.powder.val = (items.mushroompowder.val >= 2) ? 1 : 0;
			items.mushroom.val = (items.mushroompowder.val % 2 == 1) ? 1 : 0;
			items.flute.val = (items.shovelflute.val >= 2) ? 1 : 0;
			items.shovel.val = (items.shovelflute.val % 2 == 1) ? 1 : 0;
			$('#mushroom').attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); }).addClass("state" + items.mushroom.val);
			$('#powder').attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); }).addClass("state" + items.powder.val);
			$('#shovel').attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); }).addClass("state" + items.shovel.val);
			$('#flute').attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); }).addClass("state" + items.flute.val);
		}

		if (icon.id == "mushroom" || icon.id == "powder" || icon.id == "flute" || icon.id == "shovel") { //and vice versa, this ensures that the combined mushroom/powder and shovel/flute icons always match the separated versions of those icons
			items.mushroompowder.val = (items.mushroom.val ? 1 : 0) + (items.powder.val ? 2 : 0);
			items.shovelflute.val = (items.shovel.val ? 1 : 0) + (items.flute.val ? 2 : 0);
			$('#mushroompowder').attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); }).addClass("state" + items.mushroompowder.val);
			$('#shovelflute').attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); }).addClass("state" + items.shovelflute.val);
		}

		$("#" + icon.id)																	//removes the previous class from the icon and adds the proper new class
			.attr('class', function (i, c) { return c.replace(/(^|\s)state\S+/g, ''); })
			.addClass("state" + items[icon.id].val)
			;

		logic.apply();
	},
};


