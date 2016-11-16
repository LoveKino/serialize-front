'use strict';

module.exports = (node) => {
    if (node === document) return null;
    return {
        style: window.getComputedStyle ?
            stylesToMap(window.getComputedStyle(node)) : {},
        beforeStyle: window.getComputedStyle ?
            stylesToMap(window.getComputedStyle(node), ':before') : {},
        afterStyle: window.getComputedStyle ?
            stylesToMap(window.getComputedStyle(node), ':after') : {},
        shape: {
            offsetLeft: node.offsetLeft,
            offsetTop: node.offsetTop,
            clientLeft: node.clientLeft,
            clientTop: node.clientTop,
            offsetWidth: node.offsetWidth,
            offsetHeight: node.offsetHeight,
            clientWidth: node.clientWidth,
            clientHeight: node.clientHeight
        }
    };
};

let stylesToMap = (styles) => {
    let styleMap = {};
    for (let i = 0; i < styles.length; i++) {
        let name = styles[i];
        styleMap[name] = styles[name];
    }
    return styleMap;
};
