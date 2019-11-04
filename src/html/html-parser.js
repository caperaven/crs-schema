import {BaseParser} from "./../base-parser.js";

export class HTMLParser extends BaseParser {
    constructor() {
        super();

        this.options = {
            elementKey: "element",
            childrenKey: "elements",
            attributesKey: "attributes",
            stylesKey: "styles",
            root: "body",
            contentKey: "content"
        };

        this.attrNameManagers = [];
        this.attrValueManagers = [];
        this.contentManagers = [];
    }

    dispose() {
        delete this.options;

        this.attrNameManagers.length = 0;
        this.attrValueManagers.length = 0;
        this.contentManagers.length = 0;
    }

    async initialize(callback) {
        this._register((await import("./providers/body.js")).default);
        this._register((await import("./providers/raw.js")).default);
        this._register((await import("./managers/templates.js")).default);
        this._register((await import("./managers/variables.js")).default);
        callback(this);
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