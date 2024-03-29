import {BaseProvider} from "./../../src/html/providers/base-provider.js";

export default class ButtonProvider extends BaseProvider {
    get key() {
        return "button"
    }

    get template() {
        return `<button __attributes__ __styles__>
                    __icon__
                    <span class="mdc-button__label">__caption__</span>
                </button>`;
    }

    get iconTemplate() {
        return `<i class="material-icons mdc-button__icon" aria-hidden="true">__icon__</i>`
    }

    async process(item) {
        const parts = await super.process(item);

        if (parts.styles == null) {
            parts.styles = 'class="mdc-button"'
        }
        else {
            parts.styles = parts.styles.split('="').join('="mdc-button ')
        }

        await this.parser.addStyleImports([
            "/node_modules/@material/button/dist/mdc.button.css",
        ]);

        const icon = item.icon != null ? this.iconTemplate.split("__icon__").join(item.icon) : "";

        return await this.setValues(this.template, {
            "__icon__": icon,
            "__caption__": icon.caption,
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}