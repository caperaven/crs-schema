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

    async process(item) {
        const parts = await super.process(item);

        return await this.setValues(this.template, {
            "__caption__": this.parser.parseStringValue(item.caption),
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}