'use strict';

let {
    likeArray, isObject
} = require('basetype');

let serializeEvent = (e) => {
    let json = {
        __proto__source: getClassName(e)
    };
    for (let name in e) {
        let value = e[name];
        if (isAtom(value)) {
            json[name] = value;
        } else if ((name === 'touches' ||
                name === 'changedTouches' ||
                name === 'targetTouches') &&
            likeArray(value)) {
            json[name] = serializeTouches(value);
        }
    }
    return json;
};

let serializeTouches = (value) => {
    let touches = [];
    for (let i = 0; i < value.length; i++) {
        let touch = value[i];
        let copy = {};
        if (isObject(touch)) {
            for (let name in touch) {
                if (isAtom(touch[name])) {
                    copy[name] = touch[name];
                }
            }
        }
        touches.push(copy);
    }
    return touches;
};

const classNameReg = /\[object (.*)\]/;

let getClassName = (e) => {
    let cons = Object.getPrototypeOf(e);
    return cons.toString().match(classNameReg)[1];
};

let isAtom = v => !v || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';

module.exports = serializeEvent;
