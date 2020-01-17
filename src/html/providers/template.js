import {BaseProvider} from "./base-provider.js";

export default class TemplateProvider extends BaseProvider {
    get key() {
        return "template"
    }

    process(item, key) {
        const manager = this.parser.managers.get("templates");
        if (manager == null) throw new Error("templates manager should be registered");

        let store = Object.keys(item)[1];
        const id = item[store];

        if (store == "template") {
            store = "templates";
        }

        const template = manager.getTemplate(store, id);
        const parts = super.process(template);
        return parts.children;
    }

    processTemplate(template) {
        const parts = super.process(template);
        return parts.children;
    }

    validate(item, errors) {
        this.assert(() => item.template == null, errors, "template element must have a valid template property");
    }
}