// Scripts
var _bg = document.getElementById('bg'),
    _pomodoro = document.getElementById('pomodoro'),
    _worktime = document.getElementById('worktime'),
    interval, freetime = 0, sessions = 0, pomodoro = 0, 
    worktime = 0, working = false, pendulo = false;

chrome.system.display.getInfo(function (displays) {
    var primaryDisplay, i, wdw = chrome.app.window.current();
    for (i = 0; i < displays.length; i += 1) {
        if (displays[i].isPrimary) {
            primaryDisplay = displays[i];
            break;
        }
    }
    wdw.moveTo(
        primaryDisplay.workArea.width - 150,
        primaryDisplay.workArea.height
    );
    console.log(primaryDisplay.workArea);
});

_pomodoro.addEventListener('click', function (e) {
    if (!working) {
        pomodoro = (25 * 60) + 1;
        sessions += 1;
        working = true;
    } else {
        freetime = 0;
        working = false;
    }
});

_worktime.addEventListener('click', function (e) {
    worktime = 0;
    pomodoro = (25 * 60) + 1;
    sessions = 1;
    working = true;
});


function timeFormat(n) {
    var h, m;
    h = Math.floor(n / 60);
    m = Math.floor(n % 60);
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    return h + ":" + m;
    
}

function output() {
    if (working) {
        if (pomodoro < 90) {
            _pomodoro.className = 'dangertime';
        } else {   
            _pomodoro.className = '';
        }
        _pomodoro.innerHTML = timeFormat(pomodoro);
        _worktime.innerHTML = timeFormat(worktime);
    } else {
        _pomodoro.className = 'freetime';
        _pomodoro.innerHTML = timeFormat(freetime);
    }
}

function clock() {
    if (working) {
        pomodoro -= 1;
        worktime += 1 / 60;
        if (pomodoro < 0) {
            freetime = 0;
            working = false;
        }
    } else {
        freetime += 1;
    }
    pendulo = !pendulo;
    output();
}

interval = window.setInterval(clock, 1000);

