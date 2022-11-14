export async function createSchemaLoader(parser) {
    const result = new Schema(parser);
    await result.parser.initialize();
    return result;
}

globalThis.crs ||= {};
globalThis.crs.createSchemaLoader = createSchemaLoader;

class Schema {
    #parser;

    get parser() {
        return this.#parser;
    }
    
    constructor(parser) {
        this.#parser = parser;
    }

    async dispose() {
        await this.#parser.dispose();
        this.#parser = null;
    }

    async parse(schema, ctx) {
        return await this.#parser.parse(schema, ctx);
    }

    async load(libraries) {
        await this.#parser.load(libraries);
    }

    async register(plugin) {
        await this.#parser.register(plugin);
    }
}
