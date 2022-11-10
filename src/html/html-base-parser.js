import {BaseParser} from "./../base-parser.js";
import TemplatesManager from "./managers/templates.js";
import VariablesManager from "./managers/variables.js";
import BodyProvider from "./providers/body.js";
import RawProvider from "./providers/raw.js";
import TemplateProvider from "./providers/template.js";
import ButtonProvider from "./providers/button.js";

export class HTMLBaseParser extends BaseParser {
    constructor(attributes) {
        super(attributes, {
            elementKey: "element",
            childrenKey: "elements",
            attributesKey: "attributes",
            stylesKey: "styles",
            root: "body",
            contentKey: "content"
        });
    }

    async dispose() {
        await super.dispose();
    }

    async initialize() {
        await this.register(TemplatesManager);
        await this.register(VariablesManager);
        await this.register(BodyProvider);
        await this.register(RawProvider);
        await this.register(TemplateProvider);
        await this.register(ButtonProvider);
    }

    async parseItem(item, key) {
        if(item == null) return;
        key = key || item[this.options.elementKey];
        if (this.providers[key] != null) {
            const provider = this.providers[key];
            if(await provider.shouldParse(item) !== false) {
                return provider.process(item);
            }
        }
        else {
            const provider = this.providers["raw"];
            if(provider.shouldParse(item) !== false) {
                return provider.process(item, key);
            }
        }
    }

    async parseAttributes(item) {
        const attributes = item[this.options.attributesKey];
        if (attributes == null) return null;

        const result = [];
        for (const values of Object.entries(attributes)) {
            const key = values[0];
            let value = values[1];

            value = await this.parseStringValue(value, key);

            result.push(`${key}="${value}"`);
        }

        return result.join(" ");
    }

    async parseStyles(item) {
        let styles = item[this.options.stylesKey];
        if (styles == null) return null;

        if (Array.isArray(styles)) {
            styles = styles.join(" ");
        }

        return `class="${styles}"`;
    }

    async parseChildren(item) {
        const children = item[this.options.childrenKey];
        if (children == null) return null;

        const result = [];
        for (let child of children) {
            result.push(await this.parseItem(child));
        }
        return result.join("");
    }

    async parseContent(item) {
        let content = item[this.options.contentKey];
        if (content == null) return null;

        return this.parseStringValue(content);
    }

    async parseStringValue(str, key) {
        for (let processor of this.valueProcessors) {
            str = await processor.process(str, key);
        }
        return str;
    }
}