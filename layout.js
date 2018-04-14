


function popout() {

	console.log($("#totalCover").width());

	width = $("#totalCover").width() + 40 + ((settings.mapAlign == 1) ? ($("#totalCover").height() / 2) : 0);
	height = $("#totalCover").height() + 40 + ((settings.mapAlign == 2) ? ($("#totalCover").width() / 2) : 0);

	console.log(width + " " + height)

	open('index.html',
		'',
		'width=' + width + ',height=' + height + ',titlebar=0,menubar=0,toolbar=0,scrollbars=0,resizable=0'
	);

}






settings = {
	open: false,
	toggle: function () {//function that opens and closes the settings box
		settings.open = !settings.open;

		if (settings.open) {
			TweenMax.to("#settingsTab", 0.5, { bottom: -270, ease: Elastic.easeOut });
			TweenMax.to("#settingsTab", 0.5, { backgroundColor: "#111", ease: Power4.easeOut });
		} else {
			TweenMax.to("#settingsTab", 0.3, { bottom: -495, ease: Back.easeIn });
			TweenMax.to("#settingsTab", 0.5, { backgroundColor: "rgba(17,17,17,0)", ease: Power4.easeOut });
		}
	},
	getCookie: function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length === 2) { return parts.pop().split(";").shift(); }
	},
	applyCookie: function () {
		//reads the user's cookie and returns it as a settings object
		savedSettings = (typeof (settings.getCookie('settings')) !== 'undefined') ? JSON.parse(settings.getCookie('settings')) : {};

		//applies each setting from the cookie to the radio buttons
		$.each(savedSettings, function (k, v) {
			$('input:radio[name=' + k + ']:nth(' + v + ')').attr('checked', true);
		});

		settings.apply(true);
	},
	apply: function (reset) {

		settings.keyMode = $("input[name='keyMode']:checked").val();
		settings.layout = $("input[name='layout']:checked").val();
		settings.border = $("input[name='border']:checked").val();
		settings.iconSet = $("input[name='iconSet']:checked").val();
		settings.mapAlign = $("input[name='mapAlign']:checked").val();
		settings.combineFetch = $("input[name='combineFetch']:checked").val();
		settings.dungeonDisp = $("input[name='dungeonDisp']:checked").val();
		settings.openMode = $("input[name='openMode']:checked").val();
		settings.timerMode = $("input[name='timerMode']:checked").val();
		settings.predictor = $("input[name='predictor']:checked").val();

		document.cookie = "settings=" + JSON.stringify(settings) + "; expires=Sat, 26 Dec 2025 12:00:00 UTC; path=/";

		if (settings.combineFetch == 1) {
			$('.showCombined').css({ 'display': 'none' });
			$('.hideCombined').css({ 'display': 'inline' });
		} else {
			$('.showCombined').css({ 'display': 'inline' });
			$('.hideCombined').css({ 'display': 'none' });
		}

		if (settings.dungeonDisp == 1) {
			$('.dispHeads').css({ 'display': 'none' });
			$('.dispPrizes').css({ 'display': 'inline' });
		} else {
			$('.dispHeads').css({ 'display': 'inline' });
			$('.dispPrizes').css({ 'display': 'none' });
		}


		//applies the chosen icon images
		$('.icon').css({ 'background-image': ("url('images/grid" + settings.iconSet + ".png')") });




		//goes through the layout object and applies the values for each element, according to the settings chosen
		$.each(layout.positions[settings.layout].all, function (k, v) {
			if (typeof (v.props !== 'undefined')) { TweenMax.set(v.elem, v.props); }
			if (settings.border == 0) { TweenMax.set(v.elem, v.borderless); }
		});

		$.each(layout.positions[settings.layout][settings.keyMode], function (k, v) {
			if (typeof (v.props !== 'undefined')) { TweenMax.set(v.elem, v.props); }
			if (settings.border == 0) { TweenMax.set(v.elem, v.borderless); }
		});


		//applies the chosen border settings to the tracker divs

		if (settings.border == 4) {
			$("#items").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderThinG.png) 20 round' });
			$("#gear").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderThinR.png) 20 round' });
			$("#dungeons").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderThinY.png) 20 round' });
			$("#timer").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderThinB.png) 20 round' });
			TweenMax.set(".trackerTitle", { opacity: 1, 'background-image': "url('images/title2.png')", x: 0, y: 0 });
		} else if (settings.border == 3) {
			$(".tracker").css({ 'border': '28px solid transparent', 'border-image': 'url(images/borderText.png) 28 round' });
			TweenMax.set('.icon, #timerWrap', { x: "-=8", y: "-=8" });
			TweenMax.set(".trackerTitle", { opacity: 0, x: 0, y: 0 });
			if (settings.layout == 4) { TweenMax.set('#dungeons .icon,#gear .icon', { x: "+=8", y: "+=8" }); }
		} else if (settings.border == 2) {
			$("#items").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderG.png) 20 round' });
			$("#gear").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderR.png) 20 round' });
			$("#dungeons").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderY.png) 20 round' });
			$("#timer").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderB.png) 20 round' });
			TweenMax.set(".trackerTitle", { opacity: 1, 'background-image': "url('images/title2.png')", x: 0, y: 0 });
			TweenMax.set("#timerWrap", { scaleY: 1 });
		} else if (settings.border == 1) {
			$(".tracker").css({ 'border': '20px solid transparent', 'border-image': 'url(images/borderSimp.png) 20 round' });
			TweenMax.set(".trackerTitle", { opacity: 1, 'background-image': "url('images/title1.png')", x: "-12", y: "-4" });

			if (settings.layout == "2") {
				TweenMax.set("#timerWrap", { scaleY: 1.1 });
			} else {
				TweenMax.set("#timerWrap", { scaleX: 1.15, scaleY: 1.15 });
			}

		} else {
			$(".tracker").css({ 'border': 'solid 1px transparent', 'border-image': 'none' });
			TweenMax.set('.icon', { x: "+=16" });
			TweenMax.set(".trackerTitle", { opacity: 0 });
		}

		if (settings.layout == 4) {
			TweenMax.set("#dungeons, #gear", { "border-width": 0 });
		}

		TweenMax.set("#trackerBox", { 'display': 'inline' });



		if (settings.timerMode == 1) {
			TweenMax.set("#timer", { display: 'inline' });
			TweenMax.set("#items,#gear,#dungeons", { y: "+=132" });
			TweenMax.set("#totalCover", { height: "+=132" });

		} else {
			TweenMax.set("#timer", { display: 'none' });
		}

		//sizes the maps to fit the chosen layout
		layout.sizeMap(settings.mapAlign);

		map.placeMiniChests();
		$.each(dungeons, function (id, dungeon) {
			dungeons[id].openChests = Math.min(dungeons[id].openChests, dungeons[id]["chests" + settings.keyMode]);
		});


		logic.apply();
	}
}























