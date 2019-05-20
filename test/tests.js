function testEncryptandDecrypt() {
    var input_file = new Uint8Array([0x01, 0x01, 0x01]);
    console.log("Encrypting: " + buf2hex(input_file));

    encryptFile(input_file).then(function(result) {
        console.log("Encrypted bytes: " + buf2hex(result.buffer));
        return result;
    }).then(function(result) {
        decryptFile(result).then(function(plaintext) {
            console.log("Plaintext string: " + plaintext);
            var plaintext_array = convertBinaryStringToUint8Array(plaintext);
            console.log("Plaintext bytes: " + buf2hex(plaintext_array));
        });
    });
}
