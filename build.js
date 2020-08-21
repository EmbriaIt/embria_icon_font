const webfontsGenerator = require('webfonts-generator');

webfontsGenerator({
    files: [
        'svg/list.svg',
    ],
    fontName: 'icons',
    dest: 'font/',
    fontHeight: 1000,
    fontWeight: 1000,
    css: false,
}, function(error) {
    if (error) {
        console.log('Fail!', error);
    } else {
        console.log('Done!');
    }
})

// const SVGIcons2SVGFontStream = require('svgicons2svgfont');
// const fs = require('fs');
// const fontStream = new SVGIcons2SVGFontStream({
//     fontName: 'icons',
//     fontHeight: 24,
//     fontWeight: 24,
// });
//
// // Setting the font destination
// fontStream.pipe(fs.createWriteStream('font/icons.svg'))
//     .on('finish',function() {
//         console.log('Font successfully created!')
//     })
//     .on('error',function(err) {
//         console.log(err);
//     });
//
// // Writing glyphs
// const glyph1 = fs.createReadStream('svg/Bell.svg');
// glyph1.metadata = {
//     unicode: ['\uE001\uE002'],
//     name: 'Bell'
// };
// fontStream.write(glyph1);
//
// // Do not forget to end the stream
// fontStream.end();