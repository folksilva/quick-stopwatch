chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('window.html', {
        'bounds': {
            'width': 150,
            'height': 80
        },
        'frame': 'none',
        'transparentBackground': true,
        'alwaysOnTop': true,
        'resizable': false
    });
});