// Testiranje
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log("window.onerror")

    var data = {
        message: msg,
        scriptUrl: url,
        lineNumber: lineNo,
        columnNumber: columnNo,
        errorObject: JSON.stringify(error),
        timestamp: Date.now()
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:1337/api/log", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
};
