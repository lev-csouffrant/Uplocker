/*var pubkey =
`-----BEGIN PGP PUBLIC KEY BLOCK-----
-----END PGP PUBLIC KEY BLOCK-----`;
*/

var pubkey =
`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: BCPG C# v1.6.1.0

mQENBFzd7DoBCADehz+DG39YNnPXQqkEuznShqeNGbPxkPYjeQ2mz/EF047r0Nr4
NqUZ/hkGgQqX+o95nC3ckPCHB/nbRl4ebT+UXr8ewmPiFCbnmULcYtsSB2gC7KmH
YHxp2WBA9Eqc65X9VgJ6iUlJ4KOSHxMD9wOJ35wpmQkIu8wFWgfs3RZ2WYsTjLar
3NpelH5IUcnMM1XEPjQCslF39tt0bqp42Fy2wYT7j9wPDNbuGA098Y+oKVTIhllL
1k61zN+MM+xbulRjqFEJEKwevWdiiHC8r2bQMneQECOirx2u9Ivbm9T+YC3AnodG
HagRf1yjfDjqxK746iJD3YEBNcnyf+Kh8NdvABEBAAG0AIkBHAQQAQIABgUCXN3s
OgAKCRAvBtQ+EdEqN9orB/0cJN7fZ7xu9jo/mwjbtxq3yMlo0P/VViYzwNEokfU3
bpV7mPkdq3o5dXTRHOyepWaZDGO6XmsulP9mtNqMQfdYC0xpfEkcmqTviiLgGfrv
zawWn7q+rousHuHaxEv0rwIaf2OoBXxzsPEF3afWWA6nz0gmtv/fmFaHdAhC+d9k
C17hnBgga9YCVq/Q2pEeRXyWC7OrhKIfl7Vj/8Vf2Uto4ZH3RFmfdVUNPtNt4m/5
    +Ed2CTR2ur4KujQc1cjSoA2fZxzHi43DRJuxXgpGrn/EdWLDlajDyLZrUyHCyTwi
PM3umaFmNHixaWbF8OZcyrfNegwbJS3tN4C0Gv9HLQJ6
    =RnMS
-----END PGP PUBLIC KEY BLOCK-----`;

var privkey =
`-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: BCPG C# v1.6.1.0

lQOsBFzd7DoBCADehz+DG39YNnPXQqkEuznShqeNGbPxkPYjeQ2mz/EF047r0Nr4
NqUZ/hkGgQqX+o95nC3ckPCHB/nbRl4ebT+UXr8ewmPiFCbnmULcYtsSB2gC7KmH
YHxp2WBA9Eqc65X9VgJ6iUlJ4KOSHxMD9wOJ35wpmQkIu8wFWgfs3RZ2WYsTjLar
3NpelH5IUcnMM1XEPjQCslF39tt0bqp42Fy2wYT7j9wPDNbuGA098Y+oKVTIhllL
1k61zN+MM+xbulRjqFEJEKwevWdiiHC8r2bQMneQECOirx2u9Ivbm9T+YC3AnodG
HagRf1yjfDjqxK746iJD3YEBNcnyf+Kh8NdvABEBAAH/AwMCEVAaMxnHct9ga3zo
MIFUhYOr/NRi4Vn5IWc0ePKFCeECifI0hcuPLqqHDcvQED6J70Fv+wm3PLakChRq
D+WjPvNrmrWgTeDGld/sAiJAJS7bQESIOvq4KNuzAkGjcvuzDzV2UdLqS8A56Fmw
R/9UhE6RPGpzA1JuLDjOgWJraNBDw0k3CXO45+WGIsGsWJIEVK89cXfsx4gQZTHB
o+v3a8ABeNpyXAXk9w08c5g6HyVJfTI23Sq6mF6NMJilU3XYnSKVConrVQmixhkP
zqt2Bs3v9yabnBKMU4OGBUGJAGg79DFZH3jiggO5x1QIerx1pNGDkxixbdfOVNLS
z6nfQddem/oB+1D0QV7xzgab69XVuYlqeqn9Z2ZIMBIOsYIup5a04SdPB7l+kng7
lBtflr9T0+2eA77/Z5cP6EvgCk2ZJd/ldJL5sa1LzJNSogKUDkoJUUx7c91cwq/m
uC+Pe4icij4CkI0Aw9FpkX1jyZkZGcUcj8IQlf3Ip6A/pOQEMkcocEiUgOU1m5MP
NO7N6Hi8aPt1uMp3q9qexm+m5PMHTWRxXcMALp55kFFfUnWeAwzm9jo+So4IEEj7
JUlumBPYDwKU5P9M3Z3Fiek7qxKy3OnTAJuBS30TaG3Vpn7hBzmWwxBFHVnuQDMt
ZxT7lyETsDjOuh+9XU/Cy1QdrxVWOuOtr2g2rjHz7uPvkDOnx9lTimXrWmUZVJqy
o9KIr7IGIZnmsQ2bmypipT5O7FFGc3X+sGLcWtNuPPuse4G7EpTal41NexRQbzc/
ahcSyOzVFcMQyhDY6xp55QZ8R9KHdC5o4dYd3LcoJwn7yBL1pCL6UMtMy5WBIEI9
eO7pEGYpSpu6cSx5b/i/+DEPm3i/JubVIayskjA1TrQAiQEcBBABAgAGBQJc3ew6
AAoJEC8G1D4R0So32isH/Rwk3t9nvG72Oj+bCNu3GrfIyWjQ/9VWJjPA0SiR9Tdu
lXuY+R2rejl1dNEc7J6lZpkMY7peay6U/2a02oxB91gLTGl8SRyapO+KIuAZ+u/N
rBafur6ui6we4drES/SvAhp/Y6gFfHOw8QXdp9ZYDqfPSCa2/9+YVod0CEL532QL
XuGcGCBr1gJWr9DakR5FfJYLs6uEoh+XtWP/xV/ZS2jhkfdEWZ91VQ0+023ib/n4
R3YJNHa6vgq6NBzVyNKgDZ9nHMeLjcNEm7FeCkauf8R1YsOVqMPItmtTIcLJPCI8
ze6ZoWY0eLFpZsXw5lzKt816DBslLe03gLQa/0ctAno=
=nlMP
-----END PGP PRIVATE KEY BLOCK-----`;


