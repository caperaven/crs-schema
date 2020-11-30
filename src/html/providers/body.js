import {BaseProvider} from "./base-provider.js";

export default class BodyProvider extends BaseProvider {
    get key() {
        return "body"
    }

    get template() {
        return `__content__`
    }

    async process(item) {
        const parts = await super.process(item);

        return await this.setValues(this.template, {
            "__content__": parts.children
        })
    }

    async validate(item, errors) {
        await this.assert(() => Array.isArray(item), errors, "Body element must be a object not an array");
        await this.assert(() => item.elements == null, errors, "elements property required on body");
        await this.assert(() => Array.isArray(item.elements) == false, errors, "element property on body must be an array");

        await super.validate(item, errors);
    }
}