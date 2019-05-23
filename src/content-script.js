var myPort = browser.runtime.connect({name:"port-from-cs"});

var long_str = "AAAAAAAAA"

myPort.postMessage({greeting: long_str});

myPort.onMessage.addListener(function(m) {
    console.log("In content script, received message from background script: ");
    console.log(m.greeting);
});

document.body.addEventListener("click", function() {
    myPort.postMessage({greeting: "they clicked the page!"});
});

