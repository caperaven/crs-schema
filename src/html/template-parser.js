import {HTMLBaseParser} from "./html-base-parser.js";

export class TemplateParser extends HTMLBaseParser {
    constructor(schema) {
        super();
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
}