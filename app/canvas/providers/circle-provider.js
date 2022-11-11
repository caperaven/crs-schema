import {BaseProvider} from "../../../src/html/providers/base-provider.js";

export default class CircleProvider extends BaseProvider {
    get key() {
        return "circle"
    }

    async process(item, ctx) {
        ctx.beginPath();
        ctx.fillStyle = item.fill;
        ctx.arc(item.x, item.y, item.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}