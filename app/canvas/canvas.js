import {CanvasParser} from "./parsers/canvas-parser.js";

export default class Canvas extends crsbinding.classes.ViewBase {
    #parser;

    async connectedCallback() {
        await super.connectedCallback();
        this.#parser = await crs.createSchemaLoader(new CanvasParser());

        const json = await fetch(import.meta.url.replace(".js", ".json")).then(result => result.json());

        requestAnimationFrame(() => {
            const ctx = this._element.querySelector("canvas").getContext("2d");
            this.#parser.parse(json, ctx);
        })
    }
}