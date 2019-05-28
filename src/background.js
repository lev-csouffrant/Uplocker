/* background.js
* Listens for commands from content-script.js and asynchronously encrypts
* the user's file using openpgp.js glue found in encrypt-file.js
*/


// Holds a reference to the encryptedFile which is done asynchronously.
var encryptedFile;


// Set up the listener to the content script
// The two cases are user submitted or user selected a file
function connected(portFromCS) {
    portFromCS.onMessage.addListener(function(m) {
        if (m.hasOwnProperty("submit")){
            portFromCS.postMessage(encryptedFile.buffer, [encryptedFile.buffer]);
        } else if (m.hasOwnProperty("public_key")) {
            public_key = m["public_key"];
        } else{
            setupAndEncrypt(m);
        }
    });
}
browser.runtime.onConnect.addListener(connected);


// Public key is retrieved at page load time
var public_key = "";


// Kick off the file encryption process with openpgp.js
function setupAndEncrypt(context_input) {
    loadPublicKey(public_key);
    input_file = new Uint8Array(context_input);

    encryptFile(input_file).then(function(result) {
        encryptedFile = result;
    });
}
