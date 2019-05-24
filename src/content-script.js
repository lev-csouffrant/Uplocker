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

myPort.postMessage({csrf_token : csrfElement.value});

inputElement.addEventListener("change", readSingleFile, false);
