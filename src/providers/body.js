import {BaseProvider} from "./base-provider.js";

class BodyProvider extends BaseProvider {
    get key() {
        return "body"
    }

    get template() {
        return `<div __attributes__ __styles__>__content__</div>`
    }

    process(item) {
        const parts = super.process(item);

        return this.setValues(this.template, {
            "__attributes__": parts.attributes,
            "__styles__": parts.styles,
            "__content__": parts.children
        })
    }
}

crs.schema.register(BodyProvider);