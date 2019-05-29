# PGP E2E Encryption Browser Plugin
Browser Plugin Prototype for E2E Encryption

Currently supports encrypting files in websites with a PGP key. Can only work
with websites that contain the required tags embedded in the page described
below, as well as forms that only submit a single file.

This code is licensed under GNU Affero General Public License v3, but includes
libraries with other licenses as defined in LICENSE-3RD-PARTY

## How To Use: ##
To install the plugin, open up Firefox and visit about:debugging. From here you
can click "Load Temporary add-on" and load the manifest.json file.

To support the plugin on the server you need to provide a few HTML tags (such as
meta tags) with the proper name and content pairs. Currently the tags supported
are:

* e2e_plugin_pgp_key : The public PGP key to encrypt with
* e2e_plugin_form_name : The name of the form to intercept
* e2e_plugin_file_encrypt : The name of the element for the filepicker
* e2e_plugin_extra_items : Additional form elements that need to be submitted
(such as CSRF tokens)
* e2e_plugin_string_encrypt : Additional form elements that need to be
submitted as encrypted strings

As an example of how to support this in Securedrop (The project that motivated
this extension), add the following code to lookup.html (the PGP key needs to be
provided as a render argument in Flask):

```
<meta name="e2e_plugin_pgp_key" content = "{{ pgp_key }}">
<meta name="e2e_plugin_form_name" content = "upload">
<meta name="e2e_plugin_file_encrypt" content = "fh">
<meta name="e2e_plugin_extra_items" content = "csrf_token">
<meta name="e2e_plugin_string_encrypt" content = "msg">
```

## TODO: ##
* Clean up code a bit further, i.e. measuring performance and writing more tests
* Asynchronous encryption can lead to UX requirements that's not handled if
submit is clicked before test is completed. This should notify the user
"file still encrypting" or something. The best idea might be to have the plugin
popup saying "file is currently encrypting"

## Tests worried about: ##
* Files might eat up 2-4x memory than the original size because they are
transferred to background and back. We attempted to make these transferable
objects which hopefully passed by reference
* Need to weigh if time + memory to compress outweighs the benefit of
saving bandwidth

## Credits: ##

* Icon made by Pixelmeetup from www.flaticon.com
* Encryption using Openpgpjs library
* Compression using Pako library
