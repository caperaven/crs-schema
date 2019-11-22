import {BaseProvider} from "./base-provider.js";

export default class BodyProvider extends BaseProvider {
    get key() {
        return "body"
    }

    get template() {
        return `__content__`
    }

    process(item) {
        const parts = super.process(item);

        return this.setValues(this.template, {
            "__content__": parts.children
        })
    }

    validate(item, errors) {
        this.assert(() => Array.isArray(item), errors, "Body element must be a object not an array");
        this.assert(() => item.elements == null, errors, "elements property required on body");
        this.assert(() => Array.isArray(item.elements) == false, errors, "element property on body must be an array");

        super.validate(item, errors);
    }
}