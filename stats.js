
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
                items.glove.val == 0 || !entry ? "glove" : "",
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



            }
        });

    },
    find: function (elem) {

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

                $.each(chests, function (id, chest) {
                    status = logic.chests[id]();
                    access = (status == 1 || status == 2 || status == true);
                    if (chest.opened == false && (access || settings.predictor == 2)) {
                        chestValues[id] = counts["chest" + id];
                        total += counts["chest" + id];
                        max = Math.max(max, counts["chest" + id]);
                        chestColors[id] = access ? 1 : 0;
                    }
                });

                $.each(dungeons, function (id, dungeon) {
                    var numChests = dungeon["chests" + settings.keyMode];
                    var opened = dungeon.openChests;
                    var unopened = numChests - opened;
                    var status = logic.dungeons[id]();
                    var access = (opened < status.max);
                    if (typeof (numChests) !== 'undefined' && unopened !== 0 && (access || settings.predictor == 2)) {

                        if (settings.predictor == 2) {
                            factor = unopened / numChests;
                        } else {
                            factor = (status.max - opened) / numChests;
                        }

                        dungeonChestValues[id] = counts["dungeonChest" + id] * factor;

                        if (id !== "10") {    //ganon's tower has so many chests it unbalances the colour scale, so it is not factored in
                            total += counts["dungeonChest" + id] * factor;
                            max = Math.max(max, counts["dungeonChest" + id] * factor);
                        }

                        dungeonChestColors[id] = access ? 1 : 0;
                    }
                });

                stats.clear();
                $.each(chestValues, function (id, count) {
                    var colorVal = Math.min(1, count / max);
                    var color = stats.gradient(colorVal, chestColors[id]);
                    var color2 = stats.gradient(Math.max(0, colorVal * 0.4), chestColors[id]);
                    TweenMax.set("#chest" + id, { backgroundColor: color, color: color2, borderColor: color2 });
                });

                $.each(dungeonChestValues, function (id, count) {
                    var colorVal = Math.min(1, count / max);
                    var color = stats.gradient(colorVal, dungeonChestColors[id]);
                    var color2 = stats.gradient(Math.max(0, colorVal * 0.4), dungeonChestColors[id]);
                    TweenMax.set("#dungeonChest" + id + ", #dungeon" + id, { backgroundColor: color, color: color2, borderColor: color2 });

                });

            }
        }

    },
    gradient: function (val, type) {

        if (type == 0) {
            red = (-387.075818330793 * val * val) + (637.014219325006 * val);
            gre = (256.077255279893 * val * val) + (- 83.7053166106298 * val);
            blu = (43.2254406911161 * val * val) + (61.0596304472031 * val);
        } else {
            red = (-4.02672545029319 * val * val) + (4.04491753044072 * val);
            gre = (-140.5183119897 * val * val) + (392.427282551262 * val);
            blu = (-394.986173915069 * val * val) + (562.928864435022 * val);
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



