/* encrypt-file.js
* This contains the glue for openpgp.js to encrypt a file.
*/


// References to key material to encrypt the file with.
var pubkey =
    `-----BEGIN PGP PUBLIC KEY BLOCK-----
-----END PGP PUBLIC KEY BLOCK-----`;


var privkey =
    `-----BEGIN PGP PRIVATE KEY BLOCK-----
-----END PGP PRIVATE KEY BLOCK-----`;


var passphrase = "";


// Takes a Uint8Array encoded file and returns it encrypted as an Uint8Array
// Right now we are encrypting file blobs, we want to look into using streams.
async function encryptFile(input_file)
{
    var encrypted, options;

    options = {
        message: openpgp.message.fromBinary(input_file),
        publicKeys: (await openpgp.key.readArmored(pubkey)).keys,
        armor: false
    };

    return openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
        return encrypted;
    });
}


// File decryption. This is only here for test purposes.
async function decryptFile(encrypted)
{
    let privKeyObj = (await openpgp.key.readArmored(privkey)).keys[0];
    await privKeyObj.decrypt(passphrase);

    const options = {
        message: await openpgp.message.read(encrypted),    // parse armored message
        privateKeys: privKeyObj,
        armor: false
    };

    return openpgp.decrypt(options).then(plaintext => {
        return plaintext.data;
    });
}

// Helper functions to load the key parameters
function loadPublicKey(public_key) {
    pubkey = public_key;
}


function loadPrivateKey(private_key) {
    privkey = private_key;
}


function loadPassphrase(key_passphrase) {
    passphrase = key_passphrase;
}


// Helper function to print buffers as hex values. This is for testing purposes.
function buf2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x =>
                                    ('00' + x.toString(16)).slice(-2)).join('');
}


// Helper function to convert a string to Uint8Array. This is for testing purposes.
function convertBinaryStringToUint8Array(bStr) {
    var i, len = bStr.length, u8_array = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        u8_array[i] = bStr.charCodeAt(i);
    }
    return u8_array;
}
