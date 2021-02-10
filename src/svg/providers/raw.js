import {SvgBaseProvider} from "./base-provider.js";
import {createElement} from "./svg-factory.js";

export default class RawProvider extends SvgBaseProvider {
    get key() {
        return "raw"
    }

    async process(item, parent) {
        return createElement(item.element, item.attributes);
    }
}