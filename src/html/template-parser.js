import {HTMLBaseParser} from "./html-base-parser.js";

export class TemplateParser extends HTMLBaseParser {
    constructor(schema, attributes) {
        super(attributes);
        this.schema = schema;
    }

    async initialize() {
        await super.initialize();
        this.init();
    }

    parse(id) {
        const data = {
            template: id
        };

        let result = this.providers.get("template").process(data);
        result = this.processStyleImports(result);

        return result;
    }

    parseTemplate(tpl) {
        let result = this.providers.get("template").processTemplate(tpl);
        result = this.processStyleImports(result);

        return result;
    }
}