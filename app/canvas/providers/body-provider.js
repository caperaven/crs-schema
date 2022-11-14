import {BaseProvider} from "../../../dist/html/crs-base-provider.js";

export default class BodyProvider extends BaseProvider {
    get key() {
        return "body"
    }

    async process(item, ctx) {
        await super.process(item, ctx);
    }
}