'use strict';

let serializeStructure = require('./serializaNodeStructure');

let serializeStyle = require('./serializeStyle');

let {
    getDisplayText
} = require('page-text');

let cache = () => {
    let hashKey = '__hash_key__';
    let count = 0;
    let map = {};

    let setCache = (node, name, value) => {
        let key = null;
        if (!node[hashKey]) {
            key = count++;
            node[hashKey] = key;
        } else {
            key = node[hashKey];
        }
        map[key] = map[key] || {};
        map[key][name] = {
            value
        };
    };

    let getCache = (node, name) => {
        let key = node[hashKey];
        if (key === undefined) return;
        if (!map[key]) return;
        return map[key][name];
    };

    return {
        setCache,
        getCache
    };
};

module.exports = (nodes, {
    style = true, textContent = true
} = {}) => {
    let {
        getCache, setCache
    } = cache();

    let serializeStructureWithCache = (node) => {
        let v = getCache(node, 'nodeStructure');
        if (v) {
            return v.value;
        } else {
            let ret = serializeStructure(node);
            setCache(node, 'nodeStructure', ret);
            return ret;
        }
    };

    let getDisplayTextWithCache = (node) => {
        let v = getCache(node, 'displayText');
        if (v) {
            return v.value;
        } else {
            let ret = getDisplayText(node);
            setCache(node, 'displayText', ret);
            return ret;
        }
    };

    let serializeNode = (node, opts = {}) => {
        let ret = serializeStructureWithCache(node);

        if (opts.textContent) {
            ret.textContent = getDisplayTextWithCache(node);
        }

        if (opts.style) {
            ret.style = serializeStyle(node);
        }
        return ret;
    };

    let serializePath = (target) => {
        let json = [];
        let index = 0;

        target = target && target.parentNode;
        while (target) {
            if (index < 2) {
                json.push(serializeNode(target, {
                    textContent: true
                }));
            } else {
                json.push(serializeNode(target));
            }

            target = target.parentNode;

            index++;
        }
        return json;
    };

    let getNodeInfo = (node) => {
        let nodeInfo = serializeNode(node, {
            textContent,
            style
        });
        let path = serializePath(node);

        let ret = {
            node: nodeInfo,
            path
        };

        return ret;
    };

    let nodeInfos = [];
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let nodeInfo = getNodeInfo(node);
        nodeInfos.push(nodeInfo);
    }

    return nodeInfos;
};
