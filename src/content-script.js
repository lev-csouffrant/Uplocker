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



const inputElement = document.getElementsByName("fh")[0];
const csrfElement = document.getElementsByName("csrf_token")[0];
var pageUrl = window.location.href;
pageUrl = pageUrl.slice(0,pageUrl.lastIndexOf('/'));

myPort.postMessage({csrf_token : csrfElement.value});
myPort.postMessage({url : pageUrl })
inputElement.addEventListener("change", readSingleFile, false);
