import {BaseProvider} from "./base-provider.js";

export default class GroupProvider extends BaseProvider {
    get key() {
        return "group"
    }

    get template() {
        return `<div role="group" __attributes__ __styles__>
                    <header><h2>__caption__</h2></header>
                    <div data-container="true"></div>
                </div>`
    }

    process(item) {
        const parts = super.process(item);

        return this.setValues(this.template, {
            "__caption__": this.parser.parseStringValue(item.caption),
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}