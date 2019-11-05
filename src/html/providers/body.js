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
}