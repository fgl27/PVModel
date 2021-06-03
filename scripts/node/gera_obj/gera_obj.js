fs = require('fs');
var Beautifier = require('node-js-beautify');

async function mWriteFile(path, text) {

    fs.writeFile(path, text, function(err) {
        if (err) return console.log(err);
    });

}

function mReadFile(path) {

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {

            console.log(err);
            return null;

        } else console.log(path + ' OK');

        data = data.replaceAll(',', '.').replaceAll('\t', ',').replaceAll('\n', '],[');
        data = 'var obj_temp = [[' + data.substring(0, data.length - 2) + '];';
        var b = new Beautifier();

        mWriteFile(
            './obj.js',
            b.beautify_js(data, {})
        );
    });

}

mReadFile(
    './obj.txt'
);
