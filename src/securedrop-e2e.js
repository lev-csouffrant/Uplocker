
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        encryptContents(contents);
    };
    reader.readAsArrayBuffer(file);
}


function encryptContents(contents) {
    var element = document.getElementById('encrypted-content');
    console.log("Contents" + contents);
    var uint8View = new Uint8Array(contents);
    console.log("uint8View contents: " + uint8View);
    stuff = encryptFile(uint8View);
    console.log("Encrypted bytes" + stuff);
}
function displayContents(contents) {
    var element = document.getElementById('file-content2');


}

testEncryptandDecrypt();

//const inputElement = document.getElementById("file-input2");
//inputElement.addEventListener("change", readSingleFile, false);


