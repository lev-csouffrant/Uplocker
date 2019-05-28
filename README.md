# securedrop-e2e-browser-plugin
Browser Plugin Prototype for E2E in Securedrop

Currently supports encrypting files in Securedrop with a PGP key loaded from a form field. In order to do this, modify source_templates/lookup.html to include a hidden element on the "upload" form named "pgp_key" with the public key to encrypt with

## TODO: ##
* Support more generic forms (is that possible to detect CSRF tokens arbitrarily?)
* Clean up code a bit further, i.e. measuring performance and writing more tests
* The message field needs encrypted as well, not sure how that should be handled on the server side

## Tests worried about: ##
* Asynchronous encryption can lead to UX requirements that's not handled if submit is clicked before test is completed. This should notify the user "file still encrypting" or something
* Files might eat up 2-4x memory than the original size because they are transferred to background and back. We attempted to make these transferable objects which hopefully passed by reference
* Need to weigh if time + memory to compress, outweighs the benefit of saving bandwidth

Credits:
Icon made by Pixelmeetup from www.flaticon.com
