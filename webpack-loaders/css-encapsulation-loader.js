/* eslint-disable */
const encapsulateCss = require('encapsulate-css').default;
const path = require('path');

const classnameFromFilename = (filename) => filename.replace(/(^.*)\..*/, '$1').replace(/\W+/g, '_');

module.exports = function(source) {
    this.cacheable();

    const optFileOut = source.indexOf('/* disable-encapsulation */') !== -1;
    let filename = path.basename(this.resourcePath);

    if (filename === 'styles.scss') {
        // use the parent folder's name instead
        const splitPath = this.resourcePath.split('/');
        filename = splitPath[splitPath.length - 2];
    }

    if (optFileOut === true) {
        return source;
    } else {
        return encapsulateCss(source, classnameFromFilename(filename));
    }
};
