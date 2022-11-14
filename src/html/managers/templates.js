import {BaseManager} from "./base-manager.js";

export default class TemplatesManager extends BaseManager {
    get key() {
        return "templates"
    }

    async reset() {
        for (let part of this._parts || []) {
            if (this[part] != null) {
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
            this[name] = {};
            this._parts.push(name);
        }

        const templates = this.parser.schema[name];
        for (let template of templates) {
            if (template.import == null) {
                this[name][template.id] = template;
            }
            else {
                await this._load(template.import);
            }
        }
    }

    async getTemplate(store, id) {
        if (this[store][id] == null) throw new Error(`There is no template in the schema for with id "${id}"`);
        return this[store][id];
    }
}