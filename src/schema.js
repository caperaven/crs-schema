export async function createSchemaLoader(parser) {
    const result = new Schema(parser);
    await result.parser.initialize();
    return result;
}

class Schema {
    constructor(parser) {
        this.parser = parser;
    }

    dispose() {
        this.parser.dispose();
        this.parser = null;
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
}
