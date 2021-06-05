
fs = require('fs');
//var Beautifier = require('node-js-beautify');

async function mWriteFile(path, text) {

    fs.writeFile(path, text, function(err) {
        if (err) return console.log(err);
    });

}

function mReadFile(path) {

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {

            console.log(err);

        } else console.log(path + ' OK');

        data = data.replaceAll('"', '').replaceAll(',', '.').replaceAll('\t', ',').replaceAll('\n', '],[');
        data = 'const obj_regiao = "[[' + data.substring(0, data.length - 2) + ']";';
        //let b = new Beautifier();

        mWriteFile(
            './obj.js',
            data//b.beautify_js(data, {})
        );
    });

}

mReadFile(
    './obj.txt'
);
