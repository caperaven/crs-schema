import {SvgBaseProvider} from "./base-provider.js";
import {createElement} from "./svg-factory.js";

export default class GroupProvider extends SvgBaseProvider {
    get key() {
        return "group"
    }

    constructor(parser) {
        super(parser);
        this.toolHeight = 32;
    }

    async process(item, parent) {
        const width = item.width || 300;
        const group = await createElement("g", {is: "svg-group", "data-id": "group", "width": width});
        group.dataset.childOffsetY = 45;
        group.dataset.childOffsetX = 0;
        parent.appendChild(group);
        await super.process(item, group);
        await this.addToolbar(item, group, width);
        return group;
    }

    async addToolbar(item, parent, width) {
        const textTop = 32 / 2 + 8;
        const padding = 10;

        const toolbar = await createElement("g", {transform: "translate(0, 0)", height: this.toolHeight, "data-id": "group-header"});
        const background = await createElement("rect", {x: 0, y: 0, width: width, height: this.toolHeight, fill: "#dadada"});
        const title = await createElement("text", {transform: `translate(${padding}, ${textTop})`}, this.parser.getDataValue(item.title));
        toolbar.appendChild(background);
        toolbar.appendChild(title);
        parent.appendChild(toolbar);
    }
}