

startValue = moment.duration(0);
digits = { 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }



function checkTime() {

    displayTime = startValue.clone().add(moment().diff(startTime));

    var milliseconds = displayTime.milliseconds();
    var seconds = displayTime.seconds();
    var minutes = displayTime.minutes();
    var hours = displayTime.hours();


    if (milliseconds >= 100) {
        scrollDigit(2, milliseconds.toString()[0]);
        scrollDigit(1, milliseconds.toString()[1]);
    } else if (milliseconds >= 10) {
        scrollDigit(2, 0);
        scrollDigit(1, milliseconds.toString()[0]);
    } else {
        scrollDigit(2, 0);
        scrollDigit(1, 0);
    }

    if (seconds >= 10) {
        scrollDigit(4, seconds.toString()[0]);
        scrollDigit(3, seconds.toString()[1]);
    } else {
        scrollDigit(4, 0);
        scrollDigit(3, seconds);
    }

    if (minutes >= 10) {
        scrollDigit(6, minutes.toString()[0]);
        scrollDigit(5, minutes.toString()[1]);
    } else {
        scrollDigit(6, 0);
        scrollDigit(5, minutes);
    }

    if (hours <= 9) {
        scrollDigit(7, hours);
    }


    fadeDigits();

}




function scrollDigit(digit, num) {

    var elem = "#digit" + digit + " .digits";
    var speed = (digit <= 2) ? 0.05 : 0.5;
    var ease = (digit <= 2) ? Linear.easeNone : Back.easeInOut.config(1.4);

    if (digits[digit] !== num && !TweenMax.isTweening(elem)) {
        if (num == 0) {
            pos = (digit == 6 || digit == 4) ? -600 : -1000;
            TweenMax.to(elem, speed, {
                y: pos, ease: ease, onComplete: function () {
                    TweenMax.set("#digit" + digit + " .digits", { y: 0 });
                }
            });
        } else {
            TweenMax.to(elem, speed, { y: (-100 * num), ease: ease });
        }
    }

    digits[digit] = num;

}


function fadeDigits() {
    var blank = true;
    var blankCount = 0;
    var speed = 0.5;
    for (i = 7; i >= 4; i--) {
        if (digits[i] !== 0) { blank = false; }
        TweenMax.to("#digit" + i, speed, { opacity: (blank ? 0 : 1) });
        TweenMax.to("#colon" + i, speed, { opacity: (blank ? 0 : 1) });
        if (blank) { blankCount++; }
    }

    if (typeof(prevCount) == 'undefined' || prevCount !== blankCount) {
        xOffset = blankCount == 4 ?
            -86.5 :
            blankCount == 3 ?
                -66.5 :
                blankCount == 2 ?
                    -35.5 :
                    blankCount == 1 ?
                        -16.5 :
                        14
            ;



        if (!TweenMax.isTweening("#timerWrap")) {
            TweenMax.to("#timerWrap .timerDigit,.colon", speed, { x: xOffset, ease: Back.easeOut.config(3) });
        }

    }

    prevCount = blankCount;

}

timerPos = 0;
function startTimer() {
    startTime = moment();
    timerUpdate = setInterval(function () { checkTime(); }, 10);
}

function pauseTimer() {
    startValue = displayTime;
    if (typeof (timerUpdate) !== 'undefined') {
        clearInterval(timerUpdate);
    }
}

function resetTimer() {
    var speed = 0.5;
    pauseTimer();
    startValue = moment.duration(0);
    running = false;
    digits = { 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    TweenMax.to(".digits", speed, { y: 0, ease: Back.easeInOut.config(1.4) });
    fadeDigits();
}

running = false;
function toggleTimer() {
    running = !running;
    if (running) { startTimer(); } else { pauseTimer(); }
}


