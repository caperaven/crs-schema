export async function createSchemaLoader(parser) {
    const result = new Schema(parser);
    await result.parser.initialize();
    return result;
}

if (typeof self != "undefined") {
    self.crs = self.crs || {};
    self.crs.createSchemaLoader = createSchemaLoader;
}

class Schema {
    constructor(parser) {
        this.parser = parser;
    }

    async dispose() {
        await this.parser.dispose();
        this.parser = null;
    }

    async validate(schema) {
        const errors = [];
        await this.parser.validate(schema, errors);
        return errors;
    }

    async parse(schema) {
        return await this.parser.parse(schema);
    }

    async load(libraries) {
        await this.parser.load(libraries);
    }

    async register(plugin) {
        await this.parser.register(plugin);
    }
}
