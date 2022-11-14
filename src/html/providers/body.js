import {BaseProvider} from "./base-provider.js";

export default class BodyProvider extends BaseProvider {
    get key() {
        return "body"
    }

    get template() {
        return `__content__`
    }

    async process(item, ctx) {
        const parts = await super.process(item, ctx);

        return await this.setValues(this.template, {
            "__content__": parts.children
        })
    }
}