import {BaseProvider} from "./base-provider.js";

export default class RawProvider extends BaseProvider {
    get key() {
        return "raw"
    }

    get template() {
        return `<__element__ __attributes__ __styles__>__content__</__element__>`
    }

    async process(item, key) {
        const parts = await super.process(item);

        return await this.setValues(this.template, {
            "__element__": key,
            "__attributes__": parts.attributes,
            "__styles__": parts.styles,
            "__content__": parts.children || parts.content || ""
        })
    }

    async validate(item, errors) {
        await super.validate(item, errors);
    }
}