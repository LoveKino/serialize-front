'use strict';

let {
    getDisplayText
} = require('page-text');

let serializeStyle = require('./serializeStyle');

let serializeStructure = require('./serializeNodeStructure');

module.exports = (node, opts = {}) => {
    let ret = serializeStructure(node);

    if (opts.textContent) {
        ret.textContent = getDisplayText(node);
    }

    if (opts.style) {
        ret.style = serializeStyle(node);
    }

    return ret;
};
