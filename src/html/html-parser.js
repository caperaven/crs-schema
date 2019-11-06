import {BaseParser} from "./../base-parser.js";
import TemplatesManager from "./managers/templates.js";
import VariablesManager from "./managers/variables.js";
import BodyProvider from "./providers/body.js";
import RawProvider from "./providers/raw.js";
import TemplateProvider from "./providers/template.js";
import ButtonProvider from "./providers/button.js";

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

        this.styleImports = [];
    }

    dispose() {
        delete this.options;
    }

    async initialize() {
        this.register(TemplatesManager);
        this.register(VariablesManager);
        this.register(BodyProvider);
        this.register(RawProvider);
        this.register(TemplateProvider);
        this.register(ButtonProvider);
    }

    async load(libraries) {
        for (let library of libraries || []) {
            this.register((await import(library)).default);
        }
    }

    addStyleImports(imports) {
        if (Array.isArray(imports)) {
            imports.forEach(imp => this.styleImports.push(imp));
        }
        else
        {
            this.styleImports.push(imports);
        }
    }

    parse(schema) {
        const keys = Object.keys(schema);

        for (let key of keys) {
            if (key != this.options.root) {
                if (this.managers.has(key)) {
                    this.managers.get(key).initialize(schema[key]);
                }
            }
        }

        if (this.providers.has(this.options.root) == false) {
            throw new Error(`schema requires a "${this.options.root}" option`);
        }

        const root = schema[this.options.root];
        if (root == null) throw new Error(`schema should have a property "${this.options.root}"`);

        let result = this.providers.get(this.options.root).process(root);

        this.managers.forEach(manager => manager.reset());

        if (this.styleImports.length > 0) {
            const imports = [];
            this.styleImports.forEach(style => imports.push(`@import "${style}";`));

            result = `<style>${imports.join("\n")};</style>${result}`;
        }

        return result;
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
        const attributes = item[this.options.attributesKey];
        if (attributes == null) return null;

        const result = [];
        Object.entries(attributes).forEach((values) => {
            const key = values[0];
            let value = values[1];

            value = this.parseStringValue(value);

            result.push(`${key}="${value}"`);
        });

        return result.join(" ");
    }

    parseStyles(item) {
        let styles = item[this.options.stylesKey];
        if (styles == null) return null;

        if (Array.isArray(styles)) {
            styles = styles.join(" ");
        }

        return `class="${styles}"`;
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

        content = this.parseStringValue(content);

        return content;
    }

    parseStringValue(str) {
        for (let processor of this.valueProcessors) {
            str = processor.process(str);
        }
        return str;
    }
}

self.crs = self.crs || {};
self.crs.HTMLParser = HTMLParser;
