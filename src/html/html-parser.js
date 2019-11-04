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
    }

    dispose() {
        delete this.options;
    }

    async initialize(callback) {
        this._register((await import("./managers/templates.js")).default);
        this._register((await import("./managers/variables.js")).default);

        this._register((await import("./providers/body.js")).default);
        this._register((await import("./providers/raw.js")).default);
        this._register((await import("./providers/template.js")).default);
        callback(this);
    }

    parse(schema) {
        const keys = Object.keys(schema);

        // 1. initialize managers
        for (let key of keys) {
            if (key != this.options.root) {
                if (this.managers.has(key)) {
                    this.managers.get(key).initialize(schema[key]);
                }
            }
        }

        // 2. parse root
        if (this.providers.has(this.options.root) == false) {
            throw new Error(`schema requires a "${this.options.root}" option`);
        }

        const root = schema[this.options.root];
        if (root != null) {
            return this.providers.get(this.options.root).process(root);
        }
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
        let content = item[this.options.contentKey];
        if (content == null) return null;

        for (let processor of this.valueProcessors) {
           content = processor.process(content);
        }

        return content;
    }
}