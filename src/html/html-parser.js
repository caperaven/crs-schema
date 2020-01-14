import {HTMLBaseParser} from "./../html-base-parser.js";

export class HTMLParser extends HTMLBaseParser {
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
        this.schema = schema;

        this.init();

        if (this.providers.has(this.options.root) == false) {
            throw new Error(`schema requires a "${this.options.root}" option`);
        }

        const root = schema[this.options.root];
        if (root == null) throw new Error(`schema should have a property "${this.options.root}"`);

        let result = this.providers.get(this.options.root).process(root);
        result = this.processStyleImports(result);

        this.managers.forEach(manager => manager.reset());
        delete this.schema;

        return result;
    }

    validate(schema, errors) {
        const rootProvider = this.providers.get(this.options.root);
        if (rootProvider == null) {
            errors.push("a root provider was not registered");
        }

        const keys = Object.keys(schema);

        for (let key of keys) {
            if (key != this.options.root) {
                if (this.managers.has(key)) {
                    const manager = this.managers.get(key);
                    if (manager.validate != null) {
                        manager.validate(schema[key], errors);
                    }
                }
            }
        }

        const root = schema[this.options.root];
        rootProvider && rootProvider.validate(root, errors);
    }

    validateItem(item, errors) {
        const key = item["element"];
        let provider = this.providers.get(key);

        if (provider == null) {
            provider = this.providers.get("raw");
        }

        provider.validate && provider.validate(item, errors);
    }
}

if (typeof self != "undefined") {
    self.crs = self.crs || {};
    self.crs.HTMLParser = HTMLParser;
}
