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

    dispose() {
        this.parser.dispose();
        this.parser = null;
    }

    validate(schema) {
        const errors = [];
        this.parser.validate(schema, errors);
        return errors;
    }

    parse(schema) {
        return this.parser.parse(schema);
    }

    load(libraries) {
        return new Promise(async resolve => {
            await this.parser.load(libraries);
            resolve(this);
        });
    }

    register(plugin) {
        this.parser.register(plugin);
    }
}
