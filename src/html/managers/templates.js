import {BaseManager} from "./base-manager.js";

export default class TemplatesManager extends BaseManager {
    get key() {
        return "templates"
    }

    reset() {
        for (let part of this._parts || []) {
            if (this[part] != null) {
                this[part].clear();
                this[part] = null;
            }
        }
    }

    initialize() {
        this._parts = [];
        this._load("templates");
    }

    _load(name) {
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
                this._load(template.import);
            }
        }
    }

    getTemplate(store, id) {
        if(this[store].has(id) == false) throw new Error(`There is no template in the schema for with id "${id}"`);
        return this[store].get(id);
    }

    validate(templates, errors) {
        if (this.assert(() => Array.isArray(templates) == false, errors, "templates definition must be a array")) {
            this.initialize(templates);
            this.templates.forEach(item => {
                this.assert(() => item.id == null, errors, "template must have a valid id property");
                this.assert(() => item.elements == null, errors, "template must have a elements property");
                this.assert(() => Array.isArray(item.elements) != true, errors, "template elements property should be an array");
                if (this.assert(() => (item.elements || []).length == 0, errors, "template elements must contain content")) {
                    super.validate(item, errors);
                }
            })
        }
    }
}