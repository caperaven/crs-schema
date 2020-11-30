export class BaseParser {
    constructor(attributes) {
        this.attributes = attributes;
        this.styleImports = [];
        this.providers = new Map();
        this.managers = new Map();

        this.valueProcessors = [];
    }

    async dispose() {
        for (let provider of this.providers) {
            await provider.dispose();
        }

        for (let manager of this.managers) {
            await manager.dispose();
        }

        await this.providers.clear();
        await this.managers.clear();

        delete this.providers;
        delete this.managers;
        delete this.attributes;

        this.valueProcessors.length = 0;
        this.options = 0;
    }

    async register(type) {
        const instance = new type(this);

        if (instance.isManager == true) {
            this.managers.set(instance.key, instance);
            if (instance.valueProcessor == true) {
                this.valueProcessors.push(instance);
            }
        }
        else {
            this.providers.set(instance.key, instance);
        }
    }

    async load(libraries) {
        for (let library of libraries || []) {
            await this.register((await import(library)).default);
        }
    }

    async init() {
        for (const value of this.managers) {
            value.reset && await value.reset();
        }

        const keys = Object.keys(this.schema);

        for (let key of keys) {
            if (key != this.options.root) {
                if (this.managers.has(key)) {
                    await this.managers.get(key).initialize(this.schema[key]);
                }
            }
        }
    }

    async processStyleImports(result) {
        if (this.styleImports.length > 0) {
            const imports = [];
            this.styleImports.forEach(style => imports.push(`@import "${style}";`));

            result = `<style>${imports.join("\n")};</style>${result}`;
        }
        return result;
    }

    async validate() {
        return;
    }
}