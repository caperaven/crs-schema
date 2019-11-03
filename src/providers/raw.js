import {BaseProvider} from "./base-provider.js";

class RawProvider extends BaseProvider {
    get key() {
        return "raw"
    }

    get template() {
        return `<__element__ __attributes__ __styles__>__content__</__element__>`
    }

    process(item, key) {
        const parts = super.process(item);

        return this.setValues(this.template, {
            "__element__": key,
            "__attributes__": parts.attributes,
            "__styles__": parts.styles,
            "__content__": parts.children || parts.content || ""
        })
    }
}

crs.schema.register(RawProvider);