/*
// For now we are using the default key from openpgpjs
var pubkey =
  ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
  'Version: GnuPG v2.0.19 (GNU/Linux)',
  '',
  'mI0EUmEvTgEEANyWtQQMOybQ9JltDqmaX0WnNPJeLILIM36sw6zL0nfTQ5zXSS3+',
  'fIF6P29lJFxpblWk02PSID5zX/DYU9/zjM2xPO8Oa4xo0cVTOTLj++Ri5mtr//f5',
  'GLsIXxFrBJhD/ghFsL3Op0GXOeLJ9A5bsOn8th7x6JucNKuaRB6bQbSPABEBAAG0',
  'JFRlc3QgTWNUZXN0aW5ndG9uIDx0ZXN0QGV4YW1wbGUuY29tPoi5BBMBAgAjBQJS',
  'YS9OAhsvBwsJCAcDAgEGFQgCCQoLBBYCAwECHgECF4AACgkQSmNhOk1uQJQwDAP6',
  'AgrTyqkRlJVqz2pb46TfbDM2TDF7o9CBnBzIGoxBhlRwpqALz7z2kxBDmwpQa+ki',
  'Bq3jZN/UosY9y8bhwMAlnrDY9jP1gdCo+H0sD48CdXybblNwaYpwqC8VSpDdTndf',
  '9j2wE/weihGp/DAdy/2kyBCaiOY1sjhUfJ1GogF49rC4jQRSYS9OAQQA6R/PtBFa',
  'JaT4jq10yqASk4sqwVMsc6HcifM5lSdxzExFP74naUMMyEsKHP53QxTF0Grqusag',
  'Qg/ZtgT0CN1HUM152y7ACOdp1giKjpMzOTQClqCoclyvWOFB+L/SwGEIJf7LSCEr',
  'woBuJifJc8xAVr0XX0JthoW+uP91eTQ3XpsAEQEAAYkBPQQYAQIACQUCUmEvTgIb',
  'LgCoCRBKY2E6TW5AlJ0gBBkBAgAGBQJSYS9OAAoJEOCE90RsICyXuqIEANmmiRCA',
  'SF7YK7PvFkieJNwzeK0V3F2lGX+uu6Y3Q/Zxdtwc4xR+me/CSBmsURyXTO29OWhP',
  'GLszPH9zSJU9BdDi6v0yNprmFPX/1Ng0Abn/sCkwetvjxC1YIvTLFwtUL/7v6NS2',
  'bZpsUxRTg9+cSrMWWSNjiY9qUKajm1tuzPDZXAUEAMNmAN3xXN/Kjyvj2OK2ck0X',
  'W748sl/tc3qiKPMJ+0AkMF7Pjhmh9nxqE9+QCEl7qinFqqBLjuzgUhBU4QlwX1GD',
  'AtNTq6ihLMD5v1d82ZC7tNatdlDMGWnIdvEMCv2GZcuIqDQ9rXWs49e7tq1NncLY',
  'hz3tYjKhoFTKEIq3y3Pp',
  '=h/aX',
  '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

var privkey =
  ['-----BEGIN PGP PRIVATE KEY BLOCK-----',
  'Version: GnuPG v2.0.19 (GNU/Linux)',
  '',
  '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',
  '=lw5e',
   '-----END PGP PRIVATE KEY BLOCK-----'].join('\n');
*/
const passphrase = 'hello world';

// Takes a Uint8Array encoded file and returns it encrypted as an Uint8Array
// Right now we are encrypting file blobs, we want to look into using streams.
async function encryptFile(input_file)
{
    var encrypted, options;
    await openpgp.initWorker({ path:'openpgp.worker.js' });

    options = {
        //message: openpgp.message.fromBinary(input_file),
        message: openpgp.message.fromText("test"), //openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])),
        //publicKeys: (await openpgp.key.readArmored(pubkey)).keys,
        passwords: ['secret'],
        armor: false
    };

    return openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
        return encrypted;
    });
}

async function decryptFile(encrypted)
{
    await openpgp.initWorker({ path:'openpgp.worker.js' });

    const options = {
        message: await openpgp.message.fromBinary(encrypted),    // parse armored message
        //publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional)
        //privateKeys: (await openpgp.key.readArmored(privkey)).keys,                                 // for decryption
        //sessionKeys: { data:encrypted, algorithm:'rsa_encrypt_sign' },
        passwords: ['secret'],
        armor: false
    };

    return openpgp.decrypt(options).then(plaintext => {
        console.log(plaintext);
        return plaintext.data; // 'Hello, World!'
    });
}

function loadPublicKey(public_key) {
    pubkey = public_key;
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

encryptFile(new Uint8Array([0x01, 0x01, 0x01])).then(function(result) {
    console.log(buf2hex(result.buffer));
    console.log(result);
    return result;
}).then(function(result) {
    decryptFile(result).then(function(plaintext) {
        console.log(plaintext);
        console.log(buf2hex(plaintext.buffer));
    });
});
