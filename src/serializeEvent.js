'use strict';

let serializeEvent = (e) => {
    let json = {
        __proto__source: getClassName(e)
    };
    for (let name in e) {
        let value = e[name];
        if (isAtom(value)) {
            json[name] = value;
        }
    }
    return json;
};

const classNameReg = /\[object (.*)\]/;

let getClassName = (e) => {
    let cons = Object.getPrototypeOf(e);
    return cons.toString().match(classNameReg)[1];
};

let isAtom = v => !v || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';

module.exports = serializeEvent;
