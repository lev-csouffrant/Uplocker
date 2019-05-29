/* background.js
* Listens for commands from content-script.js and asynchronously encrypts
* the user's file using openpgp.js glue found in encrypt-file.js
*/


var encryptedFile;
var receivedFile = false;
var publicKey = "";
var portFromCS;


// Prevent script from returning before encryption finishes
function checkIfEncryptFinished() {
    if(encryptedFile) {
        portFromCS.postMessage(encryptedFile.buffer, [encryptedFile.buffer]);
        return true;
    } else {
        return false;
    }
}


// Set up the listener to the content script:
// Submits file if sent by the user and waits for the encryption to complete
// Receive public key, receive strings and file to encrypt
function connected(p) {
    portFromCS = p;
    portFromCS.onMessage.addListener(function(m) {
        if (m.hasOwnProperty("submit")){
            if(receivedFile) {
                var timeout = setInterval(function()
                                          { if(checkIfEncryptFinished()) {
                                              clearInterval(timeout);
                                              isFinished = true; } }, 1000);
            } else {
                portFromCS.postMessage("");
            }
        } else if (m.hasOwnProperty("public_key")) {
            publicKey = m["public_key"];
            receivedFile = false;
            loadPublicKey(publicKey);
        } else if (m.hasOwnProperty("encrypt_string")) {
            encryptElementString(m["string_name"],m["encrypt_string"]);
        } else {
            receivedFile = true;
            setupAndEncrypt(m);
        }
    });
}
browser.runtime.onConnect.addListener(connected);


// Encrypt the provided string and return to the content script
function encryptElementString(stringName, plaintextString) {
    encryptString(plaintextString).then(function(result) {
        portFromCS.postMessage({name : stringName, encrypted_string : result});
    });
}


// Kick off the file encryption process with openpgp.js
// File is compressed first to reduce bandwidth for user
function setupAndEncrypt(contextInput) {
    inputFile = new Uint8Array(contextInput);
    var compressed = pako.deflate(inputFile);
    encryptFile(compressed).then(function(result) {
        encryptedFile = result;
    });
}
