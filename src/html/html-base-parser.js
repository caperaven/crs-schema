import {BaseParser} from "./../base-parser.js";
import TemplatesManager from "./managers/templates.js";
import VariablesManager from "./managers/variables.js";
import BodyProvider from "./providers/body.js";
import RawProvider from "./providers/raw.js";
import TemplateProvider from "./providers/template.js";
import ButtonProvider from "./providers/button.js";

export class HTMLBaseParser extends BaseParser {
    constructor() {
        super();
        this.styleImports = [];

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
        super.dispose();
        this.styleImports.length = 0;
        this.options = null;
    }

    async initialize() {
        this.register(TemplatesManager);
        this.register(VariablesManager);
        this.register(BodyProvider);
        this.register(RawProvider);
        this.register(TemplateProvider);
        this.register(ButtonProvider);
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