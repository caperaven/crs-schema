import {BaseProvider} from "./base-provider.js";

export default class TemplateProvider extends BaseProvider {
    get key() {
        return "template"
    }

    get template() {
        return `<div __attributes__ __classes__ >
                    __content__
                </div>`;
    }


    process(item, key) {
        const manager = this.parser.managers.get("templates");
        if (manager == null) throw new Error("templates manager should be registered");

        // let store = Object.keys(item)[1];
        // const id = item[store];
        //
        // if (store == "template") {
        //     store = "templates";
        // } NOTE GM: This logic is failing if the template is not the second property on the item. Need to chat to JHR to figure out what custom template store name can be used for.

        const template = manager.getTemplate("templates", item.template); // NOTE GM: Hardcoded to templates till above comment resolved.
        item.elements = template.elements;
        const parts = super.process(item);

        return this.setValues(this.template,
            {
                "__attributes__": parts.attributes,
                "__classes__": parts.styles,
                "__content__": parts.children});
    }

    processTemplate(template) {
        const parts = super.process(template);
        return parts.children;
    }

    validate(item, errors) {
        this.assert(() => item.template == null, errors, "template element must have a valid template property");
    }
}