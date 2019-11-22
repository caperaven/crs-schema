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