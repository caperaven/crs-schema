export class BaseParser {
    #attributes;
    #styleImports = [];
    #providers = {};
    #managers = {};
    #valueProcessors = []
    #options;

    get options() {
        return this.#options;
    }

    get providers() {
        return this.#providers;
    }

    get valueProcessors() {
        return this.#valueProcessors;
    }

    get managers() {
        return this.#managers;
    }

    get styleImports() {
        return this.#styleImports;
    }

    constructor(attributes, options) {
        this.#attributes = attributes;
        this.#options = options || {};
    }

    async dispose() {
        for (let provider of Object.keys(this.#providers)) {
            await this.#providers[provider].dispose();
        }

        for (let manager of Object.keys(this.#managers)) {
            await this.#managers[manager].dispose();
        }

        this.#providers = null;
        this.#managers = null;
        this.#attributes = null;
        this.#valueProcessors = null;
        this.#styleImports = null;
        this.#options = 0;
    }

    async register(type) {
        const instance = new type(this);

        if (instance.isManager == true) {
            this.#managers[instance.key] = instance;

            if (instance.valueProcessor == true) {
                this.#valueProcessors.push(instance);
            }
        }
        else {
            this.#providers[instance.key] = instance;
        }
    }

    async load(libraries) {
        for (let library of libraries || []) {
            await this.register((await import(library)).default);
        }
    }

    async init() {
        for (const manager of Object.keys(this.#managers)) {
            const value = this.#managers[manager];
            await value.reset?.();
        }

        const keys = Object.keys(this.schema);

        for (let key of keys) {
            if (key != this.#options.root) {
                if (this.#managers[key] != null) {
                    await this.#managers[key].initialize(this.schema[key]);
                }
            }
        }
    }

    async processStyleImports(result) {
        if (this.#styleImports.length > 0) {
            const imports = [];
            this.#styleImports.forEach(style => imports.push(`@import "${style}";`));

            result = `<style>${imports.join("\n")};</style>${result}`;
        }
        return result;
    }
}