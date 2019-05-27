# securedrop-e2e-browser-plugin
Browser Plugin Prototype for E2E in Securedrop

Currently supports encrypting a file in Securedrop with a hardcoded PGP key.

## TODO: ##
* Load keys from hidden form element.
* Support more generic forms (is that possible to detect CSRF tokens arbitrarily?)
* Clean up code a bit further, i.e. measuring performance and writing more tests
* Look into gzip? compression before encryption
* The message field needs encrypted as well

## Tests worried about: ##
* Asynchronous encryption can lead to funky UX that's not handled if submit is
clicked before test is completed
* Files might eat up 2-4x memory than the original size

Credits:
Icon made by Pixelmeetup from www.flaticon.com
