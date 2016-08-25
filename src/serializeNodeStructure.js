'use strict';

module.exports = (node) => {
    let attributes = {};

    let nodeAttribute = node.attributes || [];
    for (let i = 0; i < nodeAttribute.length; i++) {
        let attr = node.attributes[i];
        attributes[attr.nodeName] = attr.nodeValue;
    }
    let ret = {
        tagName: node.tagName,
        nodeType: node.nodeType,
        index: getOrder(node),
        attributes
    };

    return ret;
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
