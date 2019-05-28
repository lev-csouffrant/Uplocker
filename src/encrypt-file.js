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
