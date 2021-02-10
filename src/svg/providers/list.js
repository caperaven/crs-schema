import {SvgBaseProvider} from "./base-provider.js";
import {createElement} from "./svg-factory.js";

export default class ListProvider extends SvgBaseProvider {
    get key() {
        return "list"
    }

    constructor(parser) {
        super(parser);
        this.itemHeight = 32;
    }

    async process(item, parent) {
        const width = item.width || 300;
        const transform = parent.dataset.childOffsetX != null ? `translate(${parent.dataset.childOffsetX}, ${parent.dataset.childOffsetY})` : "translate(0,0)";
        const group = await createElement("g", {is: "svg-list", "data-id": "list", "width": width, transform: transform});

        parent.appendChild(group);

        await super.process(item, group);
        await this._buildList(item.field, group);
        return group;
    }

    async _buildList(itemsProperty, parent) {
        const items = this.parser.getDataValue(itemsProperty);
        let top = 0;

        for (let item of items) {
            top = await this._buildListItem(item, top, parent);
        }
    }

    async _buildListItem(item, top, parent) {
        const y = this.itemHeight / 2 - 8 + top;
        const text = await createElement("text", {x: 0, y: y}, item.title);
        parent.appendChild(text);
        return top + this.itemHeight;
    }
}