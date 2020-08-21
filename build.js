const webfontsGenerator = require('webfonts-generator');
const fs                = require('fs');
const util              = require('util');
const path              = require('path');
const readdir           = util.promisify(fs.readdir);

(async function () {
    const svgDir = path.resolve('.', 'svg');
    const files = (await readdir(svgDir)).map(file => path.resolve('./svg', file));
    webfontsGenerator({
        files: files,
        fontName: 'icons',
        dest: 'font/',
        fontHeight: 1000,
        fontWeight: 1000,
        css: false,
    }, function (error) {
        if (error) {
            console.log('Fail!', error);
        } else {
            console.log('Done!');
        }
    })
})()