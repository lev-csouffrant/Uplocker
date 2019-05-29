/* content-script.js
* Handles the DOM and network maniuplation for the browser plugin.
* Intercepts the file picker and submit button to communicate with
* the background.js script that encrypts the file for the user.
*/


// Obtain metadata about required elements to parse from the doc
var myPort;
var pgpKey;
var formNameElement;
var fileEncryptElement;


// Optionally allow for encrypted messages and extra unencrypted items to send (i.e. csrf tokens)
var encryptedStrings;
var stringEncryptList;
var extraItemList;
var stringEncryptElement;
var extraItemElement;


// Reads the document to set up the plugin's state
// This function is called after every form submission
function initializeState() {
    pgpKey = document.getElementsByName("e2e_plugin_pgp_key")[0].content;
    formNameElement = document.getElementsByName("e2e_plugin_form_name")[0].content;
    fileEncryptElement = document.getElementsByName("e2e_plugin_file_encrypt")[0].content;

    encryptedStrings = {};
    stringEncryptList = {};
    extraItemList = {};
    stringEncryptElement = document.getElementsByName("e2e_plugin_string_encrypt");
    extraItemElement = document.getElementsByName("e2e_plugin_extra_items");

    tmpList = stringEncryptElement[0].content.split(',');
    for(var i = 0; i < tmpList.length; i++) {
        stringEncryptList[tmpList[i]] = document.getElementsByName(tmpList[i])[0];
    }

    tmpList = extraItemElement[0].content.split(',');
    for(var i = 0; i < tmpList.length; i++) {
        extraItemList[tmpList[i]] = document.getElementsByName(tmpList[i])[0];
    }

    // Set up the document listeners
    var inputElement = document.getElementsByName(fileEncryptElement)[0];
    inputElement.addEventListener("change", readSingleFile, false);
    myPort = browser.runtime.connect({name:"port-from-cs"});
    myPort.onMessage.addListener(function(m) {
        if(m.hasOwnProperty("encrypted_string")) {
            encryptedStrings[m["name"]] = m["encrypted_string"];
        } else {
            receiveEncryptedFile(m);
        }
    });
    myPort.postMessage({public_key : pgpKey})

    // Suppresses the submit button on the form
    var submitForm = document.getElementById(formNameElement);
    submitForm.addEventListener('submit', event => {
        event.preventDefault();
        for(key in stringEncryptList) {
            if(stringEncryptList[key].value) {
                myPort.postMessage({string_name : key, encrypt_string : stringEncryptList[key].value});
            } else {
                encryptedStrings[key] = "";
            }
        }
        submitFile();
    });
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


// When all the strings are returned encrypted, we are finished
function checkIfFinished() {
    return Object.keys(encryptedStrings).length == Object.keys(stringEncryptList).length;
}


// Signals to the background to grab encrypted file
function submitFile() {
    // Wait for strings to finish encrypting
    var timeout = setInterval(function()
                              { if(checkIfFinished()) { clearInterval(timeout);
                                                        isFinished = true; } }, 100);
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
    initializeState();
}


// Retrieves the encrypted file and sends to the server
function receiveEncryptedFile(context_input) {
    var blob = new Blob([context_input]);
    var formData = new FormData();

    if(context_input) {
        formData.append(fileEncryptElement, blob);
    }

    for(key in extraItemList) {
        formData.append(key, extraItemList[key].value);
    }

    for(key in encryptedStrings) {
        formData.append(key, encryptedStrings[key]);
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


// Begin parsing the document
initializeState();
