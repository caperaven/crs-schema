import {BaseProvider} from "./base-provider.js";

export default class TemplateProvider extends BaseProvider {
    get key() {
        return "template"
    }

    process(item, key) {
        const manager = this.parser.managers.get("templates");
        if (manager == null) throw new Error("templates manager should be registered");

        const template = manager.getTemplate(item.template);
        const parts = super.process(template);

        return parts.children;
    }

    validate(item, errors) {
        this.assert(() => item.template == null, errors, "template element must have a valid template property");
    }
}