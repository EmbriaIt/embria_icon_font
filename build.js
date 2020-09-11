const cheerio           = require('cheerio');
const webfontsGenerator = require('webfonts-generator');
const fs                = require('fs');
const util              = require('util');
const path              = require('path');
const readdir           = util.promisify(fs.readdir);
const save              = util.promisify(fs.writeFile);
const remove            = util.promisify(fs.unlink);
const readfile          = util.promisify(fs.readFile);

(async function () {
    const svgDir      = path.resolve('.', 'svg');
    const exampleFile = path.resolve('.', 'example', 'icons.js');
    const files       = (await readdir(svgDir)).map(file => path.resolve('./svg', file));
    let icons         = 'window.icons = [];\n';
    for (const file of files) {
        const fileName      = path.basename(file, path.extname(file));
        icons += `window.icons.push('${fileName}');\n`;
        const content       = await readfile(file);
        const $ = cheerio.load(`<div>${content}</div>`);
        if($('g').length > 0) {
            $('svg').html($('svg').find('path'));
            await remove(file);
            await save(file, $('div').html());
        }
    }
    await save(exampleFile, icons);
    webfontsGenerator({
        files: files,
        fontName: 'icons',
        dest: 'font/',
        fontHeight: 500,
        fontWeight: 500,
        css: false,
        normalize: true,
    }, function (error) {
        if (error) {
            console.log('Fail!', error);
        } else {
            console.log('Done!');
        }
    })
})()