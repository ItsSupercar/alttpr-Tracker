
logic = {
    //these functions return true or false
    darkWorldNW: function () { //check for access to this whole region
        return items.pearl.val && //need this of course
            (items.glove.val >= 2 || //kakariko portal
                (items.glove.val >= 1 && items.hammer.val) || //kakariko portal
                (items.boss11.val && items.hookshot.val && (items.hammer.val || items.glove.val || items.flippers.val)) //agahnim then river crossing
            );
    },
    darkWorldEast: function () { //check for access to this whole region
        return items.pearl.val && //need this of course
            (items.boss11.val || //agahnim gives direct access
                items.hammer.val && items.glove.val || //portal at flute 5
                items.glove.val >= 2 && items.flippers.val //kakariko portal then river crossing
            ); //
    },
    darkWorldSouth: function () { //check for access to this whole region
        return logic.darkWorldNW() || //can drop down from village -- includes hammer + glove option
            (items.boss11.val && items.pearl.val && items.hammer.val); //agahnim + hammer also works
    },
    DMlight: function () { return (items.lamp.val || items.flute.val); }, //used to determine if DM chests require dark
    climbDM: function () { return (items.glove.val || items.flute.val); }, //can get up Death Mountain
    eastDM: function () { return logic.climbDM() && (items.hookshot.val || items.mirror.val && items.hammer.val); }, //can get to EDM
    darkEastDM: function () { return logic.eastDM() && items.pearl.val && items.glove.val >= 2; },  //can get to dark EDM
    cane: function () { return items.somaria.val || items.byrna.val; }, //the canes work against certain bosses
    rod: function () { return items.firerod.val || items.icerod.val; }, //the rods work against certain bosses
    fire: function () { return items.lamp.val || items.firerod.val; }, //can light torches
    //Dungeon entry
    entry0: function () { return true; },
    entry1: function () { return items.book.val || items.glove.val >= 2 && items.flute.val && items.mirror.val },
    entry2: function () { return logic.climbDM() && (items.mirror.val || items.hookshot.val && items.hammer.val) },
    entry3: function () { return logic.darkWorldEast() },
    entry4: function () { return logic.darkWorldSouth() && items.mirror.val && items.flippers.val },
    entry5: function () { return logic.darkWorldNW() },
    entry6: function () { return logic.darkWorldNW() },
    entry7: function () { return items.pearl.val && items.glove.val >= 2 && items.flippers.val && (items.firerod.val || (items.bombos.val && items.sword.val >= 1)) },
    entry8: function () { return items.pearl.val && items.glove.val >= 2 && items.flute.val && (items.boots.val || items.hookshot.val) },
    entry9: function () { return logic.darkEastDM() && items.hammer.val && items.somaria.val },
    entry10: function () { return items.crystal.val >= 7 && logic.darkEastDM() },
    entry11: function () { return items.sword.val >= 2 || items.cape.val },
    //this function returns 0, 1, or 3
    // 0 = unavailable
    // 1 = available
    // 3 = possibly available
    medallion: function (id) { //check for the correct MM/TR medallions; id is the dungeon id (8 = MM, 9 = TR)

        medal = items["medal" + id].val; //identifies what medallion we want; 0 = unknown, 1 = bombos, 2 = ether, 3 = quake

        return items.sword.val >= 1 ? //need a sword
            medal == 0 ?
                items.bombos.val && items.ether.val && items.quake.val ?                 //medallion is unknown
                    1 :                                                                  //has all medallions so check is automatically passed
                    items.bombos.val || items.ether.val || items.quake.val ? 3 : 0 :     //if at least one medallion, maybe ok; otherwise nope
                medal == 1 && items.bombos.val || medal == 2 && items.ether.val || medal == 3 && items.quake.val ? //medallion is known and we need a specific one
                    1 : //has the specific matching medallion
                    0 : //does not have the matching medallion
            0; //no sword, cannot use any medallions

    },
    //this sets the prizes in the item tracker based on completed dungeons
    setPrizes: function () {

        counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, total: 0 }; //tally of each type of prize; 
        // 0 = unknown, 1 = red/blue pend, 2 = green pend, 3 = blue crystal, 4 = red crystal

        for (i = 0; i <= 9; i++) { //checks each dungeon to see if it's completed and if so what its prize is
            if (dungeons[i].completed) {
                counts[dungeons[i].prize]++;
                counts.total++;
            }
        }

        //updates the item object with the counts that were found
        items.pendant.val = Math.min(3, counts[1] + counts[2]); //total pendants of either colour
        items.greenPendant.val = Math.min(1, counts[2]);        //green pendant
        items.crystal.val = Math.min(7, counts[3] + counts[4]); //total crystals of either colour
        items.redCrystal.val = Math.min(2, counts[4]);          //just red crystal

        //a little extra logic that deduces pendants/crystals from the total count if not all prizes are known or marked correctly
        //example: if there's more than 4 dungeons beaten, 1 of them must be a crystal, etc etc
        if (counts.total >= 4) {
            items.pendant.val = Math.max(counts.total - 7, items.pendant.val);
            items.crystal.val = Math.max(counts.total - 3, items.crystal.val);
        }

        if (items.pendant.val >= 3) { //if you have three pendants, 1 must be green
            items.greenPendant.val = 1;
        }

        if (items.crystal.val >= 7) {       //if you have 7 crystals, 2 must be red
            items.redCrystal.val = Math.max(2, items.redCrystal.val);
        } else if (items.crystal.val >= 6) {    //if you have 6 crystals, at least 1 is red
            items.redCrystal.val = Math.max(1, items.redCrystal.val);
        }

    },
    // Values that can be returned for any given chest:
    // 0 = unavailable
    // 1 = available
    // 2 = available through dark room
    // 3 = possibly available
    // 4 = visible/checkable but unattainable
    chests: {
        0: function () { return 1; },                        // Sahasrahla's Hut
        1: function () { return items.greenPendant.val; }, // Sahasrahla
        2: function () {                                     // King Zora
            return items.flippers.val || items.glove.val ? 1 : 0;
        },
        3: function () { return items.mushroom.val; }, // Potion Shop
        4: function () { return items.flippers.val; }, // Zora's Ledge
        5: function () { return items.flippers.val; }, // Waterfall Fairy
        6: function () {                            // Master Sword Pedestal
            return (items.pendant.val == 3) ?
                1 :
                items.book.val ? 4 : 0;
        },
        7: function () {                                                // King's Tomb
            return items.boots.val &&
                (items.glove.val >= 2 ||
                    (logic.darkWorldNW() && items.mirror.val))
                ? 1 : 0;
        },
        8: function () { return 1; }, // Kakariko Tavern
        9: function () { return 1; }, // Chicken House
        10: function () { return 1; }, // Kakariko Well
        11: function () { return 1; }, // Blind's Hideout
        12: function () { return items.boots.val; }, // Pegasus Rocks
        13: function () { return 1; }, // Bottle Merchant
        14: function () {           // Magic Bat
            return items.powder.val &&
                (items.hammer.val || logic.darkWorldNW() &&
                    items.mirror.val);
        },
        15: function () { return items.bottle.val >= 1 ? 1 : 0; }, // Sick Kid
        16: function () { return 1; }, // Lost Woods Hideout
        17: function () { return items.boss11.val && items.boots.val ? 1 : 4; }, // Lumberjack Tree
        18: function () { return logic.darkWorldNW() && items.mirror.val ? 1 : 0; }, // Graveyard Ledge
        19: function () { return 1; }, // Mushroom
        20: function () { return 1; }, // Dam
        21: function () { return 1; }, // Link's House
        22: function () { return 1; }, // Aginah's Cave
        23: function () { return 1; }, // Mini Moldorm Cave
        24: function () { return 1; }, // Ice Rod Cave
        25: function () { return items.flippers.val; }, // Hobo
        26: function () { // Bombos Tablet
            return items.book.val && items.mirror.val && logic.darkWorldSouth() ?
                items.sword.val >= 2 ? 1 : 4 :
                0;
        },
        27: function () { // Cave 45
            return items.mirror.val &&
                (logic.darkWorldNW() || items.boss11.val && items.pearl.val && items.hammer.val) ? 1 : 0;
        },
        28: function () { // Checkerboard Cave
            return items.flute.val && items.glove.val >= 2 && items.mirror.val ? 1 : 0;
        },
        29: function () { return items.boots.val ? 1 : 4; }, // Library
        30: function () { return 1; }, // Maze Race
        31: function () { // Desert Ledge
            return logic.entry1() ? 1 : 4;
        },
        32: function () { // Lake Hylia Island
            return items.flippers.val ?
                items.pearl.val && items.mirror.val && (items.boss11.val || items.glove.val >= 2 || items.glove.val && items.hammer.val) ?
                    1 : 4 :
                4;
        },
        33: function () { return items.shovel.val; }, // Flute Spot
        34: function () { return 1; }, // Sanctuary
        35: function () { // Sewers - Secret Room

            if (settings.keyMode == 2) {
                maxKey = items.keyAny.val;
                minKey = Math.max(0,
                    maxKey -
                    (logic.entry1() ? 1 : 0) -
                    (logic.entry2() ? 1 : 0) -
                    (logic.entry3() ? 6 : 0) -
                    (logic.entry4() ? 1 : 0) -
                    (logic.entry11() ? 2 : 0)
                );
            }

            lampTest = items.lamp.val ? 1 : 2;

            return settings.openMode == 0 || items.glove.val ?
                1 :
                settings.keyMode == 1 ?
                    items.key12.val ? lampTest : 0 :
                    settings.keyMode == 2 && items.keyShopFound.val == 0 ?
                        maxKey >= 1 ?
                            minKey >= 1 ? lampTest : 3 :
                            0 :
                        lampTest
                ;


        },
        36: function () { // Sewers - Dark Cross
            return settings.openMode == 0 || items.lamp.val ? 1 : 2;
        },
        37: function () { return 1; }, // Hyrule Castle
        38: function () { return 1; }, // Link's Uncle
        39: function () { // Old Man
            return logic.climbDM() ?
                items.lamp.val ? 1 : 2 :
                0;
        },
        40: function () { // Spectacle Rock Cave
            return logic.climbDM() ?
                logic.DMlight() ? 1 : 2 :
                0;
        },
        41: function () { // Ether Tablet
            return items.book.val && logic.climbDM() && (items.mirror.val || items.hookshot.val && items.hammer.val) ?
                items.sword.val >= 2 ?
                    logic.DMlight() ? 1 : 2 :
                    4 :
                0;
        },
        42: function () { // Spectacle Rock
            return logic.climbDM() ?
                items.mirror.val ?
                    logic.DMlight() ? 1 : 2 :
                    4 :
                0;
        },
        43: function () { // Spiral Cave
            return logic.eastDM() ?
                logic.DMlight() ? 1 : 2 :
                0;
        },
        44: function () { // Mimic Cave

            return !(settings.keyMode == 1 && items.key9.val < 2) &&
                items.pearl.val &&
                items.hammer.val &&
                items.glove.val >= 2 &&
                items.somaria.val &&
                items.mirror.val ?
                logic.medallion(9) !== 1 ?
                    logic.medallion(9) :
                    items.firerod.val ?
                        logic.DMlight() ? 1 : 2 :
                        3 :
                0;

        },
        45: function () { // Paradox Cave
            return logic.eastDM() ?
                logic.DMlight() ? 1 : 2 :
                0;
        },
        46: function () { // Floating Island
            return logic.eastDM() ?
                items.mirror.val && items.pearl.val && items.glove.val >= 2 ?
                    logic.DMlight() ? 1 : 2 :
                    4 :
                0;
        },
        47: function () { // Superbunny Cave

            return items.pearl.val && items.glove.val >= 2 && logic.eastDM() ?
                logic.DMlight() ? 1 : 2 :
                0;

        },
        48: function () { // Hookshot Cave
            return items.pearl.val && items.glove.val >= 2 && items.hookshot.val ?
                logic.DMlight() ? 1 : 2 :
                0;
        },
        49: function () { // Hookshot Cave - Bottom Chest
            return items.pearl.val && items.glove.val >= 2 && (items.hookshot.val || (items.mirror.val && items.hammer.val && items.boots.val)) ?
                logic.DMlight() ? 1 : 2 :
                0;
        },
        50: function () { // Spike Cave
            return items.pearl.val && items.glove.val && items.hammer.val && (items.byrna.val || items.cape.val) ?
                logic.DMlight() ? 1 : 2 :
                0;
        },
        51: function () { // Catfish"
            return logic.darkWorldEast() && items.glove.val ? 1 : 0;
        },
        52: function () { // Pyramid

            return items.boss11.val || logic.darkWorldEast() ? 1 : 0;

        },
        53: function () { // Pyramid Fairy

            return items.redCrystal.val >= 2 && (items.boss11.val || logic.darkWorldEast()) ? 1 : 0;

        },
        54: function () { // Brewery
            return logic.darkWorldNW() ? 1 : 0;
        },
        55: function () { // C-Shaped House
            return logic.darkWorldNW() ? 1 : 0;
        },
        56: function () { // Chest Game
            return logic.darkWorldNW() ? 1 : 0;
        },
        57: function () { // Hammer Pegs
            return items.pearl.val && items.glove.val >= 2 && items.hammer.val ? 1 : 0;
        },
        58: function () { // Bumper Cave
            return logic.darkWorldNW() ?
                items.glove.val && items.cape.val ? 1 : 4 :
                0;
        },
        59: function () { // BlackSmith
            return items.pearl.val && items.glove.val >= 2 ? 1 : 0;
        },
        60: function () { // Purple Chest
            return items.pearl.val && items.glove.val >= 2 ? 1 : 0;
        },
        61: function () { // Hype Cave
            return logic.darkWorldSouth() ? 1 : 0;
        },
        62: function () { // Stumpy
            return logic.darkWorldSouth() ? 1 : 0;
        },
        63: function () { // Digging Game
            return logic.darkWorldSouth() ? 1 : 0;
        },
        64: function () { // Mire Shed
            return items.pearl.val && items.flute.val && items.glove.val >= 2 ? 1 : 0;
        }
    },

    //dungeon logic functions return an object containing the following
    //boss =
    // 0 = unavailable
    // 1 = available
    // 2 = available through dark room
    // 3 = visible but not attainable
    //max = the maximum items possibly available (including by certain sequence breaks)
    //min = the minimum items possibly available (accounting for worst luck, bad key use if key-sanity, no dark rooms or sequence breaks)
    dungeons: {


        0: function () { // Eastern Palace
            var bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
                lamp = items.lamp.val,
                bigKey = items.bigKey0.val;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = bow && bigKey ?          // need these to reach
                    lamp ? 1 : 2 :              // boss accessible; light determines status
                    0;

                min = 3 +                             // base access
                    (lamp ? 1 : 0) +                  // BK chest
                    (bigKey ? 1 : 0) +                // big chest
                    (lamp && bigKey && bow ? 1 : 0)   // boss
                    ;

                max = 4 +                             // base access (includes BK chest regardless of lamp)
                    (bigKey ? 1 : 0) +                // big chest
                    (bigKey && bow ? 1 : 0)           // boss
                    ;

            } else {             // REGULAR AND RETRO LOGIC

                boss = bow ?             // need this to reach
                    lamp ? 1 : 2 :       // boss accessible; light determines status
                    0;

                min = lamp ?
                    2 +                // lamp guarantees two items
                    (bow ? 1 : 0) :    // bow & lamp guarantees third item too
                    1;              // if no lamp, it's possible only 1 chest before dark rooms has something

                max = 3;      // always possible for the first three chests to have items
            }

            return { boss: boss, max: max, min: min }
        },
        1: function () { //Desert Palace

            var entry = logic.entry1(),
                glove = items.glove.val,
                reachLanmo = entry && logic.fire() && glove,
                bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
                fightLanmo = reachLanmo && (items.hammer.val || items.sword.val >= 1 || bow || logic.cane() || logic.rod()),
                boots = items.boots.val,
                key = items.key1.val,
                bigKey = items.bigKey1.val;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightLanmo && bigKey ?
                    key ? 1 : 3 :   // if no key, player might steal pot key for chests and lock themselves out of boss
                    0;

                min = entry ?
                    1 +                                     // base access
                    (boots ? 1 : 0) +                       // torch
                    (key ? 2 : 0) +                        // compass/BK chests
                    (bigKey ? 1 : 0) +                    // big chest
                    (fightLanmo && bigKey ? 1 : 0) :      // boss
                    0;

                max = entry ?
                    1 +                                   // base access
                    (boots ? 1 : 0) +                    // torch
                    (bigKey ? 1 : 0) +                   // big chest
                    (glove ?
                        key && fightLanmo && bigKey ? 3 : 2 :   // if fully equipped, can get 3; otherwise, stealing key gives 2
                        key ? 2 : 0) :              // if no glove, need key to get 2 chests (no boss)
                    0;

            } else if (settings.keyMode == 2) {
                if (items.keyShopFound.val) {     // RETRO LOGIC - INFINITE KEYS

                    boss = fightLanmo ?     // have inventory to fight the boss
                        boots ? 1 : 3 :     // big key might be on torch, so if missing boots, boss access unknown
                        0;

                    min = entry ?
                        boots ?
                            2 +                    // boots guarantee accessing everything but boss
                            (fightLanmo ? 1 : 0) :  // if boss beatable too, can definitely get all
                            1 : // if BK on torch and map/compass in small chests, can only get 1 item
                        0;

                    max = entry ? 3 : 0;    // map chest, compass chest, and BK chest might have items

                } else {     // RETRO LOGIC - LIMITED KEYS

                    maxKey = items.keyAny.val - (settings.openMode == 0 ? 1 : 0); // if standard, you must have used a key at Hyrule Castle
                    minKey = Math.max(0,    // subtracts the other places you might have spent your keys, if they are accessible
                        items.keyAny.val -
                        1 -                        //Hyrule Castle
                        (logic.entry2() ? 1 : 0) - //Tower of Hera
                        (logic.entry3() ? 6 : 0) - //Palace of Darkness
                        (logic.entry4() ? 1 : 0) - //Swamp Palace
                        (logic.entry11() ? 2 : 0)  //Agahnim
                    );

                    boss = fightLanmo ?
                        minKey >= 1 && boots ? 1 : 3 : // if missing boots or if key uncertain, boss state unknown
                        0;

                    min = entry && minKey >= 1 ?
                        boots ?
                            2 +                    // boots guarantee accessing everything but boss
                            (fightLanmo ? 1 : 0) :  // if boss beatable too, can definitely get all
                            1 : // if BK on torch and map/compass in small chests, can only get 1 item
                        0;

                    max = entry ?
                        1 + //map chest
                        (maxKey >= 1 || glove ?
                            2 :       // compass chest and BK chest accessible
                            boots ? 1 : 0) :  // with no glove, best case is that torch has item 
                        0;

                }
            } else {     // REGULAR LOGIC

                boss = fightLanmo ?
                    boots ? 1 : 3 : // if no boots, boss state unknown
                    0;

                min = entry ?
                    fightLanmo && boots ?
                        2 :              // can get everything
                        boots ? 1 : 0 :  // if key or big key on torch, might not get any items
                    0;

                max = entry ? 2 : 0;  //2 of first three chests might have items
            }

            return { boss: boss, max: max, min: min }
        },
        2: function () { //Tower of Hera

            var entry = logic.entry2(),
                fightMold = entry && (items.sword.val >= 1 || items.hammer.val),
                fire = logic.fire(),
                light = logic.DMlight(),
                key = items.key2.val,
                bigKey = items.bigKey2.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC
                boss = fightMold && bigKey ?    // requirements for boss
                    light ? 1 : 2 :             // checks if player had to use dark room to climb Death Mountain
                    0;

                max = entry ?
                    2 +                                    //base access
                    (key && fire ? 1 : 0) +                //basement
                    (bigKey ? 2 : 0) +                     //upstairs
                    (bigKey && fightMold ? 1 : 0) :        //Boss
                    0;

                min = light ? max : 0;      //sets min to 0 if had to go through dark

            } else if (settings.keyMode == 2) {
                if (items.keyShopFound.val) {    // RETRO LOGIC - INFINITE KEYS

                    boss = fightMold ?
                        fire ?
                            light ? 1 : 2 :     // checks if player had to use dark room to climb Death Mountain
                            3 :                 // big key might be in basement, locking out boss
                        0;

                    min = entry && light && fire ?
                        2 +                     // can open every chest and get at least 2 items
                        (fightMold ? 1 : 0) :   // can also get 3rd item, if boss has it
                        0;                      // if basement required, might get no items

                    max = entry ? 3 : 0;        // 3 items and big key could be in first 4 chests opened

                } else {    // RETRO LOGIC - LIMITED KEYS

                    maxKey = items.keyAny.val - (settings.openMode == 0 ? 1 : 0); // if standard, you must have used a key at Hyrule Castle
                    minKey = Math.max(0,    // subtracts the other places you might have spent your keys, if they are accessible
                        items.keyAny.val -
                        1 -                        // Hyrule Castle
                        (logic.entry1() ? 1 : 0) - // Desert Palace
                        (logic.entry3() ? 6 : 0) - // Palace of Darkness
                        (logic.entry4() ? 1 : 0) - // Swamp Palace
                        (logic.entry11() ? 2 : 0)  // Agahnim
                    );

                    boss = fightMold && maxKey >= 1 ?
                        fire && minKey >= 1 ?
                            light ? 1 : 2 :     // checks if player had to use dark room to climb Death Mountain
                            3 :                 // big key might be in basement, locking out boss
                        0;

                    min = entry && light && fire && minKey >= 1 ?
                        2 +                    // can open every chest and get at least 2 items
                        (fightMold ? 1 : 0) :  // can also get 3rd item, if boss has it
                        0;                     // if basement required, might get no items

                    max = entry ? 3 : 0;        // 3 items and big key could be in first 4 chests opened

                }
            } else {    // REGULAR LOGIC

                boss = fightMold ?
                    fire ?
                        light ? 1 : 2 :     // checks if player had to use dark room to climb Death Mountain
                        3 :                 // big key might be in basement, locking out boss
                    0;

                min = entry && light && fire ?
                    1 +                    // can open every chest and get at least 1 item
                    (fightMold ? 1 : 0) :  // can also get 2nd item, if boss has it
                    0;                     // if basement required, might get no items

                max = entry ? 2 : 0;       // 2 items and big key could be in first 3 chests opened

            }

            return { boss: boss, max: max, min: min }
        },
        3: function () { //Palace of Darkness

            var entry = logic.entry3(),
                lamp = items.lamp.val,
                hammer = items.hammer.val,
                bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
                hamBow = hammer && bow,
                key = items.key3.val,
                bigKey = items.bigKey3.val,
                fightHelm = entry && hamBow
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = entry && hamBow && bigKey && key >= 1 ? // need all this for boss
                    key == 6 ?
                        lamp ? 1 : 2 :   // checks if player has to go through dark
                        3 :              // if less than 6 keys, might spend them all elsewhere
                    0;

                min = entry ?
                    1 +                                                                       // first chest
                    (key >= 1 || key == 0 && hamBow ? 2 : 0) +                                // next 2 chests (bridge and stalfos head room) -- can't waste a key on the front door if you don't have one ;)
                    (key >= 2 ? 1 : 0) +                                                      // next chest (BK chest)
                    (key >= 4 ? 1 : 0) +                                                      // next chest (turtle room -- dark basement not guaranteed)
                    (key >= 5 ? 1 : 0) +                                                      // next chest (harmless hellway)
                    (bow ? 2 : 0) +                                                           // mimic chests
                    ((key == 2 || key == 4 || key == 5) && bow && hammer ? -1 : 0) +          // if have hammer, might waste key going toward boss at these key counts. don't ask why 3 is left out, it just is
                    (key >= 3 && lamp && !hamBow ? 3 : 0) +                 // if you have light and no hammer+bow, you're forced to go toward the dark rooms, which have the most chests
                    (key >= 4 && hamBow && lamp ? 2 : 0) +              // I dont know what these two mean 
                    (key == 4 || key == 6 && hamBow && lamp ? 1 : 0) +  // but they make the numbers right
                    (key >= 5 && lamp ? 1 : 0) +                                              // now you can get 2 from the dark maze instead of 1 from somewhere else, I think is what this means
                    (key >= 5 && lamp && bigKey ? 1 : 0) +                                    // big chest
                    (key >= 2 && hamBow && lamp && bigKey ? 1 : 0) :       // now any door you open will get you at least one item
                    0;

                max = entry ?
                    1 +                                                 // first chest
                    (bow ? 2 : 0) +                                      // mimic chests
                    (key >= 1 || key == 0 && hamBow ? 2 : 0) +   // next 2 chests (bridge and stalfos head room)
                    (key >= 2 || key == 1 && hamBow ? 3 : 0) +   // next 3 chests (turtle room and dark room)
                    (key >= 3 || key == 2 && hamBow ? 2 : 0) +   // next 2 chests (dark maze)
                    (bigKey && (key >= 3 || key == 2 && hamBow) ? 1 : 0) +  // big chest
                    (key >= 4 || key == 3 && hamBow ? 1 : 0) +   // additional chest (harmless h or BK chest)
                    (key >= 5 || key == 4 && hamBow ? 1 : 0) +   // additional chest (harmless h or BK chest)
                    (key >= 5 && bigKey && hamBow ? 1 : 0) :    // boss
                    0;

            } else if (settings.keyMode == 2) {
                if (items.keyShopFound.val) {    // RETRO LOGIC - INFINITE KEYS

                    boss = fightHelm ?  // need for boss
                        lamp ? 1 : 2 : // checks if player has to go through dark
                        0;

                    min = entry ?
                        3 +                         // first 3 chests
                        (bow ? 2 : 0) +             // mimic chests
                        (bow && lamp ? 6 : 0) +     // dark rooms
                        (bow && lamp && hammer ? 1 : 0) :  // boss
                        0;

                    max = entry ?
                        10 +            // can just about clean the place out just by getting inside
                        (bow ? 1 : 0) : // but you'll need the bow for at least one thing
                        0;

                } else {    // RETRO LOGIC - LIMITED KEYS

                    maxKey = items.keyAny.val
                        - (settings.openMode == 0 ? 1 : 0) // if standard, you must have used a key at Hyrule Castle
                        - 2; // if less than 5 shops accessible, must have come via Agahnim

                    minKey = Math.max(0,    // subtracts the other places you might have spent your keys, if they are accessible
                        items.keyAny.val
                        - 1                         // Hyrule Castle
                        - (logic.entry1() ? 1 : 0)  // Desert Palace
                        - (logic.entry2() ? 1 : 0)  // Tower of Hera
                        - (logic.entry4() ? 1 : 0)  // Swamp Palace
                        - 2                          // Agahnim
                    );

                    boss = entry && hamBow && maxKey >= 1 ? // need to have at least 1 key
                        minKey >= 6 ?
                            lamp ? 1 : 2 : // checks if player has to go through dark
                            3 :            // if less than 6 guaranteed keys, boss status unknown
                        0;

                    min = entry ?
                        (minKey >= 2 ? 1 : 0) +
                        (minKey >= 4 ? 1 : 0) +
                        (minKey >= 5 ? 1 : 0) +
                        (minKey == 0 && hamBow ? 2 : 0) +
                        (bow ? 1 : 0) +
                        ((minKey == 1 || minKey == 3 || minKey == 4 || minKey == 6) && bow ? 1 : 0) +
                        (minKey >= 3 && lamp ? 1 : 0) +
                        (minKey >= 4 && lamp ? 2 : 0) +
                        (minKey >= 5 && lamp ? 1 : 0) +
                        (minKey >= 6 && lamp ? 1 : 0) +
                        ((minKey == 2 || minKey == 5) && bow && !hammer ? 1 : 0) +
                        (minKey == 2 && hamBow && lamp ? 1 : 0) +
                        (minKey == 3 && lamp && !hamBow ? 2 : 0) +
                        (minKey == 3 && lamp && !hammer && !bow ? 1 : 0) +
                        (minKey == 5 && lamp && !hamBow ? 1 : 0) +
                        (minKey == 6 && hamBow && lamp ? 1 : 0) :
                        0;

                    max = entry ?
                        1 +
                        (maxKey >= 1 || maxKey == 0 && hamBow ? 2 : 0) +
                        (maxKey >= 2 || maxKey == 1 && hamBow ? 3 : 0) +
                        (maxKey >= 3 || maxKey == 2 && hamBow ? 2 : 0) +
                        (maxKey >= 4 || maxKey == 3 && hamBow ? 1 : 0) +
                        (maxKey >= 5 ? 1 : 0) +
                        (bow ? 1 : 0) +
                        (maxKey <= 4 && bow ? 1 : 0) :
                        0;

                }

            } else {    // REGULAR LOGIC

                boss = fightHelm ?  // need for boss
                    lamp ? 1 : 2 : // checks if player has to go through dark
                    0;

                min = entry && bow && lamp ?   // if fully equipped, can do whole dungeon except boss
                    hammer ? 5 : 4 :           // if hammer, can do boss too
                    0;

                max = entry ? 5 : 0;        // can possibly get this many just by entering

            }

            return { boss: boss, max: max, min: min }
        },
        4: function () { //Swamp Palace

            var entry = logic.entry4(),
                hammer = items.hammer.val,
                hookshot = items.hookshot.val,
                fightArrg = entry && hookshot && hammer,
                key = items.key4.val,
                bigKey = items.bigKey4.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightArrg && key ? 1 : 0;              // all you need

                min = entry ?
                    1 +                                       // entrance
                    (key ? 1 : 0) +                           // ledge Chest
                    (key && hammer ? 3 : 0) +                 // main Dungeon
                    (key && hammer && bigKey ? 1 : 0) +       // big Chest 
                    (key && hammer && hookshot ? 4 : 0) :     // back of dungeon
                    0;

                max = min;                                    // accessible items are the same no matter what

            } else if (settings.keyMode == 2) {
                if (items.keyShopFound.val) {    // RETRO LOGIC - INFINITE KEYS

                    boss = fightArrg ? 1 : 0;

                    min = entry && hammer ?
                        3 +                     // main dungeon access guarantees 3
                        (hookshot ? 4 : 0) :    // can clear full dungeon
                        0;

                    max = entry ?
                        2 +                                // first 2 chests
                        (hammer ? 3 : 0) +                 // main dungeon
                        (hammer && hookshot ? 2 : 0) :     // complete dungeon
                        0;

                } else {    // RETRO LOGIC - LIMITED KEYS

                    maxKey = items.keyAny.val
                        - (settings.openMode == 0 ? 1 : 0) // if standard, you must have used a key at Hyrule Castle
                        - 2; // if less than 5 shops accessible, must have come via Agahnim

                    minKey = Math.max(0,    // subtracts the other places you might have spent your keys, if they are accessible
                        items.keyAny.val
                        - 1                         // Hyrule Castle
                        - (logic.entry1() ? 1 : 0)  // Desert Palace
                        - (logic.entry2() ? 1 : 0)  // Tower of Hera
                        - (logic.entry3() ? 6 : 0)  // Palace of Darkness
                        - 2                         // Agahnim
                    );

                    boss = fightArrg && maxKey >= 1 ?
                        minKey >= 1 ? 1 : 3 :     // if 1 key not guaranteed, boss state unknown
                        0;

                    min = entry && minKey >= 1 ?
                        (hammer ? 3 : 0) +               // main dungeon access guarantees 3
                        (hammer && hookshot ? 4 : 0) :   // can clear full dungeon
                        0;

                    max = entry ?
                        1 +                                             // first chest
                        (maxKey >= 1 ? 1 : 0) +                         // map chest
                        (maxKey >= 1 && hammer ? 3 : 0) +               // main dungeon
                        (maxKey >= 1 && hammer && hookshot ? 2 : 0) :   // can clear full dungeon
                        0;

                }
            } else {    // REGULAR LOGIC

                boss = fightArrg ? 1 : 0;

                min = entry ?
                    (hammer ? 2 : 0) +              // main dungeon access guarantees 2
                    (hammer && hookshot ? 4 : 0) :  // can clear full dungeon
                    0;

                max = entry ?
                    1 +                             // map chest
                    (hammer ? 3 : 0) +              // 3 more possible with main dungeon access
                    (hammer && hookshot ? 2 : 0) :  // can clear full dungeon
                    0;

            }

            return { boss: boss, max: max, min: min }
        },
        5: function () { // Skull Woods

            var entry = logic.entry5(),
                firerod = items.firerod.val,
                sword = items.sword.val >= 1,
                fightMoth = entry && firerod && sword,
                key = items.key5.val,
                bigKey = items.bigKey5.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightMoth ? 1 : 0;      //boss reqs

                min = entry ?
                    5 +                         // base access
                    (bigKey ? 1 : 0) +          // big chest
                    (firerod ? 1 : 0) +           // phase 3 chest
                    (fightMoth ? 1 : 0) :            //Boss
                    0;

                max = min;                  //no variation in availability

            } else if (settings.keyMode == 2) {    // RETRO LOGIC

                boss = fightMoth ? 1 : 0;      //boss reqs

                min = entry ?
                    3 +                             // guaranteed 3 in 1st/2nd phase
                    (firerod ? 1 : 0) +             // guaranteed a 4th
                    (firerod && sword ? 1 : 0) :    // can complete full dungeon
                    0;

                max = entry ?
                    4 +                             // max 4 in 1st/2nd phases
                    (firerod ? 1 : 0) :             // can get 5th in phase 3
                    0;

            } else {    // REGULAR LOGIC

                boss = fightMoth ? 1 : 0;       //boss reqs

                min = entry && firerod ?
                    1 +                         // both might be in phase 3
                    (sword ? 1 : 0) :           // last might be on boss
                    0;

                max = entry ? 2 : 0;            // chance of finding both in 1st/2nd phases

            }

            return { boss: boss, max: max, min: min }
        },
        6: function () { // Thieves Town

            var entry = logic.entry6(),
                hammer = items.hammer.val,
                fightBlind = entry && (items.sword.val >= 1 || hammer || logic.cane()),
                key = items.key6.val,
                bigKey = items.bigKey6.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightBlind && bigKey ? 1 : 0;

                min = entry ?
                    4 +                                     // base access
                    (bigKey ? 2 : 0) +                      // upstairs and jail chests
                    (fightBlind && bigKey ? 1 : 0) +        // boss
                    (hammer && key && bigKey ? 1 : 0) :     // big chest
                    0;

                max = min;

            } else if (settings.keyMode == 2) {    // RETRO LOGIC

                boss = fightBlind ? 1 : 0;      //boss reqs

                min = entry ?
                    3 +                     // guaranteed 3 from access
                    (hammer ? 1 : 0) +      // big chest
                    (fightBlind ? 1 : 0) :  // boss
                    0;

                max = entry ? 5 : 0;        // possible to get 5 from first 6 chests

            } else {    // REGULAR LOGIC

                boss = fightBlind ? 1 : 0;      //boss reqs

                min = entry ?
                    2 +                         // guaranteed 2 from access
                    (hammer ? 1 : 0) +          // big chest
                    (fightBlind ? 1 : 0) :      // boss
                    0;

                max = entry ? 4 : 0;    // possible to get 4 from first 6 chests

            }

            return { boss: boss, max: max, min: min }
        },
        7: function () { //Ice Palace

            var entry = logic.entry7(),
                hookshot = items.hookshot.val,
                hammer = items.hammer.val,
                somaria = items.somaria.val,
                spikeWalk = items.byrna.val || items.cape.val || hookshot,
                fightKhold = entry && hammer,
                key = items.key7.val,
                bigKey = items.bigKey7.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightKhold ?
                    bigKey && key >= 1 && ((spikeWalk && somaria) || (spikeWalk && key == 2) || (somaria && key == 2)) ? 1 : 3 : //boss reqs; need 2 out of 3-- 2nd key, somaria, and/or spikeWalk to get a free key with
                    0;

                min = entry ?
                    3 +                                                                               // compass chest, freezor chest, ice T chest
                    (bigKey ? 1 : 0) +                                                                   // big chest    
                    ((key == 0 && hookshot) || (key >= 1 && spikeWalk) ? 1 : 0) +                     // spike chest -- specifically need hookshot if 0 keys, otherwise any spike safety will do
                    (hammer && ((key == 0 && hookshot) || (key >= 1 && spikeWalk)) ? 2 : 0) +       // map chest, BK chest -- specifically need hookshot if 0 keys, otherwise any spike safety will do
                    (key >= 1 && hammer && ((spikeWalk && somaria) || (spikeWalk && key == 2) || (somaria && key == 2)) ? 1 : 0) : //boss: need 2 out of 3-- 2nd key, somaria, and/or spikeWalk to get a free key with
                    0;

                max = entry ?
                    4 +                             // base access + spike chest (can use free key for it)
                    (bigKey ? 1 : 0) +              // big chest
                    (hammer ? 3 : 0) :              // map chest, BK chest, boss
                    0;

            } else if (settings.keyMode == 2) {    // RETRO LOGIC

                boss = fightKhold ?                   //boss reqs
                    spikeWalk ? 1 : 3 :             //big key might be past spikes
                    0;

                min = entry ?
                    1 +                                                 // guaranteed 1 item from first 4 chests
                    (hammer ? 1 : 0) +                                  // 3 items might be behind hammer
                    (hookshot || spikeWalk ? 1 : 0) +                   // 2 items might be past spike/hammer area
                    (hammer && (hookshot || spikeWalk) ? 2 : 0) :       // can get everything
                    0;

                max = entry ?
                    hammer ? 5 : 4 :                                    // if hammer, can get all; otherwise best case is 4
                    0;

            } else {    // REGULAR LOGIC

                boss = fightKhold ?
                    hookshot ? 1 : 3 :            // big key might be past spikes
                    0;

                min = entry ?
                    (hammer && hookshot ? 2 : 0) +      // hammer and hookshot guarantee all chests
                    (hammer && spikeWalk ? 1 : 0) :     // hammer and other form of spikeWalk guarantee one
                    0;

                max = entry ? 3 : 0;                // first three chests could have items

            }

            return { boss: boss, max: max, min: min }
        },
        8: function () { //Misery Mire

            var entry = logic.entry8(),
                lamp = items.lamp.val,
                somaria = items.somaria.val,
                firerod = items.firerod.val,
                fire = firerod || lamp,
                spikeWalk = items.byrna.val || items.cape.val,
                key = items.key8.val,
                bigKey = items.bigKey8.val,
                fightVit = entry && somaria && (items.sword.val >= 1 || items.bow.val >= 2),
                medallion = logic.medallion(8)
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightVit && bigKey ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                max = entry ?
                    4 +			                    //Bridge Chest, Spike Chest, Map Chest, Main Room
                    (fire ? 2 : 0) +               //Compass Chest, Big Key Chest
                    (bigKey ? 1 : 0) +	            //Big Chest
                    (fightVit && bigKey ? 1 : 0) :     //Boss
                    0;

                min = entry ?
                    3 +			                            //Bridge Chest, Map Chest, Main Room
                    (spikeWalk ? 1 : 0) +                   //Spike Chest
                    (fire ? 2 : 0) +                        //Compass Chest, Big Key Chest
                    (bigKey ? 1 : 0) +                  	//Big Chest
                    (fightVit && bigKey && lamp ? 1 : 0) :    //Boss
                    0;

            } else if (settings.keyMode == 2) {    // RETRO LOGIC

                boss = fightVit ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                min = entry && medallion == 1 ?
                    1 +
                    (spikeWalk ? 1 : 0) +
                    (fire ? 2 : 0) +
                    (lamp && somaria ? 1 : 0) :
                    0;

                max = entry && medallion !== 0 ?
                    fire || somaria ? 5 : 4 :
                    0;

            } else {    // REGULAR LOGIC

                boss = fightVit ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                min = entry && medallion == 1 ?
                    fightVit && lamp ?
                        2 :
                        firerod ? 1 : 0 :
                    0;

                max = entry && medallion !== 0 ? 2 : 0;

            }

            return { boss: boss, max: max, min: min }
        },
        9: function () { //Turtle Rock
            var entry = logic.entry9(),
                medallion = logic.medallion(9),
                firerod = items.firerod.val,
                icerod = items.icerod.val,
                safety = items.byrna.val || items.shield.val >= 3 || items.cape.val,
                light = logic.DMlight(),
                lamp = items.lamp.val,
                fightTri = entry && firerod && items.icerod.val,
                key = items.key9.val,
                bigKey = items.bigKey9.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = fightTri && bigKey && key >= 3 ?
                    medallion == 1 ?
                        key == 4 ?
                            light ? 1 : 2 :
                            3 :
                        medallion :
                    0;

                min = entry && light && 1 == medallion ?
                    1 +                             // compass Chest
                    (firerod ? 2 : 0) +          	//Spike Roller Chests
                    (key >= 1 ? 1 : 0) +          // chomp room
                    (key >= 2 ? 1 : 0) +         // BK chest
                    (key >= 2 && bigKey ? 2 : 0) +  //big chest and crystaroller chest
                    (key == 3 && bigKey ? -1 : 0) +  // must leave 1 behind-- either BK chest or boss
                    (key >= 3 && bigKey && lamp && safety ? 4 : 0) + // laser bridge
                    (key >= 3 && firerod && bigKey && lamp && icerod ? 1 : 0) : // boss
                    0;

                max = entry && medallion !== 0 ?
                    1 +                             // compass Chest
                    (firerod ? 2 : 0) +                               // compass Chest
                    (key >= 1 ? 1 : 0) +            // chomp room
                    (key >= 2 ? 1 : 0) +            // BK chest
                    (key >= 2 && bigKey ? 5 : 0) +  // crystaroller chest and laser bridge
                    (key >= 3 && bigKey ? 1 : 0) +  // big chest
                    (key == 4 && firerod && bigKey && icerod ? 1 : 0) : //boss
                    0;

            } else if (settings.keyMode == 2) {    // RETRO LOGIC

                boss = fightTri ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                min = entry && light && medallion == 1 ?
                    2 +
                    (firerod ? 2 : 0) +
                    (firerod && safety ? 4 : 0) +
                    (firerod && safety && icerod ? 1 : 0) :
                    0;

                max = entry && medallion !== 0 ?
                    8 +
                    (firerod ? 1 : 0) :
                    0;

            } else {    // REGULAR LOGIC

                boss = fightTri ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                max = entry && medallion !== 0 ? 5 : 0;

                min = entry && light && firerod && medallion == 1 ?
                    1 +
                    (safety ? 3 : 0) +
                    (safety && icerod ? 1 : 0) :
                    0;
            }

            return { boss: boss, max: max, min: min }
        },
        10: function () { //Ganon's Tower

            var entry = logic.entry10(),
                bigKey = items.bigKey10.val,
                canClimb = items.bow.val >= 2 && logic.fire() && (bigKey || settings.keyMode !== 1),
                light = items.lamp.val,
                somaria = items.somaria.val,
                firerod = items.firerod.val,
                fireCane = somaria && firerod,
                hammer = items.hammer.val,
                hookshot = items.hookshot.val,
                hamHook = hammer && hookshot,
                boots = items.boots.val,
                hamBoots = hammer && boots,
                key = items.key10.val
                ;

            if (settings.keyMode == 1) {    // KEY-SANITY LOGIC

                boss = entry && canClimb && hookshot && bigKey && key >= 1 ?
                    key == 4 ?
                        logic.DMlight() ? 1 : 2 :
                        3 :
                    0;

                max = entry ?
                    2 +                     //hope room
                    (boots ? 1 : 0) +       //torch
                    (hamHook ? 4 : 0) +     //dark mag room
                    (somaria ? 1 : 0) +     //tile room
                    (canClimb ? 3 : 0) +    //helmasaur chests & anti-fairy chest
                    (fireCane || hamHook ? 8 : 0) + //Bob's chest, BK room chest, either compass room or rando room
                    (bigKey && (fireCane || hamHook) ? 1 : 0) + //big chest
                    (hamHook || hamBoots ? 1 : 0) + //map chest
                    (key >= 1 && hamHook ? 1 : 0) + //firesnake room
                    //chests from either compass or rando room  
                    (key == 0 && canClimb && fireCane && hamHook ? 3 : 0) +
                    (key >= 1 && fireCane && hamHook ? 3 : 0) +
                    (key >= 2 && fireCane && hamHook ? 1 : 0) +
                    (key == 2 && canClimb && !fireCane && hamHook ? 1 : 0) +
                    //moldorm chest (if not better options elsewhere)
                    (key == 0 && canClimb && !fireCane && !hammer && hookshot ? 1 : 0) +
                    (key == 1 && canClimb && !hammer && hookshot ? 1 : 0) +
                    (key == 2 && canClimb && !hammer && hookshot ? 1 : 0) +
                    (key >= 3 && canClimb && hookshot ? 1 : 0) :
                    0;

                min = entry && logic.DMlight() ?
                    2 +                     //hope room
                    (boots ? 1 : 0) +       //torch
                    (hamHook ? 4 : 0) +     //dark mag room
                    (somaria ? 1 : 0) +     //tile room
                    (canClimb ? 2 : 0) +    //helmasaur chests
                    (key >= 1 && canClimb ? 1 : 0) +            //anti-fairy chest
                    (key >= 2 && canClimb && hookshot ? 1 : 0) +       //Moldorm chest
                    //firesnake or map chest or randomizer room, depending on key use
                    (key >= 1 && hammer && hookshot ? 1 : 0) +
                    (key >= 2 && hammer && hookshot ? 1 : 0) +
                    (key >= 3 && hammer && hookshot ? 3 : 0) +
                    // Bob's chest, BK room chests
                    (key >= 3 && (hamHook || fireCane) ? 4 : 0) +
                    (key == 2 && ((!canClimb && fireCane) || (fireCane && !hammer) || (fireCane && !boots && !hookshot)) ? 4 : 0) +
                    (key == 1 && !canClimb && fireCane && !(hammer && hookshot) && !(hammer && boots) ? 4 : 0) +
                    //compass room
                    (key == 4 && fireCane ? 4 : 0) +
                    (key == 3 && fireCane && (!canClimb || !hamHook) ? 4 : 0) +
                    (key == 2 && ((!canClimb && fireCane) || (fireCane && !hammer) || (fireCane && !boots && !hookshot)) ? 4 : 0) +
                    (key == 1 && !canClimb && fireCane && !(hammer && hookshot) && !(hammer && boots) ? 4 : 0) +
                    //big chest
                    (key >= 3 && bigKey && (hamHook || fireCane) ? 1 : 0) +
                    (key == 2 && bigKey && fireCane && (!canClimb || !hamHook) ? 1 : 0) +
                    (key == 1 && bigKey && (!canClimb || hammer) && (canClimb || fireCane) && (canClimb || !hammer) ? 1 : 0) +
                    //map chest
                    (key == 2 && !canClimb && hammer && !hookshot && boots ? 1 : 0) +
                    (key >= 3 && hammer && (hookshot || boots) ? 1 : 0) +
                    (key == 1 && fireCane && (!canClimb || (hammer && boots && !hookshot)) ? 1 : 0) +

                    (key == 0 && canClimb && hamHook ? 2 : 0) + //firesnake or map chest or anti-fairy chest
                    (key == 0 && fireCane && !hamHook ? 1 : 0) : //I DON'T KNOW
                    0;

            } else if (settings.keyMode == 2) {    // RETRO LOGIC

                boss = entry && canClimb && hookshot ?
                    hamHook && fireCane && boots ?
                        logic.DMlight() ? 1 : 2 :
                        3 :
                    0;

                min = entry && logic.DMlight() ?
                    (canClimb && somaria && !firerod && hammer && !hookshot && !boots ? 1 : 0) +
                    (canClimb && somaria && firerod && hammer && hookshot && boots ? 4 : 0) +
                    (canClimb && !somaria && !hammer && hookshot && boots ? 1 : 0) +
                    (somaria && !firerod && hammer && !hookshot && boots ? 1 : 0) +
                    (somaria && firerod && hammer && !hookshot ? 4 : 0) +
                    (somaria && !firerod && hammer && hookshot ? 1 : 0) +
                    (canClimb && !somaria && !hookshot && boots ? 1 : 0) +
                    (canClimb && somaria && !firerod && !hammer ? 1 : 0) +
                    (somaria && hammer && !hookshot && boots ? 1 : 0) +
                    (somaria && firerod && !hammer ? 4 : 0) +
                    (boots && (somaria || hammer) ? 1 : 0) +
                    (hammer && hookshot ? 14 : 0) +
                    (somaria && firerod ? 5 : 0) :
                    0;

                max = entry ?
                    2 +
                    (canClimb && somaria && firerod && hammer && hookshot && !boots ? 1 : 0) +
                    (canClimb && !somaria && firerod && hammer && hookshot ? 2 : 0) +
                    (canClimb && somaria && firerod && hammer && !hookshot ? 2 : 0) +
                    (somaria && firerod && hammer && !hookshot ? 3 : 0) +
                    (canClimb && !firerod && hammer && hookshot ? 2 : 0) +
                    (canClimb && somaria && firerod && !hammer ? 2 : 0) +
                    (canClimb && !hammer && hookshot ? 1 : 0) +
                    (canClimb && somaria && !firerod ? 1 : 0) +
                    (somaria && firerod && !hammer ? 3 : 0) +
                    (hammer && !hookshot && boots ? 1 : 0) +
                    (!canClimb && somaria ? 1 : 0) +
                    (hammer && hookshot ? 14 : 0) +
                    (somaria && firerod ? 5 : 0) +
                    (canClimb ? 2 : 0) +
                    (boots ? 1 : 0) :
                    0;

            } else {    // REGULAR LOGIC

                boss = entry && canClimb && hookshot ?
                    hamHook && fireCane && boots ?
                        logic.DMlight() ? 1 : 2 :
                        3 :
                    0;

                min = entry ?
                    (somaria && firerod && hammer && hookshot ? 3 : 0) +
                    (!somaria && !firerod && hammer && hookshot ? 11 : 0) +
                    (somaria && hammer && hookshot ? 8 : 0) +
                    (hammer && hookshot && boots ? 1 : 0) +
                    (somaria && firerod ? 5 : 0) +
                    (somaria && firerod && !hammer && boots ? 1 : 0) +
                    (somaria && firerod && hammer && !hookshot && boots ? 3 : 0) +
                    (canClimb && somaria && !firerod && hammer && hookshot ? 4 : 0) +
                    (canClimb && somaria && firerod && hammer && hookshot && boots ? 3 : 0) :
                    0;

                max = entry ?
                    2 +
                    ((firerod && somaria) || (hammer && hookshot) ? 7 : 0) +
                    (canClimb ? 2 : 0) +
                    (somaria ? 1 : 0) +
                    (boots ? 1 : 0) +
                    (canClimb && hookshot ? 1 : 0) +
                    (hammer && !hookshot && boots ? 2 : 0) +
                    (hammer && hookshot ? 6 : 0) +
                    (!canClimb && hammer && hookshot ? 2 : 0) +
                    (canClimb && !somaria && hammer && hookshot ? 1 : 0) +
                    ((canClimb || firerod) && hammer && somaria && !boots && hookshot ? 1 : 0) +
                    ((!canClimb || !hookshot) && firerod && somaria ? 1 : 0) :
                    0;

            }
            return { boss: boss, max: max, min: min }
        },
        11: function () { //Agahnim's Tower

            var entry = logic.entry11(),
                sword = items.sword.val >= 1,
                light = items.lamp.val,
                key = items.key11.val
                ;

            if (settings.keyMode == 1) {


                boss = entry && sword && key == 2 ?
                    light ? 1 : 2 :
                    0;

                max = entry ?
                    1 +             //first chest
                    (key ? 1 : 0) : //second chest
                    0;

                min = entry ?
                    1 +                       //first chest
                    (key && light ? 1 : 0) :    //second chest
                    0;

            } else if (settings.keyMode == 2) {


                if (items.keyShopFound.val) { //infinite key logic

                    boss = entry && sword ?
                        light ? 1 : 2 :
                        0;

                    min = entry ?
                        light ? 2 : 1 :
                        0;

                    max = entry ? 2 : 0;

                } else {    //limited key logic

                    maxKey = items.keyAny.val;
                    minKey = Math.max(0,
                        maxKey -
                        1 -
                        (logic.entry1() ? 1 : 0) -
                        (logic.entry2() ? 1 : 0) -
                        (logic.entry3() ? 6 : 0) -
                        (logic.entry4() ? 1 : 0)
                    );
                    maxKey -= (settings.openMode == 0 ? 1 : 0);

                    boss = entry && maxKey >= 2 && sword ?
                        minKey >= 2 ?
                            light ? 1 : 2 :
                            3 :
                        0;

                    max = entry ?
                        maxKey >= 1 ? 2 : 1 :
                        0;


                    min = entry ?
                        minKey >= 1 && light ? 2 : 1 :
                        0;

                }

            } else {
                boss = entry && sword ?
                    light ? 1 : 2 :
                    0;

                max = 0;
                min = 0;
            }

            return { boss: boss, max: max, min: min }
        },
    },
    keyShops: {
        0: function () { return 1 },  //LW Lake Hylia
        1: function () { return 1 },  //Kakariko
        2: function () { return logic.eastDM() ? logic.DMlight() ? 1 : 2 : 0; },  //Death Mountain
        3: function () { return logic.darkWorldSouth() ? 1 : 0; },  //DW Lake Hylia
        4: function () { return logic.darkEastDM() ? logic.DMlight() ? 1 : 2 : 0; },  //Dark EDM
        5: function () { return logic.darkWorldNW() && items.hammer.val ? 1 : 0; },  //Outcasts
        6: function () { return logic.darkWorldNW() ? 1 : 0; },  //DW Forest
        7: function () { return logic.darkWorldNW() ? 1 : 0; },  //DW Lumberjack
        8: function () { return logic.darkWorldEast() ? 1 : 0; },  //DW Potion Shop
    },
    keyShopCheck: function () { //function for checking and applying the status of key shop access in Retro mode
        var count = 0;
        var found = false;

        $.each(logic.keyShops, function (id, test) {

            if (test()) { count++ } //if the keyShop is accessible, add it to the count

            //toggle accessibility status on map
            $("#keyShop" + id).toggleClass("unavail", test() == 0);
            $("#keyShop" + id).toggleClass("dark", test() == 2);

            if (keyShops[id].active == true) { found = true } //check if any shop has been clicked
        });

        if (count >= 5) { found = true; } //if more than 5 shops are accessible, one must be a key shop

        items.keyShopFound.val = found ? 1 : 0;
        $("#keyAny").toggleClass("infinite", found);


        return found;
    },
    //function for colouring map elements by their logical state
    colour: function (elem, state) {

        $(elem)
            .toggleClass("unavail", state == 0)
            .toggleClass("avail", state == 1)
            .toggleClass("dark", state == 2)
            .toggleClass("maybe", state == 3)
            .toggleClass("visible", state == 4)
            .toggleClass("opened", state == "null")
            ;

    },

    //function that runs through all chests/dungeons and calculates/applies their status
    apply: function () {

        stats.clear();
        logic.setPrizes();
        if (settings.keyMode == 2) { logic.keyShopCheck(); }

        $.each(logic.chests, function (id, test) {

            status = chests[id].opened ? null : test(); //if the chest's not open, it is tested
            chests[id].status = status;                 //sets chest's status according to what the test found

            logic.colour("#chest" + id, status);         //colours the chest on the map
        });

        $.each(logic.dungeons, function (id, test) {
            dStatus = test();

            dStatus.boss = dungeons[id].completed ? null : dStatus.boss;
            dungeons[id].status = dStatus.boss;              //applies the test result to the dungeons object
            logic.colour("#dungeon" + id, dStatus.boss);    //colours the boss by its status

            total = dungeons[id]["chests" + settings.keyMode];
            opened = dungeons[id].openChests;

            dStatus.chest =             //figures out status of next chest based on how many opened so far & max/min available
                opened == total ? "null"
                    : opened < dStatus.min ? 1
                        : opened < dStatus.max ? 3
                            : 0;


            $("#dungeonChest" + id).html(total - opened);

            logic.colour("#dungeonChest" + id, dStatus.chest);

            for (chest = 1; chest <= total; chest++) {  //colours each chest pip based on amount opened and max/min
                pipStatus =
                    chest > (total - opened) ? "null"
                        : chest > (total - dStatus.min) ? 1
                            : chest > (total - dStatus.max) ? 3
                                : 0;

                logic.colour("#chestPip" + id + "-" + chest, pipStatus);
            }

            if (settings.predictor !== 0) {
                stats.find("boss10");
            } else {
                stats.clear();
            }

        });







    },
};