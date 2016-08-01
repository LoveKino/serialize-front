'use strict';

module.exports = (node) => {
    if(node === document) return null;
    return {
        style: getStyleMap(node),
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

let getStyleMap = (node) => {
    let styleMap = {};
    if(!window.getComputedStyle) {
        return styleMap;
    }
    let styles = window.getComputedStyle(node);
    for (let i = 0; i < styles.length; i++) {
        let name = styles[i];
        styleMap[name] = styles[name];
    }
    return styleMap;
};
