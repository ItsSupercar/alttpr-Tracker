

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
        6: function () { return (items.pendant.val == 3) ? 1 : items.book.val ? 4 : 0; }, // Master Sword Pedestal
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
        14: function () { return items.powder.val; }, // Magic Bat
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
            return items.book.val || items.flute.val && items.glove.val >= 2 && items.mirror.val ? 1 : 3;
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
                        maxKey -
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

            if (settings.keyMode == 1) {
                boss = fightMold && bigKey ?
                    light ? 1 : 2 :
                    0;

                max = entry ?
                    2 +                           //basic access
                    (key && fire ? 1 : 0) +         //basement
                    (bigKey ? 2 : 0) +                //upstairs
                    (bigKey && fightMold ? 1 : 0) :        //Boss
                    0;

                min = light ? max : 0;      //sets min to 0 if had to go through dark

            } else if (settings.keyMode == 2) {


                if (items.keyShopFound.val) { //infinite key logic

                    boss = fightMold ?
                        fire ?
                            light ? 1 : 2 :
                            3 :
                        0;

                    min = entry && light && fire ?
                        2 +
                        (fightMold ? 1 : 0) :
                        0;

                    max = entry ? 3 : 0;

                } else {  // limited key logic

                    maxKey = items.keyAny.val;
                    minKey = Math.max(0,
                        maxKey -
                        1 -
                        (logic.entry1() ? 1 : 0) -
                        (logic.entry3() ? 6 : 0) -
                        (logic.entry4() ? 1 : 0) -
                        (logic.entry11() ? 2 : 0)
                    );
                    maxKey -= (settings.openMode == 0 ? 1 : 0);

                    boss = fightMold ?
                        fire && minKey >= 1 ?
                            light ? 1 : 2 :
                            3 :
                        0;

                    min = entry && light && fire && minKey >= 1 ?
                        2 +
                        (fightMold ? 1 : 0) :
                        0;

                    max = entry ? 3 : 0;

                }




            } else {

                boss = fightMold ?
                    fire ?
                        light ? 1 : 2 :
                        3 :
                    0;

                min = entry && light && fire ?
                    1 +
                    (fightMold ? 1 : 0) :
                    0;

                max = entry ? 2 : 0;

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

            if (settings.keyMode == 1) {

                boss = entry && hamBow && bigKey && key >= 1 ?
                    key == 6 ?
                        lamp ? 1 : 2 :
                        3 :
                    0;



                min = entry ?
                    1 +                 // first chest
                    (bow ? 2 : 0) +              //mimic chests
                    (key >= 1 ? 2 : 0) +           //next 2 chests  (bridge and stalfos head room)
                    (key >= 2 ? 1 : 0) +                      //middle chest
                    (key >= 4 ? 1 : 0) +                                                     //turtle room chest
                    (key >= 4 && lamp ? 2 : 0) +                                         //dark basement
                    (key == 6 ? 1 : 0) +                                                        //harmless hellway
                    (key == 6 && lamp && bigKey && hamBow ? 1 : 0) +                           //boss
                    (key == 0 && hamBow ? 2 : 0) +    //can't waste key on first door if you don't have one ;)
                    // These next lines are kinda messy!
                    // They were left over while I was simplifying the logic tree, and they can probably be simplified too
                    // For now they seem to get correct results, though!                 
                    (key == 3 || key == 4 && lamp || key == 5 ? hamBow ? 0 : 1 : 0) +
                    (key == 5 && hamBow && lamp ? 1 : 0) +
                    ((key >= 5 || key >= 3 && hamBow) && bigKey && lamp ? 1 : 0) +
                    (((!hamBow && (key == 5 || key == 3)) || key == 6) && lamp ? 2 : 0) :
                    0;


                max = entry ?
                    1 +                                                 //first chest
                    (bow ? 2 : 0) +                                      //mimic chests
                    (key >= 1 || key == 0 && hamBow ? 2 : 0) +   //next 2 chests    (bridge and stalfos head room)
                    (key >= 2 || key == 1 && hamBow ? 3 : 0) +   //next 3 chests (turtle room and dark room)
                    (key >= 3 || key == 2 && hamBow ? 2 : 0) +   //next 2 chests (dark maze)
                    (bigKey && (key >= 3 || key == 2 && hamBow) ? 1 : 0) +  //big chest
                    (key >= 4 || key == 3 && hamBow ? 1 : 0) +   //additional chest (harmless or middle)
                    (key >= 5 || key == 4 && hamBow ? 1 : 0) +   //additional chest (harmless or middle)
                    (key >= 5 && bigKey && hamBow ? 1 : 0) :    //boss
                    0;




            } else if (settings.keyMode == 2) {


                if (items.keyShopFound.val) {     //infinite key logic

                    boss = fightHelm ?
                        lamp ? 1 : 2 :
                        0;

                    min = entry ?
                        bow ?
                            lamp ?
                                hammer ? 11 : 10 :
                                5 :
                            3 :
                        0;

                    max = entry ?
                        bow ? 11 : 10 :
                        0;

                } else {    //limited key logic

                    maxKey = items.keyAny.val;
                    minKey = Math.max(0,
                        maxKey -
                        1 -
                        (logic.entry1() ? 1 : 0) -
                        (logic.entry2() ? 1 : 0) -
                        (logic.entry4() ? 1 : 0) -
                        (logic.entry11() ? 2 : 0)
                    );

                    maxKey -= (settings.openMode == 0 ? 1 : 0);
                    maxKey -= 2; //had to use 2 keys at Aga to get into this situation


                    boss = entry && hamBow && maxKey >= 1 ?
                        minKey >= 6 ?
                            lamp ? 1 : 2 :
                            3 :
                        0;

                    min = entry ?
                        minKey >= 6 ?
                            bow ? hammer ? lamp ? 11 : 5 : lamp ? 10 : 5 : lamp ? 8 : 3 :
                            minKey >= 5 ?
                                bow ? hammer ? lamp ? 8 : 5 : lamp ? 9 : 7 : lamp ? 8 : 3 :
                                minKey >= 4 ?
                                    bow ? hammer ? lamp ? 7 : 4 : lamp ? 7 : 5 : lamp ? 5 : 3 :
                                    minKey >= 3 ?
                                        bow ? hammer ? lamp ? 4 : 3 : lamp ? 6 : 4 : lamp ? 4 : 2 :
                                        minKey >= 2 ?
                                            bow ? 3 : 1 :
                                            minKey >= 1 ?
                                                bow ? 2 : 0 :
                                                hammer ?
                                                    bow ? 2 : 0 :
                                                    0 :
                        0;



                    max =
                        entry ?
                            maxKey >= 6 ?
                                bow ?
                                    hammer ? 11 : 11 :
                                    10 :
                                maxKey >= 5 ?
                                    bow ?
                                        hammer ? 11 : 11 :
                                        10 :
                                    maxKey >= 4 ?
                                        bow ?
                                            hammer ? 11 : 11 :
                                            9 :
                                        maxKey >= 3 ?
                                            bow ?
                                                hammer ? 11 : 10 :
                                                8 :
                                            maxKey >= 2 ?
                                                bow ?
                                                    hammer ? 10 : 8 :
                                                    6 :
                                                maxKey >= 1 ?
                                                    bow ?
                                                        hammer ? 8 : 5 :
                                                        3 :
                                                    bow ?
                                                        hammer ? 5 : 3 :
                                                        1 :
                            0;


                }

            } else {

                boss = fightHelm ?
                    lamp ? 1 : 2 :
                    0;

                min = entry && bow && lamp ?
                    hammer ? 5 : 4 :
                    0;

                max = entry ? 5 : 0;

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


            if (settings.keyMode == 1) {

                boss = fightArrg && key ? 1 : 0;

                min = entry ?
                    1 +                                       //Entrance
                    (key ? 1 : 0) +                             //Ledge Chest
                    (key && hammer ? 3 : 0) +                //Main Dungeon
                    (key && hammer && bigKey ? 1 : 0) +        //Big Chest 
                    (key && hammer && hookshot ? 4 : 0) :   //Back of dungeon
                    0;

                max = min;

            } else if (settings.keyMode == 2) {

                if (items.keyShopFound.val) { //infinite key logic

                    boss = fightArrg ? 1 : 0;

                    min = entry ?
                        hammer ?
                            hookshot ? 7 : 3 :
                            0 :
                        0;

                    max = entry ?
                        hammer ?
                            hookshot ? 7 : 5 :
                            2 :
                        0;

                } else {

                    maxKey = items.keyAny.val;
                    minKey = Math.max(0,
                        maxKey -
                        1 -
                        (logic.entry1() ? 1 : 0) -
                        (logic.entry2() ? 1 : 0) -
                        (logic.entry3() ? 6 : 0) -
                        (logic.entry11() ? 2 : 0)
                    );
                    maxKey -= (settings.openMode == 0 ? 1 : 0);
                    maxKey -= 2; //had to use 2 keys at Aga to get into this situation


                    boss = fightArrg ?
                        minKey >= 1 ? 1 : 3 :
                        0;

                    max = entry ?
                        maxKey >= 1 ?
                            hammer ?
                                hookshot ? 7 : 5 :
                                2 :
                            1 :
                        0;

                    min = entry ?
                        minKey >= 1 ?
                            hammer ?
                                hookshot ? 7 : 3 :
                                0 :
                            0 :
                        0;

                }

            } else {

                boss = fightArrg ? 1 : 0;

                min = entry ?
                    hammer ?
                        hookshot ? 6 : 2 :
                        0 :
                    0;

                max = entry ?
                    hammer ?
                        hookshot ? 6 : 4 :
                        1 :
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

            if (settings.keyMode == 1) {

                boss = fightMoth ? 1 : 0;

                min = entry ?
                    5 +                         // basic access
                    (bigKey ? 1 : 0) +          // big chest
                    (firerod ? 1 : 0) +           // phase 3 chest
                    (fightMoth ? 1 : 0) :            //Boss
                    0;

                max = min;

            } else if (settings.keyMode == 2) {
                boss = fightMoth ? 1 : 0;

                min = entry ?
                    firerod ?
                        sword ? 5 : 4 :
                        3 :
                    0;

                max = entry ?
                    firerod ? 5 : 4 :
                    0;

            } else {

                boss = fightMoth ? 1 : 0;

                min = entry && firerod ?
                    sword ? 2 : 1 :
                    0;

                max = entry ? 2 : 0;

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

            if (settings.keyMode == 1) {

                boss = fightBlind && bigKey ? 1 : 0;

                min = entry ?
                    4 +                                     // basic access
                    (bigKey ? 2 : 0) +                      // upstairs and jail chests
                    (fightBlind && bigKey ? 1 : 0) +        // boss
                    (hammer && key && bigKey ? 1 : 0) :     // big chest
                    0;

                max = min;

            } else if (settings.keyMode == 2) {

                boss = fightBlind ? 1 : 0;

                min = entry ?
                    hammer ?
                        5 :
                        fightBlind ? 4 : 3 :
                    0;

                max = entry ? 5 : 0;

            } else {

                boss = fightBlind ? 1 : 0;

                min = entry ?
                    hammer ?
                        4 :
                        fightBlind ? 3 : 2 :
                    0;

                max = entry ? 4 : 0;

            }

            return { boss: boss, max: max, min: min }
        },
        7: function () { //Ice Palace

            var entry = logic.entry7(),
                hookshot = items.hookshot.val,
                hammer = items.hammer.val,
                somaria = items.somaria.val,
                skipJump = somaria || hookshot,
                spikeWalk = items.byrna.val || items.cape.val || hookshot,
                fightKhold = entry && hammer,
                key = items.key7.val,
                bigKey = items.bigKey7.val
                ;

            if (settings.keyMode == 1) {

                boss = fightKhold ?
                    bigKey && (somaria && key >= 1 || key >= 2) ? 1 : 3 :
                    0;

                min = entry ?
                    3 +                                                            //Penguin Chest, Freezor Chest, Jelly Chest
                    (bigKey ? 1 : 0) +                                          	        //Big Chest
                    (hookshot || key >= 2 && spikeWalk ? 1 : 0) +	                      //Spike Chest
                    ((hookshot || key >= 2) && spikeWalk && hammer ? 2 : 0) +           //Big Key Chest, Stalfos Chest, 
                    (hammer && bigKey && (somaria && key >= 1 || key >= 2) ? 1 : 0) :    //Boss
                    0;

                max = entry ?
                    3 +                                                 //basic access
                    (bigKey ? 1 : 0) +		                           	//Big Chest
                    (hookshot || key >= 1 ? 1 : 0) +                	//Spike Chest
                    ((hookshot || key >= 1) && hammer ? 2 : 0) +        //Big Key Chest, Stalfos Chest, 
                    (hammer ? 1 : 0)                                    //boss
                    :
                    0;

            } else if (settings.keyMode == 2) {

                boss = fightKhold ?
                    skipJump && spikeWalk ? 1 : 3 :
                    0;

                min = entry ?
                    hammer ?
                        skipJump && spikeWalk ? 5 : 1 :
                        skipJump && spikeWalk ? 4 : 1 :
                    0;

                max = entry ?
                    hammer ? 5 : 4 :
                    0;

            } else {

                boss = fightKhold ?
                    skipJump ? 1 : 3 :
                    0;

                min = entry ?
                    hammer ?
                        skipJump ? 3 : 1 :
                        skipJump ? 2 : 0 :
                    0;

                max = entry ? 3 : 0;

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

            if (settings.keyMode == 1) {

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

            } else if (settings.keyMode == 2) {

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

            } else {

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

            if (settings.keyMode == 1) {


                boss = fightTri && bigKey && key >= 3 ?
                    medallion == 1 ?
                        key == 4 ?
                            light ? 1 : 2 :
                            3 :
                        medallion :
                    0;

                max = entry && medallion !== 0 ?
                    1 +	                //Compass Chest
                    (firerod ? 2 : 0) + 	//Spike Roller Chests
                    (key >= 1 ? 1 : 0) +    //Chomp Room
                    (key >= 2 ? 1 : 0) +      //BK Chest, or boss instead if enough keys
                    (key == 4 ?
                        bigKey ? (6 + (fightTri ? 1 : 0)) : 0 : //Big Chest, Crystaroller, Laser Bridge, Boss
                        key == 3 ?
                            bigKey ? 6 : 0 :   //Big Chest, Crystaroller, Laser Bridge
                            key == 2 ?
                                bigKey ? 5 : 0 :     //Big Chest, possible laser bridge if skip BK chest
                                0) :
                    0;

                min = entry && light && 1 == medallion ?
                    1 +				        //Compass Chest
                    (firerod ? 2 : 0) +		//Spike Roller Chests
                    (key >= 1 ? 1 : 0) +   //Chomp room
                    (key >= 2 ? 1 : 0) +      //BK Chest, or boss instead if enough keys
                    (key == 4 ?
                        (bigKey ? (2 +
                            (lamp ?           //Need light to guarantee last 5 items
                                ((safety ? 4 : 0) + (fightTri ? 1 : 0)) :    //Laser Bridge + Boss
                                0)) :
                            0) :
                        key == 3 ?
                            (bigKey ?
                                (1 +
                                    (lamp ?           //Need light to guarantee last 5 items
                                        ((safety ? 4 : 0) + (fightTri ? 1 : 0)) :     //Laser Bridge + Boss
                                        0)) :
                                0) :
                            key == 2 ?
                                bigKey ? 2 : 0 :		    //Big Chest, Crystaroller Chest
                                0) :
                    0;

            } else if (settings.keyMode == 2) {

                boss = fightTri ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                min = entry && light && medallion == 1 ?
                    firerod ?
                        safety ?
                            icerod ? 9 : 8 :
                            4 :
                        2 :
                    0;


                max = entry && medallion !== 0 ?
                    firerod ? 9 : 8 :
                    0;

            } else {
                boss = fightTri ?
                    medallion == 1 ?
                        lamp ? 1 : 2 :
                        medallion :
                    0;

                max = entry && medallion !== 0 ? 5 : 0;

                min = entry && light && firerod && medallion == 1 ?
                    safety ?
                        icerod ? 5 : 4 :
                        1 :
                    0;
            }

            return { boss: boss, max: max, min: min }
        },
        10: function () { //Ganon's Tower

            var entry = logic.entry10(),
                canClimb = items.bow.val >= 2 && logic.fire(),
                light = items.lamp.val,
                somaria = items.somaria.val,
                firerod = items.firerod.val,
                fireCane = somaria && firerod,
                hammer = items.hammer.val,
                hookshot = items.hookshot.val,
                hamHook = hammer && hookshot,
                boots = items.boots.val,
                hamBoots = hammer && boots,
                key = items.key10.val,
                bigKey = items.bigKey10.val
                ;



            if (settings.keyMode == 1) {


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
                    (key >= 3 ?                           //...and the rest
                        canClimb ?
                            hamHook ?                           ///   yeah I know
                                fireCane ? 19 : 15 :
                                fireCane ?
                                    hamBoots ?
                                        13 :
                                        hookshot ? 13 : 12 :
                                    hamBoots ?
                                        4 :
                                        hookshot ? 4 : 3 :
                            hamHook ?
                                fireCane ?
                                    bigKey ? 15 : 14 :
                                    bigKey ? 11 : 10 :
                                fireCane ?
                                    hamBoots ?
                                        bigKey ? 10 : 9 :
                                        bigKey ? 9 : 8 :
                                    hamBoots ? 1 : 0 :
                        key == 2 ?
                            canClimb ?
                                hamHook ?
                                    fireCane ? 18 : 15 :
                                    fireCane ?
                                        hamBoots ?
                                            13 :
                                            hookshot ? 13 : 12 :
                                        hamBoots ?
                                            4 :
                                            hookshot ? 4 : 3 :
                                hamHook ?
                                    fireCane ?
                                        bigKey ? 15 : 14 :
                                        bigKey ? 11 : 10 :
                                    fireCane ?
                                        hamBoots ?
                                            bigKey ? 10 : 9 :
                                            bigKey ? 9 : 8 :
                                        hamBoots ? 1 : 0 :
                            key == 1 ?
                                canClimb ?
                                    hamHook ?
                                        fireCane ? 17 : 14 :
                                        fireCane ?
                                            hamBoots ?
                                                13 :
                                                hookshot ? 13 : 12 :
                                            hamBoots ?
                                                4 :
                                                hookshot ? 4 : 3 :
                                    hamHook ?
                                        fireCane ?
                                            bigKey ? 14 : 13 :
                                            bigKey ? 11 : 10 :
                                        fireCane ?
                                            hamBoots ?
                                                bigKey ? 10 : 9 :
                                                bigKey ? 9 : 8 :
                                            hamBoots ? 1 : 0 :
                                canClimb ?
                                    hamHook ?
                                        fireCane ? 16 : 13 :
                                        fireCane ?
                                            hamBoots ? 13 : 12 :
                                            hamBoots ?
                                                4 :
                                                hookshot ? 4 : 3 :
                                    hamHook ?
                                        bigKey ? 10 : 9 :
                                        fireCane ?
                                            hamBoots ?
                                                bigKey ? 10 : 9 :
                                                bigKey ? 9 : 8 :
                                            hamBoots ? 1 : 0) :
                    0;




                min = entry && logic.DMlight() ?
                    2 +                     //hope room
                    (boots ? 1 : 0) +       //torch
                    (hamHook ? 4 : 0) +     //dark mag room
                    (somaria ? 1 : 0) +     //tile room
                    (key == 4 ?
                        canClimb ?
                            hamHook ?
                                fireCane ? 19 : 15 :
                                fireCane ?
                                    hamBoots ?
                                        13 :
                                        hookshot ? 13 : 12 :
                                    hamBoots ?
                                        4 :
                                        hookshot ? 4 : 3 :
                            hamHook ?
                                fireCane ?
                                    bigKey ? 15 : 14 :
                                    bigKey ? 11 : 10 :
                                fireCane ?
                                    hamBoots ?
                                        bigKey ? 10 : 9 :
                                        bigKey ? 9 : 8 :
                                    hamBoots ? 1 : 0 :
                        key == 3 ?
                            canClimb ?
                                hamHook ?
                                    15 :
                                    fireCane ?
                                        hamBoots ?
                                            13 :
                                            hookshot ? 13 : 12 :
                                        hamBoots ?
                                            4 :
                                            hookshot ? 4 : 3 :
                                fireCane ?
                                    hamHook ?
                                        bigKey ? 15 : 14 :
                                        bigKey ?
                                            hamBoots ? 10 : 9 :
                                            hamBoots ? 9 : 8 :
                                    hamHook ?
                                        bigKey ? 11 : 10 :
                                        hamBoots ? 1 : 0 :
                            key == 2 ?
                                canClimb ?
                                    hamHook ?
                                        6 :
                                        fireCane ?
                                            hamBoots ?
                                                4 :
                                                hookshot ? 13 : 12 :
                                            hamBoots ?
                                                3 :
                                                hookshot ? 4 : 3 :
                                    fireCane ?
                                        hamHook ?
                                            bigKey ? 11 : 10 :
                                            bigKey ?
                                                hamBoots ? 10 : 9 :
                                                hamBoots ? 9 : 8 :
                                        hamHook ?
                                            2 :
                                            hamBoots ? 1 : 0 :
                                key == 1 ?
                                    canClimb ?
                                        hamHook ?
                                            5 :
                                            fireCane ?
                                                hamBoots ?
                                                    4 :
                                                    hookshot ? 4 : 3 :
                                                3 :
                                        fireCane ?
                                            hamHook ?
                                                2 :
                                                hamBoots ?
                                                    1 :
                                                    bigKey ? 9 : 8 :
                                            hamHook ? 1 : 0 :
                                    canClimb ?
                                        hamHook ?
                                            4 :
                                            fireCane ? 3 : 2 :
                                        fireCane && hamHook ? 1 : 0) :
                    0;






            } else if (settings.keyMode == 2) {

                boss = entry && canClimb && hookshot ?
                    hamHook && fireCane && boots ?
                        logic.DMlight() ? 1 : 2 :
                        3 :
                    0;


                min = entry && logic.DMlight() ?
                    somaria ?
                        hammer ?
                            firerod ?
                                boots ?
                                    hookshot ?
                                        canClimb ? 24 : 20 :
                                        11 :
                                    hookshot ?
                                        canClimb ? 23 : 19 :
                                        9 :
                                boots ?
                                    hookshot ?
                                        16 :
                                        canClimb ? 3 : 2 :
                                    hookshot ?
                                        15 :
                                        canClimb ? 1 : 0 :
                            firerod ?
                                boots ? 10 : 9 :
                                boots ?
                                    canClimb ? 2 : 1 :
                                    canClimb ? 1 : 0 :
                        hammer ?
                            boots ?
                                hookshot ?
                                    15 :
                                    canClimb ? 2 : 1 :
                                hookshot ? 14 : 0 :
                            boots && canClimb ? 1 : 0 :
                    0;



                max = entry ?
                    canClimb ?
                        somaria ?
                            firerod ?
                                hammer ?
                                    hookshot ?
                                        24 :
                                        boots ? 16 : 14 :
                                    hookshot ?
                                        boots ? 16 : 15 :
                                        boots ? 15 : 14 :
                                hammer ?
                                    hookshot ?
                                        boots ? 22 : 21 :
                                        boots ? 7 : 5 :
                                    hookshot ?
                                        boots ? 7 : 6 :
                                        boots ? 6 : 5 :
                            hammer ?
                                hookshot ?
                                    boots ? 21 : 20 :
                                    boots ? 6 : 4 :
                                hookshot ?
                                    boots ? 6 : 5 :
                                    boots ? 5 : 4 :
                        somaria ?
                            firerod ?
                                hammer ?
                                    hookshot ?
                                        boots ? 22 : 21 :
                                        boots ? 13 : 11 :
                                    boots ? 12 : 11 :
                                hammer ?
                                    hookshot ?
                                        boots ? 18 : 17 :
                                        boots ? 5 : 3 :
                                    boots ? 4 : 3 :
                            hammer ?
                                hookshot ?
                                    boots ? 17 : 16 :
                                    boots ? 4 : 2 :
                                boots ? 3 : 2 :
                    0;




            } else {
                boss = entry && canClimb && hookshot ?
                    hamHook && fireCane && boots ?
                        logic.DMlight() ? 1 : 2 :
                        3 :
                    0;

                min = entry ?
                    canClimb ?
                        somaria ?
                            firerod ?
                                hammer ?
                                    hookshot ?
                                        boots ? 20 : 16 :
                                        boots ? 8 : 5 :
                                    boots ? 6 : 5 :
                                hammer && hookshot ?
                                    boots ? 13 : 12 :
                                    0 :
                            hammer && hookshot ?
                                boots ? 12 : 11 :
                                0 :
                        somaria ?
                            firerod ?
                                hammer ?
                                    hookshot ?
                                        boots ? 17 : 16 :
                                        boots ? 8 : 5 :
                                    boots ? 6 : 5 :
                                hammer && hookshot ?
                                    boots ? 9 : 8 :
                                    0 :
                            hammer && hookshot ?
                                boots ? 12 : 11 :
                                0 :
                    0;

                max = entry ?
                    canClimb ?
                        somaria ?
                            firerod ?
                                hammer ?
                                    hookshot ?
                                        20 :
                                        boots ? 16 : 13 :
                                    boots ? 14 : 13 :
                                hammer ?
                                    hookshot ?
                                        20 :
                                        boots ? 8 : 5 :
                                    hookshot ?
                                        boots ? 7 : 6 :
                                        boots ? 6 : 5 :
                            hammer ?
                                hookshot ?
                                    boots ? 20 : 19 :
                                    boots ? 7 : 4 :
                                hookshot ?
                                    boots ? 6 : 5 :
                                    boots ? 5 : 4 :
                        somaria ?
                            firerod ?
                                hammer ?
                                    hookshot ?
                                        20 :
                                        boots ? 14 : 11 :
                                    boots ? 12 : 11 :
                                hammer ?
                                    hookshot ?
                                        boots ? 19 : 18 :
                                        boots ? 6 : 3 :
                                    boots ? 4 : 3 :
                            hammer ?
                                hookshot ?
                                    boots ? 18 : 17 :
                                    boots ? 5 : 2 :
                                boots ? 3 : 2 :
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


        });







    },
};