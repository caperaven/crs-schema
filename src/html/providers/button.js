import {BaseProvider} from "./base-provider.js";
import {svgLink} from "./../../common-templates.js";

export default class ButtonProvider extends BaseProvider {
    get key() {
        return "button"
    }

    get template() {
        return `<button __attributes__ __styles__>__content__</button>`
    }

    async process(item, key) {
        const parts = await super.process(item);
        const caption = await this.parser.parseStringValue(item.caption);
        const icon = item.icon == null ? "" : svgLink.split("__icon__").join(item.icon);
        const content = item.icon == null ? `<span>${caption}</span>` : `${icon}<span>${caption}</span>`;

        return await this.setValues(this.template, {
            "__attributes__": parts.attributes,
            "__styles__": parts.styles,
            "__content__": content
        })
    }

    validate(item, errors) {
        this.assert(() => item.caption == null, errors, "button must have a caption");
    }
}