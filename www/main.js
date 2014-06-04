// Scripts
var _bg = document.getElementById('bg'),
    _pomodoro = document.getElementById('pomodoro'),
    _worktime = document.getElementById('worktime'),
    _btnToggle = document.getElementById('btnToggle'),
    _btnReset = document.getElementById('btnReset'),
    interval, freetime = 0, sessions = 0, pomodoro = 0,
    worktime = 0, working = false, pendulo = false;

/* Intel native bridge is available */
var onDeviceReady=function(){
//hide splash screen
intel.xdk.device.hideSplashScreen();
};
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

_btnToggle.addEventListener('click', function (e) {
    if (!working) {
        pomodoro = (25 * 60) + 1;
        sessions += 1;
        working = true;
        _btnToggle.className = 'btnToggleOn';
        _btnToggle.innerHTML = 'Stop!';
        // Alerta de início
        AppMobi.notification.vibrate(800);
    } else {
        freetime = 0;
        working = false;
        _btnToggle.className = 'btnToggleOff';
        _btnToggle.innerHTML = 'Start!';
    }
});

_btnReset.addEventListener('click', function (e) {
    worktime = 0;
    sessions = 1;
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
        _worktime.innerHTML = timeFormat(worktime);
    }
}

function clock() {
    if (working) {
        pomodoro -= 1;
        worktime += 1 / 60;
        if (pomodoro < 0) {
            freetime = 0;
            working = false;
            _btnToggle.className = 'btnToggleOff';
            _btnToggle.innerHTML = 'Start!';
            // Alerta de término
            AppMobi.notification.beep(3);
            setTimeout(function () { AppMobi.notification.beep(3); }, 600);
            AppMobi.notification.vibrate(2200);
        }
    } else {
        freetime += 1;
    }
    pendulo = !pendulo;
    output();
}

interval = window.setInterval(clock, 1000);

