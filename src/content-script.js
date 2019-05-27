/* content-script.js
* Handles the DOM and network maniuplation for the browser plugin.
* Intercepts the file picker and submit button to communicate with
* the background.js script that encrypts the file for the user.
*/


// Opens a file reader to pick a file for encryption
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var uInt8Array = new Uint8Array(e.target.result);
        myPort.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);
    };

    reader.readAsArrayBuffer(file);
}


// Signals to the background to grab encrypted file
function submitFile() {
    myPort.postMessage({submit : "" });
}


// Grabs the response and overwrites the document
function readBody(xhr) {
    var data;

    if (!xhr.responseType || xhr.responseType === "text") {
        data = xhr.responseText;
    } else if (xhr.responseType === "document") {
        data = xhr.responseXML;
    } else {
        data = xhr.response;
    }

    document.body.innerHTML = data;
}


// Retrieves the encrypted file and sends to the server
function receiveEncryptedFile(context_input) {
    var msgElement = document.getElementsByName("msg")[0];
    var csrfElement = document.getElementsByName("csrf_token")[0];
    var blob = new Blob([context_input]);

    var formData = new FormData();
    formData.append("csrf_token", csrfElement.value);
    formData.append("msg", msgElement.value);
    formData.append("fh", blob);

    var xhr = new content.XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            readBody(xhr);
        }
    };
    xhr.open('POST', '/submit');
    xhr.send(formData);
}


// Set up the document listeners
var inputElement = document.getElementsByName("fh")[0];
inputElement.addEventListener("change", readSingleFile, false);
var myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.onMessage.addListener(function(m) {
    receiveEncryptedFile(m);
})


// Suppresses the submit button on the form
var myForm = document.getElementById('upload');
myForm.addEventListener('submit', event => {
    event.preventDefault();
    submitFile();
});
