/* content-script.js
* Handles the DOM and network maniuplation for the browser plugin.
* Intercepts the file picker and submit button to communicate with
* the background.js script that encrypts the file for the user.
*/


// Obtain metadata about required elements to parse from the doc
var myPort;
var pgpKey = document.getElementsByName("e2e_plugin_pgp_key")[0].content;
var formNameElement = document.getElementsByName("e2e_plugin_form_name")[0].content;
var fileEncryptElement = document.getElementsByName("e2e_plugin_file_encrypt")[0].content;


// Optionally allow for encrypted messages and extra unencrypted items to send (i.e. csrf tokens)
var stringEncryptList = {};
var extraItemList = {};
var stringEncryptElement = document.getElementsByName("e2e_plugin_string_encrypt");
var extraItemElement = document.getElementsByName("e2e_plugin_extra_items");

var tmpList = stringEncryptElement[0].content.split(',');
for(var i = 0; i < tmpList.length; i++) {
    stringEncryptList[tmpList[i]] = document.getElementsByName(tmpList[i])[0];
}

tmpList = extraItemElement[0].content.split(',');
for(var i = 0; i < tmpList.length; i++) {
    extraItemList[tmpList[i]] = document.getElementsByName(tmpList[i])[0];
}


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
    var blob = new Blob([context_input]);
    var formData = new FormData();

    formData.append(fileEncryptElement, blob);

    for(key in extraItemList) {
        formData.append(key, extraItemList[key].value);
    }

    for(key in stringEncryptList) {
        formData.append(key, stringEncryptList[key].value);
    }

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
var inputElement = document.getElementsByName(fileEncryptElement)[0];
inputElement.addEventListener("change", readSingleFile, false);
myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.onMessage.addListener(function(m) {
    receiveEncryptedFile(m);
})
myPort.postMessage({public_key : pgpKey})


// Suppresses the submit button on the form
var submitForm = document.getElementById(formNameElement);
submitForm.addEventListener('submit', event => {
    event.preventDefault();
    submitFile();
});
