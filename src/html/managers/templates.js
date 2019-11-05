import {BaseManager} from "./base-manager.js";

export default class TemplatesManager extends BaseManager {
    get key() {
        return "templates"
    }

    reset() {
        if (this.templates != null) {
            this.templates.clear();
            this.templates = null;
        }
    }

    initialize(templates) {
        this.templates = new Map();
        for (let template of templates) {
            this.templates.set(template.id, template);
        }
    }

    getTemplate(id) {
        if(this.templates.has(id) == false) throw new Error(`There is no template in the schema for with id "${id}"`);
        return this.templates.get(id);
    }
}