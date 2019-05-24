var myPort = browser.runtime.connect({name:"port-from-cs"});

var long_str = "AAAAAAAAA"
var uInt8Array = new Uint8Array(1024 * 1024 * 32);
for (var i = 0; i < uInt8Array.length; ++i) {
    uInt8Array[i] = 0x41;
}
myPort.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);
//myPort.postMessage({greeting: long_str});

myPort.onMessage.addListener(function(m) {
    console.log("In content script, received message from background script: ");
    console.log(m);
});

document.body.addEventListener("click", function() {
    myPort.postMessage({greeting: "they clicked the page!"});
});
