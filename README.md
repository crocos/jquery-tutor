jquery-tutor [![Build Status](https://travis-ci.org/crocos/jquery-tutor.png?branch=master)](https://travis-ci.org/crocos/jquery-tutor)
============

**EXPERIMENTAL**

Currently not yet released.


Installation
------------

Include script *after* the jQuery library.

    <link rel="stylesheet" type="text/css" href="dist/jquery.tutor.min.css">
    <script src="dist/jquery.tutor.min.js"></script>

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). GitHub is not a CDN.


Usage
-----

```javascript
$(function() {
  $.tutor({
    steps: [
      {
        target: '.selector',
        message: 'Step 1: Push the button.'
      },
      function() {
        alert('Step 2: Click "OK"');
      },
      function(dfd) {
        // async callback
        setTimeout(function() {
          alert('Step 3: Hi.')
        }, 1500);

        return dfd.promise();
      },
      function() {
        // `$.ajax` returns *Deferred Object*.
        return $.ajax({
          // ...
        });
      },
      {
        target: '.selector',
        message: 'That\'s all. Enjoy!'
      }
    ]
  });
});
```


Licensing
---------

Released under the BSD License http://opensource.org/licenses/BSD-3-Clause

Copyright (c) 2013 Crocos Inc., All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the *Crocos Inc.* nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