layout = {
	positions: {	//a big object that transforms the layout based on the different options the user can select
		0: { //Square-ish Layout. Relatively Compact. Default
			all: [
				{ elem: ".icon,.tracker", props: { x: 0, y: 0 } }, //resets all icons
				{ elem: "#gear", props: { width: 176, height: 312 }, borderless: { x: "-=32", y: "-=4" } },
				{ elem: "#items", props: { width: 372, height: 312 }, borderless: { x: "-=12", y: "-=0" } },
				{ elem: ".keyShop", props: { display: 'none' } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'none' } },
				{ elem: ".trackerTitle", props: { display: 'inline' } },
				{ elem: "#timer", props: { width: 552, height: 128 } },
				{ elem: "#timerWrap", props: { x: 0, y: 0, width: 552, "margin-left": 0, scaleX: 1, scaleY: 1 } },
			],
			0: [ //Regular
				{ elem: "#totalCover", props: { width: 570, height: 540 }, borderless: { width: 520, height: 450 } },
				{ elem: "#dungeons", props: { width: 552, height: 208 }, borderless: { x: "-=24", y: "-=48" } },
				{ elem: ".stuff0", props: { x: 144, y: 4 } },
				{ elem: ".stuff1", props: { x: 212, y: 4 } },
				{ elem: ".stuff2", props: { x: 280, y: 4 } },
				{ elem: ".stuff3", props: { x: 8, y: 80 } },
				{ elem: ".stuff4", props: { x: 76, y: 80 } },
				{ elem: ".stuff5", props: { x: 144, y: 80 } },
				{ elem: ".stuff6", props: { x: 212, y: 80 } },
				{ elem: ".stuff7", props: { x: 280, y: 80 } },
				{ elem: ".stuff8", props: { x: 348, y: 80 } },
				{ elem: ".stuff9", props: { x: 416, y: 80 } },
				{ elem: ".stuff10", props: { x: 416, y: 4 } },
				{ elem: ".stuff11", props: { x: 8, y: 4 } },
			],
			1: [//keysanity
				{ elem: "#totalCover", props: { width: 570, height: 610 }, borderless: { width: 520, height: 510 } },
				{ elem: "#dungeons", props: { width: 552, height: 276 }, borderless: { x: "-=24", y: "-=48" } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'inline' } },
				{ elem: ".key", props: { left: 0, top: 72 } },
				{ elem: ".bigKey", props: { left: 36, top: 72 } },
				{ elem: "#bigKey0", props: { left: 18, top: 72 } },
				{ elem: "#key11", props: { left: 36, top: 72 } },
				{ elem: "#key12", props: { left: -4, top: 72 } },
				{ elem: ".stuff0", props: { x: 144, y: 4 } },
				{ elem: ".stuff1", props: { x: 212, y: 4 } },
				{ elem: ".stuff2", props: { x: 280, y: 4 } },
				{ elem: ".stuff3", props: { x: 8, y: 112 } },
				{ elem: ".stuff4", props: { x: 76, y: 112 } },
				{ elem: ".stuff5", props: { x: 144, y: 112 } },
				{ elem: ".stuff6", props: { x: 212, y: 112 } },
				{ elem: ".stuff7", props: { x: 280, y: 112 } },
				{ elem: ".stuff8", props: { x: 348, y: 112 } },
				{ elem: ".stuff9", props: { x: 416, y: 112 } },
				{ elem: ".stuff10", props: { x: 416, y: 4 } },
				{ elem: ".stuff11", props: { x: 8, y: 4 } },
				{ elem: "#keyAny", props: { display: 'none' } },
			],
			2: [ //Retro
				{ elem: ".keyShop", props: { display: 'inline' } },
				{ elem: "#totalCover", props: { width: 570, height: 540 }, borderless: { width: 520, height: 450 } },
				{ elem: "#dungeons", props: { width: 552, height: 208 }, borderless: { x: "-=24", y: "-=48" } },
				{ elem: "#dungeonChest11,#keyAny", props: { display: 'inline' } },
				{ elem: ".stuff0", props: { x: 144, y: 4 } },
				{ elem: ".stuff1", props: { x: 212, y: 4 } },
				{ elem: ".stuff2", props: { x: 280, y: 4 } },
				{ elem: ".stuff3", props: { x: 8, y: 80 } },
				{ elem: ".stuff4", props: { x: 76, y: 80 } },
				{ elem: ".stuff5", props: { x: 144, y: 80 } },
				{ elem: ".stuff6", props: { x: 212, y: 80 } },
				{ elem: ".stuff7", props: { x: 280, y: 80 } },
				{ elem: ".stuff8", props: { x: 348, y: 80 } },
				{ elem: ".stuff9", props: { x: 416, y: 80 } },
				{ elem: ".stuff10", props: { x: 416, y: 4 } },
				{ elem: ".stuff11", props: { x: 8, y: 4 } },
				{ elem: "#keyAny", props: { x: 356, y: -48, left: 0, top: 72 } }
			],
		},
		1: { //Arranges dungeons by their map positions; a little less economical
			all: [
				{ elem: ".icon,.tracker", props: { x: 0, y: 0 } }, //resets all icons
				{ elem: "#gear", props: { width: 176, height: 312 }, borderless: { x: "-=32", y: "-=4" } },
				{ elem: "#items", props: { width: 372, height: 312 }, borderless: { x: "-=12", y: "-=0" } },
				{ elem: ".keyShop", props: { display: 'none' } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'none' } },
				{ elem: ".trackerTitle", props: { display: 'inline' } },
				{ elem: "#timer", props: { width: 552, height: 128 } },
				{ elem: "#timerWrap", props: { x: 0, y: 0, width: 552, "margin-left": 0, scaleX: 1, scaleY: 1 } },
			],
			0: [ //Regular
				{ elem: "#totalCover", props: { width: 570, height: 610 }, borderless: { width: 520, height: 520 } },
				{ elem: "#dungeons", props: { width: 552, height: 280 }, borderless: { x: "-=20", y: "-=52" } },
				{ elem: ".stuff0", props: { x: 84, y: 64 } },
				{ elem: ".stuff1", props: { x: 4, y: 92 } },
				{ elem: ".stuff2", props: { x: 20, y: 16 } },
				{ elem: ".stuff3", props: { x: 416, y: 64 } },
				{ elem: ".stuff4", props: { x: 336, y: 152 } },
				{ elem: ".stuff5", props: { x: 304, y: -4 } },
				{ elem: ".stuff6", props: { x: 256, y: 64 } },
				{ elem: ".stuff7", props: { x: 408, y: 132 } },
				{ elem: ".stuff8", props: { x: 268, y: 132 } },
				{ elem: ".stuff9", props: { x: 372, y: -4 } },
				{ elem: ".stuff10", props: { x: 172, y: 152 } },
				{ elem: ".stuff11", props: { x: 96, y: 152 } },
			],
			1: [//keysanity
				{ elem: "#totalCover", props: { width: 570, height: 650 }, borderless: { width: 530, height: 560 } },
				{ elem: "#dungeons", props: { width: 552, height: 320 }, borderless: { x: "-=8", y: "-=52" } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'inline' } },
				{ elem: ".key", props: { left: 0, top: 72 } },
				{ elem: ".bigKey", props: { left: 36, top: 72 } },
				{ elem: "#bigKey0", props: { left: 18, top: 72 } },
				{ elem: "#key3,#key9,#key12,#key10", props: { left: 68, top: 0 } },
				{ elem: "#bigKey3,#bigKey9,#key11,#bigKey10", props: { left: 68, top: 36 } },
				{ elem: "#key2,#key5,#key6", props: { left: -36, top: 0 } },
				{ elem: "#bigKey2,#bigKey5,#bigKey6", props: { left: -36, top: 36 } },
				{ elem: ".stuff0", props: { x: 96, y: 52 } },
				{ elem: ".stuff1", props: { x: 16, y: 80 } },
				{ elem: ".stuff2", props: { x: 32, y: 4 } },
				{ elem: ".stuff3", props: { x: 388, y: 68 } },
				{ elem: ".stuff4", props: { x: 308, y: 159 } },
				{ elem: ".stuff5", props: { x: 276, y: 0 } },
				{ elem: ".stuff6", props: { x: 228, y: 68 } },
				{ elem: ".stuff7", props: { x: 380, y: 136 } },
				{ elem: ".stuff8", props: { x: 240, y: 136 } },
				{ elem: ".stuff9", props: { x: 346, y: 0 } },
				{ elem: ".stuff10", props: { x: 116, y: 192 } },
				{ elem: ".stuff11", props: { x: 0, y: 192 } },
				{ elem: "#keyAny", props: { display: 'none' } },
			],
			2: [ //Retro
				{ elem: ".keyShop", props: { display: 'inline' } },
				{ elem: "#totalCover", props: { width: 570, height: 610 }, borderless: { width: 520, height: 520 } },
				{ elem: "#dungeons", props: { width: 552, height: 280 }, borderless: { x: "-=20", y: "-=52" } },
				{ elem: "#dungeonChest11,#keyAny", props: { display: 'inline' } },
				{ elem: ".stuff0", props: { x: 84, y: 64 } },
				{ elem: ".stuff1", props: { x: 4, y: 92 } },
				{ elem: ".stuff2", props: { x: 20, y: 16 } },
				{ elem: ".stuff3", props: { x: 416, y: 64 } },
				{ elem: ".stuff4", props: { x: 336, y: 152 } },
				{ elem: ".stuff5", props: { x: 304, y: -4 } },
				{ elem: ".stuff6", props: { x: 256, y: 64 } },
				{ elem: ".stuff7", props: { x: 408, y: 132 } },
				{ elem: ".stuff8", props: { x: 268, y: 132 } },
				{ elem: ".stuff9", props: { x: 372, y: -4 } },
				{ elem: ".stuff10", props: { x: 172, y: 152 } },
				{ elem: ".stuff11", props: { x: 96, y: 152 } },
				{ elem: "#keyAny", props: { x: 20, y: 112, left: 0, top: 72 } }
			],
		},
		2: { //Taller, narrower layout
			all: [
				{ elem: ".icon,.tracker", props: { x: 0, y: 0 } }, //resets all icons
				{ elem: "#items", props: { width: 372, height: 312 }, borderless: { x: "-=12", y: "-=0" } },
				{ elem: "#gear", props: { x: -376, y: 316, width: 372, height: 192 }, borderless: { y: "-=56", x: "-=12" } },
				{ elem: "#boots,#glove,#flippers,#halfmagic", props: { y: -128, x: 128 } },
				{ elem: "#gear .icon", props: { y: "+=4" } },
				{ elem: "#sword,#mail", props: { x: "+=8" } },
				{ elem: "#shield,#pearl", props: { x: "+=24" } },
				{ elem: "#boots,#flippers", props: { x: "+=40" } },
				{ elem: "#glove,#halfmagic", props: { x: "+=56" } },
				{ elem: "#boots", props: { y: "-=4" } },
				{ elem: "#pearl", props: { y: "+=4" } },
				{ elem: ".keyShop", props: { display: 'none' } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'none' } },
				{ elem: ".trackerTitle", props: { display: 'inline' } },
				{ elem: "#timer", props: { width: 372, height: 128 } },
				{ elem: "#timerWrap", props: { x: 0, y: 0, width: 372, "margin-left": -90, 'transform-origin': '180px 48px', scaleX: 0.9, scaleY: 1 } },
			],
			0: [ //Regular
				{ elem: "#totalCover", props: { width: 390, height: 810 }, borderless: { width: 390, height: 660 } },
				{ elem: "#dungeons", props: { width: 372, height: 288, y: 196 }, borderless: { x: "-=16", y: "-=112" } },
				{ elem: ".stuff0", props: { x: 4, y: 4 } },
				{ elem: ".stuff1", props: { x: 84, y: 4 } },
				{ elem: ".stuff2", props: { x: 164, y: 4 } },
				{ elem: ".stuff3", props: { x: 244, y: 4 } },
				{ elem: ".stuff4", props: { x: 4, y: 80 } },
				{ elem: ".stuff5", props: { x: 84, y: 80 } },
				{ elem: ".stuff6", props: { x: 164, y: 80 } },
				{ elem: ".stuff7", props: { x: 244, y: 80 } },
				{ elem: ".stuff8", props: { x: 4, y: 156 } },
				{ elem: ".stuff9", props: { x: 84, y: 156 } },
				{ elem: ".stuff10", props: { x: 244, y: 156 } },
				{ elem: ".stuff11", props: { x: 164, y: 156 } },
			],
			1: [//keysanity
				{ elem: "#totalCover", props: { width: 390, height: 910 }, borderless: { width: 390, height: 760 } },
				{ elem: "#dungeons", props: { width: 372, height: 388, y: 196 }, borderless: { x: "-=16", y: "-=112" } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'inline' } },
				{ elem: ".key", props: { left: 0, top: 72 } },
				{ elem: ".bigKey", props: { left: 36, top: 72 } },
				{ elem: "#bigKey0", props: { left: 18, top: 72 } },
				{ elem: "#key11", props: { left: 36, top: 72 } },
				{ elem: "#key12", props: { left: -4, top: 72 } },
				{ elem: ".stuff0", props: { x: 4, y: 4 } },
				{ elem: ".stuff1", props: { x: 84, y: 4 } },
				{ elem: ".stuff2", props: { x: 164, y: 4 } },
				{ elem: ".stuff3", props: { x: 244, y: 4 } },
				{ elem: ".stuff4", props: { x: 4, y: 112 } },
				{ elem: ".stuff5", props: { x: 84, y: 112 } },
				{ elem: ".stuff6", props: { x: 164, y: 112 } },
				{ elem: ".stuff7", props: { x: 244, y: 112 } },
				{ elem: ".stuff8", props: { x: 4, y: 220 } },
				{ elem: ".stuff9", props: { x: 84, y: 220 } },
				{ elem: ".stuff10", props: { x: 244, y: 220 } },
				{ elem: ".stuff11", props: { x: 164, y: 220 } },
				{ elem: "#keyAny", props: { display: 'none' } },
			],
			2: [  //Retro
				{ elem: ".keyShop", props: { display: 'inline' } },
				{ elem: "#totalCover", props: { width: 390, height: 810 }, borderless: { width: 390, height: 660 } },
				{ elem: "#dungeons", props: { width: 372, height: 288, y: 196 }, borderless: { x: "-=16", y: "-=112" } },
				{ elem: "#dungeonChest11,#keyAny", props: { display: 'inline' } },
				{ elem: ".stuff0", props: { x: 4, y: 4 } },
				{ elem: ".stuff1", props: { x: 84, y: 4 } },
				{ elem: ".stuff2", props: { x: 164, y: 4 } },
				{ elem: ".stuff3", props: { x: 244, y: 4 } },
				{ elem: ".stuff4", props: { x: 4, y: 80 } },
				{ elem: ".stuff5", props: { x: 84, y: 80 } },
				{ elem: ".stuff6", props: { x: 164, y: 80 } },
				{ elem: ".stuff7", props: { x: 244, y: 80 } },
				{ elem: ".stuff8", props: { x: 4, y: 156 } },
				{ elem: ".stuff9", props: { x: 84, y: 156 } },
				{ elem: ".stuff10", props: { x: -5000, y: 4 } },
				{ elem: ".stuff11", props: { x: 244, y: 156 } },
				{ elem: "#keyAny", props: { x: 180, y: 104, left: 0, top: 72 } }
			],
		},
		3: { // Wide Layout
			all: [
				{ elem: ".icon,.tracker", props: { x: 0, y: 0 } }, //resets all icons
				{ elem: "#items", props: { width: 372, height: 312 }, borderless: { x: "-=12", y: "-=0" } },
				{ elem: "#gear", props: { width: 176, height: 312 }, borderless: { x: "-=56", y: "-=4" } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'none' } },
				{ elem: ".keyShop", props: { display: 'none' } },
				{ elem: ".trackerTitle", props: { display: 'inline' } },
				{ elem: "#timer", props: { width: 552, height: 128 } },
				{ elem: "#timerWrap", props: { x: 0, y: 0, width: 552, "margin-left": 0, scaleX: 1, scaleY: 1 } },
			],
			0: [ //Regular
				{ elem: "#totalCover", props: { width: 920, height: 330 }, borderless: { width: 810, height: 290 } },
				{ elem: "#dungeons", props: { x: 556, y: -316, width: 352, height: 312 }, borderless: { x: "-=100", y: "-=0" } },
				{ elem: ".stuff0", props: { x: 4, y: 12 } },
				{ elem: ".stuff1", props: { x: 76, y: 12 } },
				{ elem: ".stuff2", props: { x: 148, y: 12 } },
				{ elem: ".stuff3", props: { x: 220, y: 12 } },
				{ elem: ".stuff4", props: { x: 4, y: 92 } },
				{ elem: ".stuff5", props: { x: 76, y: 92 } },
				{ elem: ".stuff6", props: { x: 148, y: 92 } },
				{ elem: ".stuff7", props: { x: 220, y: 92 } },
				{ elem: ".stuff8", props: { x: 4, y: 172 } },
				{ elem: ".stuff9", props: { x: 76, y: 172 } },
				{ elem: ".stuff10", props: { x: 220, y: 172 } },
				{ elem: ".stuff11", props: { x: 148, y: 172 } },
			],
			1: [//keysanity
				{ elem: "#totalCover", props: { width: 1070, height: 330 }, borderless: { width: 950, height: 290 } },
				{ elem: "#dungeons", props: { x: 556, y: -316, width: 500, height: 312 }, borderless: { x: "-=100", y: "-=0" } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'inline' } },
				{ elem: ".key", props: { left: 68, top: 0 } },
				{ elem: ".bigKey", props: { left: 68, top: 36 } },
				{ elem: "#bigKey0", props: { left: 68, top: 18 } },
				{ elem: "#key11", props: { left: 68, top: 36 } },
				{ elem: ".stuff0", props: { x: 0, y: 12 } },
				{ elem: ".stuff1", props: { x: 112, y: 12 } },
				{ elem: ".stuff2", props: { x: 224, y: 12 } },
				{ elem: ".stuff3", props: { x: 336, y: 12 } },
				{ elem: ".stuff4", props: { x: 0, y: 92 } },
				{ elem: ".stuff5", props: { x: 112, y: 92 } },
				{ elem: ".stuff6", props: { x: 224, y: 92 } },
				{ elem: ".stuff7", props: { x: 336, y: 92 } },
				{ elem: ".stuff8", props: { x: 0, y: 172 } },
				{ elem: ".stuff9", props: { x: 112, y: 172 } },
				{ elem: ".stuff10", props: { x: 336, y: 172 } },
				{ elem: ".stuff11", props: { x: 224, y: 172 } },
				{ elem: "#keyAny", props: { display: 'none' } },
			],
			2: [  //Retro
				{ elem: ".keyShop", props: { display: 'inline' } },
				{ elem: "#totalCover", props: { width: 920, height: 330 }, borderless: { width: 810, height: 290 } },
				{ elem: "#dungeons", props: { x: 556, y: -316, width: 352, height: 312 }, borderless: { x: "-=100", y: "-=0" } },
				{ elem: "#dungeonChest11,#keyAny", props: { display: 'inline' } },
				{ elem: ".stuff0", props: { x: 4, y: 12 } },
				{ elem: ".stuff1", props: { x: 76, y: 12 } },
				{ elem: ".stuff2", props: { x: 148, y: 12 } },
				{ elem: ".stuff3", props: { x: 220, y: 12 } },
				{ elem: ".stuff4", props: { x: 4, y: 92 } },
				{ elem: ".stuff5", props: { x: 76, y: 92 } },
				{ elem: ".stuff6", props: { x: 148, y: 92 } },
				{ elem: ".stuff7", props: { x: 220, y: 92 } },
				{ elem: ".stuff8", props: { x: 4, y: 172 } },
				{ elem: ".stuff9", props: { x: 76, y: 172 } },
				{ elem: ".stuff10", props: { x: -5000, y: 4 } },
				{ elem: ".stuff11", props: { x: 220, y: 172 } },
				{ elem: "#keyAny", props: { x: 164, y: 120, left: 0, top: 72 } }
			],
		},
		4: { //All icons within one frame
			all: [
				{ elem: ".icon,.tracker", props: { x: 0, y: 0 } }, //resets all icons
				{ elem: "#gear", props: { width: 176, height: 312, x: -32, y: 16 }, borderless: { x: "-=32", y: "-=20" } },
				{ elem: "#items", props: { width: 604, height: 384 }, borderless: { x: "-=12", y: "-=0" } },
				{ elem: ".keyShop", props: { display: 'none' } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'none' } },
				{ elem: "#dungeons", props: { width: 0, height: 0, 'border-width': 0, y: -300 } },
				{ elem: ".trackerTitle", props: { display: 'none' } },
				{ elem: "#bow,#firerod,#lamp,#bottle", props: { x: 0 } },
				{ elem: "#boomerang,#icerod,#hammer,#somaria", props: { x: 4 } },
				{ elem: "#hookshot,#bombos,#shovelflute,#flute,#byrna", props: { x: 8 } },
				{ elem: "#bomb,#mushroom,#ether,#net,#shovel,#cape", props: { x: 12 } },
				{ elem: "#mushroompowder,#powder,#quake,#book,#mirror", props: { x: 16 } },
				{ elem: "#sword,#mail,#boots,#flippers", props: { x: 20 } },
				{ elem: "#shield,#pearl,#glove,#halfmagic", props: { x: 24 } },
				{ elem: "#timer", props: { width: 604, height: 128 } },
				{ elem: "#timerWrap", props: { x: 0, y: 0, width: 604, "margin-left": 26, scaleX: 1, scaleY: 1 } },
			],
			0: [ //Regular
				{ elem: "#dungeons", borderless: { x: "-=32", y: "-=16" } },
				{ elem: "#totalCover", props: { width: 620, height: 400 }, borderless: { width: 520, height: 450 } },
				{ elem: ".stuff0", props: { x: 496, y: 24 } },
				{ elem: ".stuff1", props: { x: 496, y: 96 } },
				{ elem: ".stuff2", props: { x: 496, y: 168 } },
				{ elem: ".stuff3", props: { x: 16, y: 260 } },
				{ elem: ".stuff4", props: { x: 84, y: 260 } },
				{ elem: ".stuff5", props: { x: 152, y: 260 } },
				{ elem: ".stuff6", props: { x: 220, y: 260 } },
				{ elem: ".stuff7", props: { x: 288, y: 260 } },
				{ elem: ".stuff8", props: { x: 356, y: 260 } },
				{ elem: ".stuff9", props: { x: 424, y: 260 } },
				{ elem: ".stuff10", props: { x: -5000, y: 4 } },
				{ elem: ".stuff11", props: { x: 496, y: 260 } },
			],
			1: [//keysanity
				{ elem: "#items", props: { width: 636, height: 416 } },
				{ elem: "#totalCover", props: { width: 650, height: 430 }, borderless: { width: 520, height: 510 } },
				{ elem: "#dungeons", borderless: { x: "-=32", y: "-=16" } },
				{ elem: "#dungeonChest11,.key,.bigKey", props: { display: 'inline' } },
				{ elem: ".key", props: { left: 0, top: 72 } },
				{ elem: ".bigKey", props: { left: 36, top: 72 } },
				{ elem: "#bigKey0", props: { left: 68, top: 18 } },
				{ elem: "#bigKey1,#bigKey2,#bigKey10,#key11", props: { left: 68, top: 36 } },
				{ elem: "#key1,#key2,#key10,#key12", props: { left: 68, top: 0 } },
				{ elem: ".stuff0", props: { x: 496, y: 4 } },
				{ elem: ".stuff1", props: { x: 496, y: 76 } },
				{ elem: ".stuff2", props: { x: 496, y: 148 } },
				{ elem: ".stuff3", props: { x: 16, y: 260 } },
				{ elem: ".stuff4", props: { x: 84, y: 260 } },
				{ elem: ".stuff5", props: { x: 152, y: 260 } },
				{ elem: ".stuff6", props: { x: 220, y: 260 } },
				{ elem: ".stuff7", props: { x: 288, y: 260 } },
				{ elem: ".stuff8", props: { x: 356, y: 260 } },
				{ elem: ".stuff9", props: { x: 424, y: 260 } },
				{ elem: ".stuff10", props: { x: 496, y: 292 } },
				{ elem: ".stuff11", props: { x: 496, y: 220 } },
				{ elem: "#keyAny", props: { display: 'none' } },
			],
			2: [ //Retro
				{ elem: ".keyShop", props: { display: 'inline' } },
				{ elem: "#totalCover", props: { width: 620, height: 400 }, borderless: { width: 520, height: 450 } },
				{ elem: "#dungeons", borderless: { x: "-=32", y: "-=16" } },
				{ elem: "#dungeonChest11,#keyAny", props: { display: 'inline' } },
				{ elem: ".stuff0", props: { x: 496, y: 44 } },
				{ elem: ".stuff1", props: { x: 496, y: 116 } },
				{ elem: ".stuff2", props: { x: 496, y: 188 } },
				{ elem: ".stuff3", props: { x: 16, y: 260 } },
				{ elem: ".stuff4", props: { x: 84, y: 260 } },
				{ elem: ".stuff5", props: { x: 152, y: 260 } },
				{ elem: ".stuff6", props: { x: 220, y: 260 } },
				{ elem: ".stuff7", props: { x: 288, y: 260 } },
				{ elem: ".stuff8", props: { x: 356, y: 260 } },
				{ elem: ".stuff9", props: { x: 424, y: 260 } },
				{ elem: ".stuff10", props: { x: -5000, y: 4 } },
				{ elem: ".stuff11", props: { x: 496, y: 260 } },
				{ elem: "#keyAny", props: { x: 512, y: -64, left: 0, top: 72 } }
			],
		},
	},
	sizeMap: function (mapAlign) {

		if (mapAlign == 0) {
			TweenMax.set("#mapBox", { 'display': 'none' });
		} else {
			TweenMax.set("#mapBox", { 'display': 'inline' });



			//sets up the layout of the two maps and their container
			if (mapAlign == 1) {
				TweenMax.set("#mapBox", { width: 650, height: 1300 });
				TweenMax.set("#mapDW", { left: 0, top: 650 });
			} else {
				TweenMax.set("#mapBox", { width: 1300, height: 650 });
				TweenMax.set("#mapDW", { left: 650, top: 0 });
			}

			//calculates the scale needed to fit map container into top right
			TRwid = $(window).width() - $("#totalCover").width();
			TRhei = $(window).height();
			TRscale = Math.min(TRwid / $("#mapBox").width(), TRhei / $("#mapBox").height());

			//calculates the scale needed to fit map container into bottom left
			BLhei = $(window).height() - $("#totalCover").height() - 38;
			BLwid = $(window).width();
			BLscale = Math.min(BLwid / $("#mapBox").width(), BLhei / $("#mapBox").height());



			//uses whichever layout allows the maps to be bigger
			if (TRscale >= BLscale) {
				TweenMax.set("#mapBox", { 'transform-origin': '100% 0%', scale: TRscale, left: 'auto', right: 0, top: 0, bottom: 'auto' });
			} else {
				TweenMax.set("#mapBox", { 'transform-origin': '0% 100%', scale: BLscale, left: 0, right: 'auto', top: 'auto', bottom: 38 });
			}
		}

	},
};













