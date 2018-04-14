
statsTable = {};

function merge_array(array1, array2) {
    var result_array = [];
    var arr = array1.concat(array2);
    var len = arr.length;
    var assoc = {};

    while (len--) {
        var item = arr[len];

        if (!assoc[item]) {
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}

stats = {
    goList0: function () {
        var bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
            lamp = items.lamp.val,
            bigKey = items.bigKey0.val;

        list = [!bow ? "bow" : ""];

        list = list.filter(Boolean);
        return list;
    },
    goList1: function () {
        var entry = logic.entry1(),
            fire = logic.fire(),
            bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
            fightLanmo = (items.hammer.val || items.sword.val >= 1 || bow || logic.cane() || logic.rod()),

            list = [
                items.glove.val == 0 || !entry && items.glove.val !== 2 ? "glove" : "",
                !entry ? "book" : "",
                !entry && !items.flute.val ? "flute" : "",
                !entry && !items.mirror.val ? "mirror" : "",
                !items.boots.val ? "boots" : "",
                !fire ? "lamp" : "",
                !fire || (!fightLanmo && !items.firerod.val) ? "firerod" : "",
                !fightLanmo && !items.hammer.val ? "hammer" : "",
                !fightLanmo && !items.sword.val ? "sword" : "",
                !fightLanmo && !bow ? "bow" : "",
                !fightLanmo && !items.somaria.val ? "somaria" : "",
                !fightLanmo && !items.byrna.val ? "byrna" : "",
                !fightLanmo && !items.icerod.val ? "icerod" : "",
                settings.keyMode == 1 && !items.key1.val ? "key1" : "",
                settings.keyMode == 1 && !items.bigKey1.val ? "bigKey1" : "",
            ];

        list = list.filter(Boolean);
        return list;
    },
    goList2: function () {
        var entry = logic.entry2(),
            fightMold = entry && (items.sword.val >= 1 || items.hammer.val),
            fire = logic.fire(),
            light = logic.DMlight(),
            key = items.key2.val,
            bigKey = items.bigKey2.val;

        list = [
            !entry && !items.glove.val ? "glove" : "",
            !entry && !items.flute.val ? "flute" : "",
            !entry && !items.mirror.val ? "mirror" : "",
            !entry && !items.hookshot.val ? "hookshot" : "",
            (!entry || !fightMold) && !items.hammer.val ? "hammer" : "",
            !fightMold && !items.sword.val ? "sword" : "",
            !fire ? "lamp" : "",
            !fire ? "firerod" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList3: function () {
        var entry = logic.entry3(),
            hammer = items.hammer.val,
            bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
            key = items.key3.val,
            bigKey = items.bigKey3.val,

            list = [
                !hammer ? "hammer" : "",
                !bow ? "bow" : "",
                !items.pearl.val ? "pearl" : "",
                !entry && items.glove.val < 2 ? "glove" : "",
                !entry && !items.flippers.val ? "flippers" : "",
            ];

        list = list.filter(Boolean);
        return list;
    },
    goList4: function () {
        var entry = logic.entry4(),
            darkWorldSouth = logic.darkWorldSouth(),
            hammer = items.hammer.val,
            hookshot = items.hookshot.val,
            key = items.key4.val,
            bigKey = items.bigKey4.val;

        list = [
            !hammer ? "hammer" : "",
            !bow ? "bow" : "",
            !items.flippers.val ? "flippers" : "",
            !items.mirror.val ? "mirror" : "",
            !items.pearl.val ? "pearl" : "",
            !darkWorldSouth && !items.glove.val ? "glove" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList5: function () {
        var entry = logic.entry5(),
            firerod = items.firerod.val,
            sword = items.sword.val >= 1,
            key = items.key5.val,
            bigKey = items.bigKey5.val;

        list = [
            !firerod ? "firerod" : "",
            !sword ? "sword" : "",
            !items.pearl.val ? "pearl" : "",
            !entry && !items.glove.val ? "glove" : "",
            !entry && !items.hammer.val ? "hammer" : "",
            !entry && !items.hookshot.val ? "hookshot" : "",
            !entry && !items.flippers.val ? "flippers" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList6: function () {
        var entry = logic.entry6(),
            hammer = items.hammer.val,
            fightBlind = entry && (items.sword.val >= 1 || hammer || logic.cane()),
            key = items.key6.val,
            bigKey = items.bigKey6.val;

        list = [
            !items.pearl.val ? "pearl" : "",
            !entry && !items.glove.val ? "glove" : "",
            (!entry || !fightBlind) && !items.hammer.val ? "hammer" : "",
            !entry && !items.hookshot.val ? "hookshot" : "",
            !entry && !items.flippers.val ? "flippers" : "",
            !fightBlind && !items.sword.val ? "sword" : "",
            !fightBlind && !items.somaria.val ? "somaria" : "",
            !fightBlind && !items.byrna.val ? "byrna" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList7: function () {
        var entry = logic.entry7(),
            melt = items.firerod.val || (items.bombos.val && items.sword.val >= 1),
            hookshot = items.hookshot.val,
            hammer = items.hammer.val,
            somaria = items.somaria.val,
            key = items.key7.val,
            bigKey = items.bigKey7.val;

        list = [
            !hammer ? "hammer" : "",
            !hookshot ? "hookshot" : "",
            !somaria ? "somaria" : "",
            !items.flippers.val ? "flippers" : "",
            !items.pearl.val ? "pearl" : "",
            !melt && !items.sword.val ? "sword" : "",
            !melt && !items.bombos.val ? "bombos" : "",
            !melt ? "firerod" : "",
            !entry && items.glove.val < 2 ? "glove" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList8: function () {
        var entry = logic.entry8(),
            lamp = items.lamp.val,
            somaria = items.somaria.val,
            firerod = items.firerod.val,
            fire = firerod || lamp,
            key = items.key8.val,
            bigKey = items.bigKey8.val,
            bow = settings.keyMode == 2 ? (items.bow.val == 2 && items.keyShopFound.val || items.bow.val == 3) : items.bow.val >= 2,
            fightVit = entry && somaria && (items.sword.val >= 1 || bow),
            medallion = logic.medallion(8);

        list = [
            !items.pearl.val ? "pearl" : "",
            !somaria ? "somaria" : "",
            !entry && !items.flute.val ? "flute" : "",
            !entry && items.glove.val < 2 ? "glove" : "",
            !entry && !items.hookshot.val ? "hookshot" : "",
            !entry && !items.boots.val ? "boots" : "",
            !fire ? "firerod" : "",
            !fire ? "lamp" : "",
            !fightVit && !bow ? "bow" : "",
            !fightVit && !items.sword.val ? "sword" : "",
            (medallion == 3 || (medallion == 0 && (items.medal8.val == 1 || items.medal8.val == 0))) && !items.bombos.val ? "bombos" : "",
            (medallion == 3 || (medallion == 0 && (items.medal8.val == 2 || items.medal8.val == 0))) && !items.ether.val ? "ether" : "",
            (medallion == 3 || (medallion == 0 && (items.medal8.val == 3 || items.medal8.val == 0))) && !items.quake.val ? "quake" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList9: function () {
        var entry = logic.entry9(),
            climbDM = logic.climbDM(),
            eastDM = logic.eastDM(),
            medallion = logic.medallion(9),
            firerod = items.firerod.val,
            icerod = items.icerod.val,
            safety = items.byrna.val || items.shield.val >= 3 || items.cape.val,
            light = logic.DMlight(),
            lamp = items.lamp.val,
            fightTri = entry && firerod && items.icerod.val,
            key = items.key9.val,
            bigKey = items.bigKey9.val;

        list = [
            !items.pearl.val ? "pearl" : "",
            !somaria ? "somaria" : "",
            !firerod ? "firerod" : "",
            !icerod ? "icerod" : "",
            !items.hammer.val ? "hammer" : "",
            items.glove.val < 2 ? "glove" : "",
            !items.sword.val ? "sword" : "",
            !eastDM && !items.mirror.val ? "mirror" : "",
            !eastDM && !items.hookshot.val ? "hookshot" : "",
            !climbDM && !items.flute.val ? "flute" : "",
            (medallion == 3 || (medallion == 0 && (items.medal9.val == 1 || items.medal9.val == 0))) && !items.bombos.val ? "bombos" : "",
            (medallion == 3 || (medallion == 0 && (items.medal9.val == 2 || items.medal9.val == 0))) && !items.ether.val ? "ether" : "",
            (medallion == 3 || (medallion == 0 && (items.medal9.val == 3 || items.medal9.val == 0))) && !items.quake.val ? "quake" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    goList10: function () {
        var eastDM = logic.eastDM();

        list = [
            !items.pearl.val ? "pearl" : "",
            !items.hammer.val ? "hammer" : "",
            !items.hookshot.val ? "hookshot" : "",
            !items.boots.val ? "boots" : "",
            !items.somaria.val ? "somaria" : "",
            !items.firerod.val ? "firerod" : "",
            !items.bow.val ? "bow" : "",
            items.glove.val < 2 ? "glove" : "",
            !eastDM && !items.mirror.val ? "mirror" : "",
            items.sword.val < 2 ? "sword" : "",
            items.bow.val % 2 !== 1 ? "silver" : "",
        ];

        $.each(dungeons, function (id, dungeon) {
            if (id <= 9 && (dungeon.prize == 0 || dungeon.prize == 3 || dungeon.prize == 4)) {
                list = merge_array(list, stats["goList" + id]());
            }
        });

        list = list.filter(Boolean);
        return list;
    },
    goList11: function () {
        var entry = logic.entry11();
        list = [
            !items.sword.val || !entry ? "sword" : "",
            !entry && !items.cape.val ? "cape" : "",
        ];

        list = list.filter(Boolean);
        return list;
    },
    fetch: function () {
        $.ajax({
            type: "GET",
            url: "stats_standard_random.csv",
            dataType: "text",
            success: function (data) {

                //convert the CSV into a javascript object
                data = data.split(/\r\n|\n/);
                $.each(data, function (row, values) {
                    data[row] = values.split(",");
                });

                //get the item-name headers from the table's first line
                var index = [];
                $.each(data[0], function (key, title) {
                    if (key >= 3) {
                        statsTable[title] = {};
                        index[key] = title;
                    }
                });


                $.each(data, function (row, values) {
                    if (row >= 1 && typeof (values[1]) !== 'undefined') {

                        elem = values[0] + values[1];
                        $.each(values, function (key, count) {
                            if (key >= 3) {
                                statsTable[index[key]][elem] = count;
                            }
                        });


                    }
                });

                stats.find("boss10");


            }
        });

    },
    find: function (elem) {

        if (typeof (elem) == "string") { elem = { id: elem }; }

        if (settings.predictor !== "0") {

            if (elem.id.indexOf("medal") >= 0 || elem.id == "bomb" || elem.id.indexOf("ey") >= 0 || items[elem.id].val == items[elem.id].max) {
                item = null;
            } else if (elem.id.indexOf("boss") >= 0 || elem.id.indexOf("prize") >= 0) {
                id = (elem.id.replace(/\D/g, ''));
                item = stats["goList" + id]();
            } else if (elem.id == "bow") {
                item = items.bow.val == 2 ? "silver" : "bow";
            } else if (elem.id == "mushroompowder") {
                item = items.mushroompowder.val == 2 ? "mushroom" : "powder";
            } else if (elem.id == "shovelflute") {
                item = items.shovelflute.val == 2 ? "shovel" : "flute";
            } else {
                item = elem.id;
            }

            if (item !== null && item.constructor !== Array) { item = [item]; }

            if (item !== null && typeof (item[0]) !== 'undefined' && typeof (statsTable[item[0]]) !== 'undefined') {


                var counts = {};

                $.each(item, function (k, itemName) {
                    $.each(statsTable[itemName], function (label, count) {
                        if (typeof (counts[label]) == 'undefined') { counts[label] = 0; }
                        counts[label] += parseInt(count);

                    });
                });

                var max = 0;
                var total = 0;
                var chestValues = {};
                var dungeonChestValues = {}
                var chestColors = {};
                var dungeonChestColors = {};
                var dungeonColors = {};

                $.each(chests, function (id, chest) {
                    status = logic.chests[id]();
                    status = (status == true) ? 1 : status;
                    access = (status == 1 || status == 2);
                    if (chest.opened == false && (access || settings.predictor == 2)) {
                        var count = counts["chest" + id] / chests[id].amount;
                        chestValues[id] = count;
                        total += count;
                        max = Math.max(max, count);
                        chestColors[id] = status;
                    }
                });

                $.each(dungeons, function (id, dungeon) {
                    var numChests = dungeon["chests" + settings.keyMode];
                    var opened = dungeon.openChests;
                    var unopened = numChests - opened;
                    var status = logic.dungeons[id]();
                    var access = (opened < status.min);
                    if (typeof (numChests) !== 'undefined' && unopened !== 0 && (access || settings.predictor == 2)) {

                        if (settings.predictor == 2) {
                            factor = unopened / numChests;
                        } else {
                            factor = (status.max - opened) / numChests;
                        }

                        var count = counts["dungeonChest" + id] / numChests;
                        dungeonChestValues[id] = count;

                        if (id !== "10") {    //ganon's tower has so many chests it unbalances the colour scale, so it is not factored in
                            total += count;
                            max = Math.max(max, count);
                        }

                        dungeonChestColors[id] = opened < status.min ? 1 : opened < status.max ? 3 : 0;
                        dungeonColors[id] = status.boss;
                    }
                });

                stats.clear();
                $.each(chestValues, function (id, count) {
                    var colorVal = Math.min(1, count / max);
                    var color = stats.gradient(colorVal, chestColors[id]);
                    var color2 = stats.gradient(Math.max(0, colorVal * 0.4), chestColors[id]);
                    TweenMax.set("#chest" + id, { backgroundColor: color, color: color2 });
                });

                $.each(dungeonChestValues, function (id, count) {
                    var colorVal = Math.min(1, count / max);
                    var color = stats.gradient(colorVal, dungeonChestColors[id]);
                    var color2 = stats.gradient(Math.max(0, colorVal * 0.4), dungeonChestColors[id]);
                    TweenMax.set("#dungeonChest" + id, { backgroundColor: color, color: color2 });

                    if ((settings.predictor == 2 || dungeonColors[id] == 1) && dungeons[id].completed == false) {
                        color = stats.gradient(colorVal, dungeonColors[id]);
                        color2 = stats.gradient(Math.max(0, colorVal * 0.4), dungeonColors[id]);
                        TweenMax.set("#dungeon" + id, { backgroundColor: color, color: color2 });
                    }

                });

            } else {
                stats.clear();
            }
        }

    },
    gradient: function (val, type) {

        if (type == 0) {
            red = (791.666666666672 * val * val * val) + (- 1462.5 * val * val) + (925.833333333321 * val);
            gre = (595.238095238106 * val * val * val) + (- 514.285714285739 * val * val) + (84.0476190476184 * val);
            blu = (704.761904761893 * val * val * val) + (- 945.714285714275 * val * val) + (370.952380952371 * val);
        } else if (type == 1) {
            red = (641.701574890012 * val * val * val) + (- 601.929049935723 * val * val) + (124.175218895945 * val);
            gre = (-201.117873112472 * val * val) + (443.714553065043 * val);
            blu = (553.452890589906 * val * val * val) + (- 1020.9168880102 * val * val) + (602.442172942296 * val);
        } else if (type == 2) {
            red = (395.833333333339 * val * val * val) + (- 356.25 * val * val) + (55.4166666666661 * val);
            gre = (874.999999999985 * val * val * val) + (- 1167.49999999999 * val * val) + (538.499999999971 * val);
            blu = (967.857142857123 * val * val * val) + (- 1713.92857142855 * val * val) + (944.071428571406 * val);
        } else if (type == 3) {
            red = (217.857142857101 * val * val * val) + (- 698.928571428536 * val * val) + (731.071428571391 * val);
            gre = (-598.809523809556 * val * val * val) + (796.071428571449 * val * val) + (44.7380952380627 * val);
            blu = (533.333333333336 * val * val * val) + (- 489.999999999993 * val * val) + (81.6666666666606 * val);
        } else if (type == 4) {
            red = (572.61904761901 * val * val * val) + (- 1199.6428571428 * val * val) + (882.023809523758 * val);
            gre = (-67.261904761901 * val * val * val) + (291.964285714275 * val * val) + (15.7023809523889 * val);
            blu = (758.333333333336 * val * val * val) + (- 922.500000000007 * val * val) + (274.166666666659 * val);
        } else {
            red = (641.701574890012 * val * val * val) + (- 601.929049935723 * val * val) + (124.175218895945 * val);
            gre = (-201.117873112472 * val * val) + (443.714553065043 * val);
            blu = (553.452890589906 * val * val * val) + (- 1020.9168880102 * val * val) + (602.442172942296 * val);
        }

        red = Math.min(255, Math.max(red, 0));
        gre = Math.min(255, Math.max(gre, 0));
        blu = Math.min(255, Math.max(blu, 0));

        return "rgb(" + red + "," + gre + "," + blu + ")"

    },
    clear: function () {
        TweenMax.set(".chest, .dungeonChest, .dungeon", { clearProps: "backgroundColor, color, borderColor" });
    }
};



