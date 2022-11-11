import {BaseParser} from "../../../src/base-parser.js";
import BodyProvider from "../providers/body-provider.js";
import RectProvider from "../providers/rect-provider.js";
import CircleProvider from "../providers/circle-provider.js";

export class CanvasParser extends BaseParser {
    #ctx;

    async initialize() {
        await this.register(BodyProvider);
        await this.register(RectProvider);
        await this.register(CircleProvider);
    }

    async parse(schema, ctx) {
        this.#ctx = ctx;

        const root = schema["body"];
        await this.providers["body"].process(root, ctx);

        this.#ctx = null;
    }

    async parseChildren(item, ctx) {
        if (item.elements != null) {
            for (const child of item.elements) {
                await this.providers[child.element].process(child, ctx);
            }
        }
    }
}