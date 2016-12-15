'use strict';

let {
    reduce
} = require('bolzano');

// only some important styles because of performance consideration
const STYLE_PROPS = ['color', 'background-color', 'display', 'visibility', 'content', 'font-size'];

let getStyleMap = (styles, props) => {
    if (!styles) return {};

    return reduce(props, (prev, name) => {
        prev[name] = styles.getPropertyValue(name);
        return prev;
    }, {});
};

module.exports = (node, props) => {
    props = props || STYLE_PROPS;
    if (node === document) return null;
    let bound = node.getBoundingClientRect();
    let computedStyle = window.getComputedStyle ? window.getComputedStyle(node) : null;
    let computedBeforeStyle = window.getComputedStyle ? window.getComputedStyle(node, ':before') : null;
    let computedAfterStyle = window.getComputedStyle ? window.getComputedStyle(node, ':after') : null;

    return {
        style: getStyleMap(computedStyle, props),
        beforeStyle: getStyleMap(computedBeforeStyle, props),
        afterStyle: getStyleMap(computedAfterStyle, props),
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
