import {HTMLBaseParser} from "./html-base-parser.js";

export class TemplateParser extends HTMLBaseParser {
    constructor(schema, attributes) {
        super(attributes);
        this.schema = schema;
    }

    async initialize() {
        await super.initialize();
        await this.init();
    }

    async parse(id) {
        const data = {
            template: id
        };

        let result = await this.providers.get("template").process(data);
        result = await this.processStyleImports(result);

        return result;
    }

    async parseTemplate(tpl) {
        let result = await this.providers.get("template").processTemplate(tpl);
        result = await this.processStyleImports(result);

        return result;
    }
}