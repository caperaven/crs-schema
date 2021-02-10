import {SvgBaseProvider} from "./base-provider.js";
import {createElement} from "./svg-factory.js";

export default class BodyProvider extends SvgBaseProvider {
    get key() {
        return "body"
    }

    async process(item) {
        const group = await createElement("g", {transform: 'translate(0, 0)', "data-id": "body"});
        await super.process(item, group);
        return group;
    }
}