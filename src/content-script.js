var myPort = browser.runtime.connect({name:"port-from-cs"});


//myPort.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);
//myPort.postMessage({greeting: long_str});


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

// TODO: getElementsByName returns a list. Redo with type and listen on all input elements.



var file;

function sendEncryptedFile(e) {
    e.preventDefault();
    console.log("sending encrypted file");
    var uploadUrl = pageUrl + '/submit';

    console.log(uploadUrl);
    var formData = new FormData();
    console.log("after formdata")
    var blob = new Blob(["BBBBBBB"]);
    console.log(blob);
    formData.append("csrf_token", csrfElement.value);
    formData.append("fh", blob);
    formData.append("msg", "");

    console.log("befoerXMLHTTPRequest");
    var xhr = new content.XMLHttpRequest();
    console.log("Sending file: " + file);
    xhr.open('POST', '/submit');
    xhr.send(formData);
    console.log("after send");
    return result;
}

function receiveEncryptedFile(context_input) {
    console.log("received encrypted file: " + context_input);
    file = context_input;
}

const inputElement = document.getElementsByName("fh")[0];
const csrfElement = document.getElementsByName("csrf_token")[0];
var pageUrl = window.location.href;
pageUrl = pageUrl.slice(0,pageUrl.lastIndexOf('/'));

myPort.postMessage({csrf_token : csrfElement.value});
myPort.postMessage({url : pageUrl });
inputElement.addEventListener("change", readSingleFile, false);

const submitElement = document.getElementById("submit-doc-button");
submitElement.addEventListener("click", sendEncryptedFile, false);


myPort.onMessage.addListener(receiveEncryptedFile);

