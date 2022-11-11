import {HTMLBaseParser} from "./html-base-parser.js";

export class HTMLParser extends HTMLBaseParser {
    async addStyleImports(imports) {
        if (Array.isArray(imports)) {
            imports.forEach(imp => this.styleImports.push(imp));
        }
        else
        {
            this.styleImports.push(imports);
        }
    }

    async parse(schema, ctx) {
        this.schema = schema;

        await this.init();

        if (this.providers[this.options.root] == null) {
            throw new Error(`schema requires a "${this.options.root}" option`);
        }

        const root = schema[this.options.root];
        if (root == null) throw new Error(`schema should have a property "${this.options.root}"`);

        let result = await this.providers[this.options.root].process(root, ctx);
        result = await this.processStyleImports(result);

        for (const managerKey of Object.keys(this.managers)) {
            const manager = this.managers[managerKey];
            await manager.reset();
        }

        delete this.schema;

        return result;
    }
}

if (typeof self != "undefined") {
    self.crs = self.crs || {};
    self.crs.HTMLParser = HTMLParser;
}
