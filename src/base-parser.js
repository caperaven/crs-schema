export class BaseParser {
    constructor() {
        this.providers = new Map();
        this.managers = new Map();

        this.valueProcessors = [];
    }

    dispose() {
        this.providers.clear();
        delete this.providers;

        this.managers.clear();
        delete this.managers;

        this.valueProcessors.length = 0;
        this.options = 0;
    }

    register(type) {
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
            this.register((await import(library)).default);
        }
    }

    init() {
        const keys = Object.keys(this.schema);

        for (let key of keys) {
            if (key != this.options.root) {
                if (this.managers.has(key)) {
                    this.managers.get(key).initialize(this.schema[key]);
                }
            }
        }
    }

    processStyleImports(result) {
        if (this.styleImports.length > 0) {
            const imports = [];
            this.styleImports.forEach(style => imports.push(`@import "${style}";`));

            result = `<style>${imports.join("\n")};</style>${result}`;
        }
        return result;
    }

    validate() {

    }
}