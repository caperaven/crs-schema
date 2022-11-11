import {BaseProvider} from "../../../src/html/providers/base-provider.js";

export default class RectProvider extends BaseProvider {
    get key() {
        return "rect"
    }

    async process(item, ctx) {
        ctx.beginPath();
        ctx.fillStyle = item.fill;
        ctx.rect(item.x, item.y, item.width, item.height);
        ctx.fill();
    }
}