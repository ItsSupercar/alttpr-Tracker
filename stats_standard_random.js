var strStats = "type,id,name,key11,boomerang,bombos,book,bottle,bow,net,byrna,somaria,bigKey1,key1,bigKey0,ether,firerod,flippers,flute,bigKey10,key10,halfmagic,hammer,hookshot,bigKey7,key7,icerod,lamp,cape,mirror,powder,bigKey8,key8,pearl,mushroom,bigKey3,key3,boots,mail,glove,shield,sword,quake,key12,shovel,silver,bigKey5,key5,bigKey4,key4,bigKey6,key6,bigKey2,key2,bigKey9,key9\r\nchest,22,Aginah\'s Cave,0,342,132,155,610,125,106,95,106,0,0,0,123,125,236,205,0,0,101,197,221,0,0,117,277,138,209,99,0,0,394,103,0,0,167,331,598,310,668,153,0,120,194,0,0,0,0,0,0,0,0,0,0\r\nchest,59,Blacksmith,0,366,183,133,698,156,155,126,181,0,0,0,180,179,208,196,0,0,156,136,188,0,0,183,161,155,183,145,0,0,0,174,0,0,161,353,0,439,636,167,0,137,165,0,0,0,0,0,0,0,0,0,0\r\nchest,11,Blind\'s Hideout,0,1743,627,737,3212,711,525,442,645,0,0,0,628,666,1081,1048,0,0,520,1098,1037,0,0,613,1355,699,1069,547,0,0,1939,540,0,0,830,1704,3056,1451,3237,597,0,634,866,0,0,0,0,0,0,0,0,0,0\r\nchest,26,Bombos Tablet,0,371,174,0,762,110,191,165,126,0,0,0,178,111,130,114,0,0,210,96,123,0,0,171,120,182,0,186,0,0,0,200,0,0,167,358,215,623,399,190,0,194,175,0,0,0,0,0,0,0,0,0,0\r\nchest,13,Bottle Merchant,0,333,114,162,637,126,97,81,116,0,0,0,104,131,206,205,0,0,101,202,207,0,0,113,269,152,220,109,0,0,409,141,0,0,157,352,577,269,686,122,0,109,182,0,0,0,0,0,0,0,0,0,0\r\nchest,54,Brewery,0,361,148,147,666,165,155,103,163,0,0,0,155,171,190,163,0,0,145,132,169,0,0,163,177,131,221,155,0,0,0,130,0,0,172,381,341,392,615,152,0,144,175,0,0,0,0,0,0,0,0,0,0\r\nchest,58,Bumper Cave,0,339,190,153,694,143,162,108,154,0,0,0,153,129,164,161,0,0,153,126,160,0,0,167,133,0,177,153,0,0,0,163,0,0,162,339,267,488,637,148,0,159,185,0,0,0,0,0,0,0,0,0,0\r\nchest,55,C-Shaped House,0,336,136,155,654,149,132,94,172,0,0,0,161,164,208,181,0,0,112,140,175,0,0,158,148,122,203,121,0,0,0,125,0,0,186,349,333,390,617,169,0,130,165,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,11,Castle Tower,50000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\r\nchest,51,Catfish,0,304,159,155,689,148,132,109,144,0,0,0,162,158,202,138,0,0,133,139,184,0,0,160,155,143,205,143,0,0,0,143,0,0,160,359,374,410,600,146,0,142,176,0,0,0,0,0,0,0,0,0,0\r\nchest,27,Cave 45,0,363,150,163,669,176,162,143,164,0,0,0,150,150,192,165,0,0,143,132,149,0,0,181,172,151,0,152,0,0,0,157,0,0,172,363,291,472,639,169,0,138,167,0,0,0,0,0,0,0,0,0,0\r\nchest,28,Checkerboard Cave,0,373,185,139,724,141,152,135,184,0,0,0,188,147,144,0,0,0,167,105,145,0,0,157,131,137,0,168,0,0,170,168,0,0,179,367,0,530,708,211,0,178,191,0,0,0,0,0,0,0,0,0,0\r\nchest,56,Chest Game,0,354,165,138,693,165,129,112,170,0,0,0,164,165,217,165,0,0,131,142,182,0,0,149,182,146,219,134,0,0,0,145,0,0,144,347,319,398,677,153,0,139,178,0,0,0,0,0,0,0,0,0,0\r\nchest,9,Chicken House,0,344,121,148,608,143,103,94,139,0,0,0,105,130,209,220,0,0,113,223,222,0,0,123,234,136,211,114,0,0,406,127,0,0,171,374,578,279,664,135,0,108,140,0,0,0,0,0,0,0,0,0,0\r\nchest,31,Desert Ledge,0,336,142,95,696,153,134,119,123,0,0,0,127,143,163,148,0,0,130,161,187,0,0,182,206,120,145,127,0,0,286,131,0,0,159,363,396,395,662,151,0,147,170,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,1,Desert Palace,0,631,461,297,1354,413,386,327,388,25000,25000,0,425,423,498,403,0,0,400,419,484,0,0,429,470,378,436,387,0,0,731,408,0,0,217,588,904,1144,1544,415,0,394,324,0,0,0,0,0,0,0,0,0,0\r\nchest,63,Digging Game,0,386,157,144,666,163,137,111,158,0,0,0,170,170,203,170,0,0,141,138,170,0,0,175,168,124,201,152,0,0,0,134,0,0,165,347,329,395,625,137,0,155,177,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,0,Eastern Palace,0,1043,470,523,1927,411,429,376,468,0,0,25000,505,494,737,681,0,0,394,663,734,0,0,491,608,545,695,436,0,0,1218,415,0,0,639,1021,1839,1286,2167,511,0,441,514,0,0,0,0,0,0,0,0,0,0\r\nchest,41,Ether Tablet,0,351,172,0,748,112,204,146,140,0,0,0,176,111,138,107,0,0,203,102,111,0,0,175,92,165,83,168,0,0,115,210,0,0,135,359,229,594,338,155,0,180,171,0,0,0,0,0,0,0,0,0,0\r\nchest,46,Floating Island,0,359,188,152,707,138,172,139,176,0,0,0,201,172,181,156,0,0,152,141,154,0,0,186,137,146,0,191,0,0,0,134,0,0,176,358,0,546,674,199,0,157,186,0,0,0,0,0,0,0,0,0,0\r\nchest,20,Dam,0,685,245,293,1244,250,192,182,273,0,0,0,216,266,423,411,0,0,211,448,397,0,0,241,527,299,447,238,0,0,801,261,0,0,331,705,1142,562,1357,239,0,226,355,0,0,0,0,0,0,0,0,0,0\r\nchest,33,Flute Spot,0,339,144,143,677,113,134,131,115,0,0,0,152,140,184,157,0,0,150,154,190,0,0,127,192,164,180,155,0,0,221,129,0,0,149,360,364,420,639,136,0,0,182,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,10,Ganon\'s Tower,0,4332,2240,3274,10437,143,4178,3313,68,0,0,0,2353,137,117,664,25000,100000,4244,0,94,0,0,1159,0,3350,475,3899,0,0,0,3956,0,0,1249,4368,0,12500,9782,2209,0,3878,2128,0,0,0,0,0,0,0,0,0,0\r\nchest,18,Graveyard Ledge,0,313,198,146,692,165,158,109,177,0,0,0,165,165,176,173,0,0,135,122,139,0,0,174,154,132,0,152,0,0,0,165,0,0,168,400,295,426,650,181,0,137,171,0,0,0,0,0,0,0,0,0,0\r\nchest,57,Hammer Pegs,0,336,206,128,658,158,144,132,200,0,0,0,205,194,173,176,0,0,164,0,181,0,0,176,170,152,170,197,0,0,0,149,0,0,149,381,0,462,642,185,0,166,186,0,0,0,0,0,0,0,0,0,0\r\nchest,25,Hobo,0,396,135,144,679,149,122,111,134,0,0,0,154,144,0,165,0,0,123,164,184,0,0,149,226,143,199,144,0,0,277,124,0,0,198,361,423,349,679,121,0,124,168,0,0,0,0,0,0,0,0,0,0\r\nchest,49,Hookshot Cave - Bottom Chest,0,388,212,136,683,148,153,129,196,0,0,0,200,199,190,169,0,0,138,136,113,0,0,152,130,141,142,148,0,0,0,147,0,0,136,360,0,475,681,182,0,164,199,0,0,0,0,0,0,0,0,0,0\r\nchest,48,Hookshot Cave,0,1102,581,422,2108,489,465,406,571,0,0,0,531,523,515,432,0,0,454,369,0,0,0,579,393,463,450,493,0,0,0,449,0,0,499,1125,0,1541,2011,583,0,458,536,0,0,0,0,0,0,0,0,0,0\r\nchest,61,Hype Cave,0,1795,819,717,3390,822,651,587,851,0,0,0,784,806,996,874,0,0,626,714,935,0,0,795,852,610,1046,675,0,0,0,659,0,0,800,1845,1727,1914,3105,837,0,652,900,0,0,0,0,0,0,0,0,0,0\r\nchest,37,Hyrule Castle,0,649,276,390,1199,329,237,216,325,0,0,0,332,396,528,540,0,0,251,553,528,0,0,331,710,319,521,296,0,0,1046,309,0,0,389,623,1474,784,1412,312,18730,289,318,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,7,Ice Palace,0,916,833,768,2198,771,798,657,881,0,0,0,961,784,0,806,0,0,874,373,494,25000,50000,940,729,718,814,813,0,0,0,789,0,0,822,938,0,2517,2394,981,0,771,490,0,0,0,0,0,0,0,0,0,0\r\nchest,24,Ice Rod Cave,0,376,160,149,611,113,109,92,133,0,0,0,119,115,203,202,0,0,102,219,227,0,0,119,274,129,238,84,0,0,420,118,0,0,180,348,589,319,698,117,0,112,170,0,0,0,0,0,0,0,0,0,0\r\nchest,8,Kakariko Tavern,0,365,102,144,633,106,111,77,121,0,0,0,115,129,213,198,0,0,100,226,199,0,0,112,262,152,205,108,0,0,413,127,0,0,159,327,595,300,647,128,0,112,165,0,0,0,0,0,0,0,0,0,0\r\nchest,10,Kakariko Well,0,1763,654,733,3167,638,531,451,693,0,0,0,609,627,1033,1025,0,0,492,1091,1065,0,0,594,1254,637,1092,565,0,0,2043,565,0,0,792,1687,2906,1540,3329,608,0,604,888,0,0,0,0,0,0,0,0,0,0\r\nchest,2,King Zora,0,328,154,152,631,143,107,92,128,0,0,0,111,142,180,205,0,0,105,216,201,0,0,135,259,145,190,121,0,0,417,133,0,0,147,366,481,299,659,114,0,110,177,0,0,0,0,0,0,0,0,0,0\r\nchest,7,King\'s Tomb,0,334,171,167,667,130,133,129,138,0,0,0,166,148,172,155,0,0,134,119,153,0,0,163,153,128,162,166,0,0,169,143,0,0,0,388,258,429,632,184,0,138,181,0,0,0,0,0,0,0,0,0,0\r\nchest,32,Lake Hylia Island,0,365,160,132,687,150,169,131,172,0,0,0,194,165,0,147,0,0,149,143,174,0,0,208,137,156,0,148,0,0,0,148,0,0,179,353,307,468,675,197,0,175,169,0,0,0,0,0,0,0,0,0,0\r\nchest,29,Library,0,343,143,164,663,127,141,133,140,0,0,0,144,131,177,184,0,0,137,178,151,0,0,146,193,152,205,134,0,0,267,133,0,0,0,343,412,412,653,159,0,146,149,0,0,0,0,0,0,0,0,0,0\r\nchest,21,Link\'s House,0,359,146,142,614,134,112,90,146,0,0,0,117,160,223,195,0,0,105,195,206,0,0,127,280,133,212,111,0,0,416,146,0,0,156,361,578,306,669,124,0,120,175,0,0,0,0,0,0,0,0,0,0\r\nchest,38,Uncle,0,346,126,153,617,4208,109,4242,4212,0,0,0,127,4118,212,215,0,0,112,4413,222,0,0,116,236,159,193,124,0,0,439,107,0,0,171,353,572,304,1189,137,0,117,171,0,0,0,0,0,0,0,0,0,0\r\nchest,16,Lost Woods Hideout,0,356,124,155,617,151,113,87,133,0,0,0,127,125,212,186,0,0,101,228,227,0,0,120,267,139,206,95,0,0,390,125,0,0,173,359,590,327,590,121,0,103,191,0,0,0,0,0,0,0,0,0,0\r\nchest,17,Lumberjack Tree,0,391,182,168,702,151,161,124,159,0,0,0,146,138,141,124,0,0,156,122,169,0,0,189,0,114,162,180,0,0,178,146,0,0,0,388,302,497,617,169,0,188,183,0,0,0,0,0,0,0,0,0,0\r\nchest,14,Magic Bat,0,336,133,147,673,145,142,114,119,0,0,0,135,123,164,163,0,0,141,109,143,0,0,140,172,138,142,0,0,0,203,137,0,0,166,369,319,468,656,163,0,157,195,0,0,0,0,0,0,0,0,0,0\r\nchest,6,Master Sword Pedestal,0,345,166,178,770,62,220,177,57,0,0,0,164,74,64,98,0,0,208,20,90,0,0,139,20,187,74,194,0,0,4,218,0,0,155,333,77,709,682,170,0,222,185,0,0,0,0,0,0,0,0,0,0\r\nchest,30,Maze Race,0,366,147,148,643,132,101,89,140,0,0,0,118,129,207,193,0,0,114,209,212,0,0,99,247,129,224,94,0,0,372,119,0,0,160,357,560,334,669,91,0,123,191,0,0,0,0,0,0,0,0,0,0\r\nchest,44,Mimic Cave,0,360,162,137,741,187,224,163,0,0,0,0,132,30,163,165,0,0,221,0,146,0,0,265,128,213,0,212,0,0,0,188,0,0,166,358,0,616,689,120,0,207,183,0,0,0,0,0,0,0,0,0,0\r\nchest,23,Mini Moldorm Cave,0,1810,609,750,3283,669,492,443,639,0,0,0,660,639,1031,1018,0,0,478,1086,1053,0,0,662,1323,762,1048,555,0,0,1953,561,0,0,814,1756,2945,1501,3160,637,0,556,917,0,0,0,0,0,0,0,0,0,0\r\nchest,64,Mire Shed,0,704,353,303,1434,339,318,270,360,0,0,0,382,337,372,0,0,0,329,277,351,0,0,372,255,330,339,337,0,0,0,341,0,0,379,677,0,975,1284,376,0,312,371,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,8,Misery Mire,0,576,516,588,1556,595,718,576,491,0,0,0,474,639,565,0,0,0,740,419,538,0,0,772,366,620,542,669,25000,75000,0,691,0,0,554,601,0,2123,1644,533,0,650,292,0,0,0,0,0,0,0,0,0,0\r\nchest,19,Mushroom,0,362,104,147,649,123,96,103,140,0,0,0,120,108,205,223,0,0,104,252,239,0,0,123,261,118,241,99,0,0,423,113,0,0,157,357,587,308,631,120,0,109,193,0,0,0,0,0,0,0,0,0,0\r\nchest,39,Old Man,0,388,149,133,697,154,107,109,132,0,0,0,170,143,196,130,0,0,124,136,209,0,0,162,0,170,203,145,0,0,264,124,0,0,183,380,381,366,681,158,0,147,201,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,3,Palace of Darkness,0,1485,1497,1274,3466,659,1294,1107,1525,0,0,0,1545,1475,1649,1387,0,0,1349,1202,1608,0,0,1548,748,1292,1568,1315,0,0,0,1319,25000,150000,1448,1464,3045,3983,4137,1497,0,1327,749,0,0,0,0,0,0,0,0,0,0\r\nchest,45,Paradox Cave,0,2438,1050,963,4757,992,890,757,1097,0,0,0,1091,1077,1325,902,0,0,836,989,866,0,0,1022,1025,1044,1137,855,0,0,2045,889,0,0,1147,2521,2911,2533,4812,1020,0,930,1208,0,0,0,0,0,0,0,0,0,0\r\nchest,12,Pegasus Rocks,0,364,138,165,678,103,122,110,109,0,0,0,152,123,161,172,0,0,124,168,161,0,0,158,177,143,203,123,0,0,271,136,0,0,0,367,416,406,647,141,0,148,186,0,0,0,0,0,0,0,0,0,0\r\nchest,3,Potion Shop,0,374,138,145,703,116,155,117,132,0,0,0,108,127,173,159,0,0,152,146,176,0,0,136,159,146,168,150,0,0,227,0,0,0,142,369,408,409,634,152,0,138,165,0,0,0,0,0,0,0,0,0,0\r\nchest,60,Purple Chest,0,369,179,153,710,157,149,129,206,0,0,0,167,168,187,194,0,0,171,166,190,0,0,168,171,144,165,156,0,0,0,143,0,0,175,335,0,443,665,182,0,152,160,0,0,0,0,0,0,0,0,0,0\r\nchest,52,Pyramid,0,346,117,160,616,160,109,86,144,0,0,0,126,144,178,160,0,0,117,139,168,0,0,172,169,130,199,122,0,0,262,122,0,0,175,375,359,336,627,167,0,122,175,0,0,0,0,0,0,0,0,0,0\r\nchest,53,Pyramid Fairy,0,728,361,335,1495,203,403,314,204,0,0,0,331,218,223,248,0,0,404,65,224,0,0,323,87,359,244,380,0,0,0,367,0,0,322,708,239,1155,1267,340,0,368,371,0,0,0,0,0,0,0,0,0,0\r\nchest,1,Sahasrahla,0,382,175,150,702,120,158,109,119,0,0,0,173,134,146,152,0,0,164,70,135,0,0,191,82,154,149,165,0,0,72,156,0,0,138,367,212,496,686,169,0,168,150,0,0,0,0,0,0,0,0,0,0\r\nchest,0,Sahasrahla\'s Hut,0,1039,445,478,1980,392,319,281,382,0,0,0,337,370,659,664,0,0,292,663,669,0,0,348,779,435,626,348,0,0,1149,346,0,0,497,1002,1859,916,1939,377,0,338,563,0,0,0,0,0,0,0,0,0,0\r\nchest,34,Sanctuary,0,336,100,140,547,119,90,84,118,0,0,0,99,111,183,182,0,0,75,188,186,0,0,127,230,112,183,94,0,0,353,106,0,0,125,302,528,277,561,110,0,102,152,0,0,0,0,0,0,0,0,0,0\r\nchest,36,Sewers - Dark Cross,0,191,100,127,396,118,87,66,97,0,0,0,110,107,200,180,0,0,77,178,185,0,0,91,221,132,185,103,0,0,368,96,0,0,134,195,499,268,455,115,6270,97,106,0,0,0,0,0,0,0,0,0,0\r\nchest,35,Sewers - Secret Room,0,916,355,377,1669,338,251,248,307,0,0,0,302,350,536,563,0,0,258,560,543,0,0,311,656,368,538,318,0,0,1025,279,0,0,440,935,1516,748,1799,351,0,306,439,0,0,0,0,0,0,0,0,0,0\r\nchest,15,Sick Kid,0,367,145,166,604,125,131,142,133,0,0,0,131,121,187,165,0,0,112,134,155,0,0,131,188,135,154,133,0,0,240,134,0,0,170,328,375,461,658,132,0,142,179,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,5,Skull Woods,0,614,576,478,1340,509,488,404,558,0,0,0,608,376,646,549,0,0,500,465,609,0,0,573,586,456,646,472,0,0,0,470,0,0,573,575,1070,1485,1551,549,0,467,306,25000,75000,0,0,0,0,0,0,0,0\r\nchest,42,Spectacle Rock,0,315,153,123,680,132,150,124,147,0,0,0,150,155,172,135,0,0,126,177,180,0,0,153,124,135,0,144,0,0,253,131,0,0,156,344,399,386,698,141,0,141,196,0,0,0,0,0,0,0,0,0,0\r\nchest,40,Spectacle Rock Cave,0,348,123,151,673,147,123,111,134,0,0,0,153,141,222,123,0,0,114,198,227,0,0,146,132,135,236,113,0,0,349,132,0,0,167,352,454,352,719,137,0,120,188,0,0,0,0,0,0,0,0,0,0\r\nchest,50,Spike Cave,0,377,175,131,695,156,124,113,158,0,0,0,183,165,173,131,0,0,143,0,205,0,0,165,128,133,151,153,0,0,0,114,0,0,155,353,298,425,630,164,0,160,189,0,0,0,0,0,0,0,0,0,0\r\nchest,43,Spiral Cave,0,348,160,139,632,141,113,105,160,0,0,0,161,140,193,123,0,0,115,154,128,0,0,173,146,153,148,119,0,0,281,117,0,0,174,355,393,380,665,153,0,143,172,0,0,0,0,0,0,0,0,0,0\r\nchest,62,Stumpy,0,394,169,155,682,146,136,102,136,0,0,0,158,166,180,197,0,0,119,125,176,0,0,164,148,138,226,118,0,0,0,120,0,0,147,365,345,388,632,158,0,153,171,0,0,0,0,0,0,0,0,0,0\r\nchest,47,Superbunny Cave,0,744,405,271,1391,300,286,304,350,0,0,0,369,378,359,314,0,0,307,281,291,0,0,363,241,259,317,305,0,0,0,336,0,0,310,710,0,904,1311,418,0,293,348,0,0,0,0,0,0,0,0,0,0\r\ndungeonChest,4,Swamp Palace,0,2027,1275,1002,4354,1063,1193,946,1132,0,0,0,1194,1134,0,1052,0,0,1192,100,497,0,0,1347,915,1074,0,1172,0,0,0,1184,0,0,1095,2092,1867,3497,4249,1222,0,1119,1055,0,0,25000,25000,0,0,0,0,0,0\r\ndungeonChest,6,Thieves\' Town,0,1337,830,737,2678,794,742,590,829,0,0,0,900,829,1111,932,0,0,697,617,973,0,0,837,936,705,1118,728,0,0,0,691,0,0,927,1333,1785,2115,2676,852,0,667,659,0,0,0,0,25000,25000,0,0,0,0\r\ndungeonChest,2,Tower of Hera,0,675,425,400,1326,398,377,295,432,0,0,0,435,427,548,389,0,0,407,480,464,0,0,451,429,387,413,398,0,0,853,379,0,0,483,628,1184,1111,1480,424,0,339,344,0,0,0,0,0,0,25000,25000,0,0\r\ndungeonChest,9,Turtle Rock,0,1556,1072,1386,3773,1368,1641,1354,0,0,0,0,1181,252,1247,1299,0,0,1656,0,1142,0,0,1781,592,1405,1045,1569,0,0,0,1568,0,0,1498,1610,0,5023,3986,1137,0,1604,786,0,0,0,0,0,0,0,0,25000,100000\r\nchest,5,Waterfall Fairy,0,716,280,299,1371,264,232,217,296,0,0,0,265,277,0,400,0,0,261,374,422,0,0,301,367,296,383,256,0,0,584,250,0,0,328,714,872,763,1291,284,0,260,329,0,0,0,0,0,0,0,0,0,0\r\nchest,4,Zora\'s Ledge,0,355,133,148,648,138,128,95,134,0,0,0,133,122,0,209,0,0,105,178,188,0,0,141,199,158,199,153,0,0,284,147,0,0,174,361,436,378,626,136,0,117,173,0,0,0,0,0,0,0,0,0,0\r\n";
