import {BaseManager} from "./base-manager.js";

export default class TemplatesManager extends BaseManager {
    get key() {
        return "templates"
    }

    async reset() {
        for (let part of this._parts || []) {
            if (this[part] != null) {
                this[part].clear();
                this[part] = null;
            }
        }
    }

    async initialize() {
        this._parts = [];
        await this._load("templates");
    }

    async _load(name) {
        if (this[name] == null) {
            this[name] = new Map();
            this._parts.push(name);
        }

        const templates = this.parser.schema[name];
        for (let template of templates) {
            if (template.import == null) {
                this[name].set(template.id, template);
            }
            else {
                await this._load(template.import);
            }
        }
    }

    async getTemplate(store, id) {
        if(this[store].has(id) == false) throw new Error(`There is no template in the schema for with id "${id}"`);
        return this[store].get(id);
    }

    async validate(templates, errors) {
        if (await this.assert(() => Array.isArray(templates) == false, errors, "templates definition must be a array")) {
            await this.initialize(templates);
            for (const item of this.templates) {
                await this.assert(() => item.id == null, errors, "template must have a valid id property");
                await this.assert(() => item.elements == null, errors, "template must have a elements property");
                await this.assert(() => Array.isArray(item.elements) != true, errors, "template elements property should be an array");
                if (await this.assert(() => (item.elements || []).length == 0, errors, "template elements must contain content")) {
                    await super.validate(item, errors);
                }
            }
        }
    }
}