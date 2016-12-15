'use strict';

let getAttributes = require('./getAttributes');

module.exports = (node) => {
    return {
        tagName: node.tagName || node.nodeName,
        nodeType: node.nodeType,
        index: getOrder(node),
        attributes: getAttributes(node)
    };
};

let getOrder = (node) => {
    let parentNode = node.parentNode;
    if (!parentNode) return 0;
    for (let i = 0; i < parentNode.childNodes.length; i++) {
        let item = parentNode.childNodes[i];
        if (item === node) {
            return i;
        }
    }
    return -1;
};
