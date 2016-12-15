'use strict';

module.exports = (node) => {
    let attributes = {};

    let nodeAttribute = node.attributes || [];
    for (let i = 0; i < nodeAttribute.length; i++) {
        let attr = node.attributes[i];
        attributes[attr.nodeName] = attr.nodeValue;
    }

    return attributes;
};
