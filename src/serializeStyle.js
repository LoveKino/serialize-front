'use strict';

module.exports = (node) => {
    if (node === document) return null;
    let bound = node.getBoundingClientRect();
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
            clientHeight: node.clientHeight,
            rect: {
                bottom: bound.bottom,
                top: bound.top,
                left: bound.left,
                right: bound.right,
                height: bound.height,
                width: bound.width
            }
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
