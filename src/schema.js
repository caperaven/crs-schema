import {BaseManager} from "./html/managers/base-manager.js";

export class Schema {
    constructor(addons, readyCallback) {
        this.options = {
            elementKey: "element",
            childrenKey: "elements",
            attributesKey: "attributes",
            stylesKey: "styles",
            root: "body",
            contentKey: "content"
        };
        
        this.data = {};
        this.providers = new Map();
        this.managers = new Map();
        this.attrNameManagers = [];
        this.attrValueManagers = [];
        this.contentManagers = [];
        
        const promises = [];
        for (let addon of addons || []) {
            promises.push(import(addon));
        }
        
        Promise.allSettled(promises)
            .then((results) => 
                results.forEach(result => 
                    this.register(result.value.default)
                )
            )
            .then(() => readyCallback(this)).catch(error => console.error(error));
    }

    dispose() {
        delete this.data;
        delete this.options;

        this.providers.clear();
        delete this.providers;

        this.managers.clear();
        delete this.managers;

        this.attrNameManagers.length = 0;
        this.attrValueManagers.length = 0;
        this.contentManagers.length = 0;
    }

    register(type) {
        const instance = new type(this);

        if (instance instanceof BaseManager) {
            this.managers.set(instance.key, instance);
            for (let association of instance.association) {
                const array = `${association}Managers`;
                if (this[array] != null) {
                    this[array].push(instance);
                }
            }
        }
        else {
            this.providers.set(instance.key, instance);
        }
    }

    parse(schema) {
        return this.parseItem(schema[this.options.root] != null ? schema[this.options.root] : schema, this.options.root);
    }

    parseItem(item, key) {
        key = key || item[this.options.elementKey];
        if (this.providers.has(key)) {
            return this.providers.get(key).process(item);
        }
        else {
            return this.providers.get("raw").process(item, key);
        }
    }

    parseAttributes(item) {
        if (item[this.options.attributesKey] == null) return null;
        return "";
    }

    parseStyles(item) {
        if (item[this.options.stylesKey] == null) return null;
        return "";
    }

    parseChildren(item) {
        const children = item[this.options.childrenKey];
        if (children == null) return null;

        const result = [];
        for (let child of children) {
            result.push(this.parseItem(child));
        }
        return result.join("");
    }

    parseContent(item) {
        const content = item[this.options.contentKey];
        if (content == null) return null;

        // check for variable content
        return content;
    }
}
