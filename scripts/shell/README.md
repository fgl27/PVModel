**Shell scripts**

This folder contains the project shell scripts:<br>

- [http-server.sh](https://github.com/fgl27/PVModel/blob/master/scripts/shell/http-server.sh) used to start http local server to test the app when developing
- [jshint.sh](https://github.com/fgl27/PVModel/blob/master/scripts/shell/jshint.sh) used to analysis the app JavaScript code for error
- [page_maker.sh](https://github.com/fgl27/PVModel/blob/master/scripts/shell/page_maker.sh) used to generate the web app from the [src](https://github.com/fgl27/PVModel/tree/master/page) files, this will use all the dependencies bellow.


Those script use the following Node dependencies:<br>

- [crass - A CSS minification, pretty printing, and general utility library written in JS](https://github.com/mattbasta/crass)
- [HTMLMinifier - is a highly configurable, well-tested, JavaScript-based HTML minifier](https://github.com/kangax/html-minifier)
- [http-server - is a simple, zero-configuration command-line http server](https://github.com/http-party/http-server)
- [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
- [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)
