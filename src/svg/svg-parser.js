import {BaseParser} from "../base-parser.js";
import BodyProvider from "./providers/body.js";
import RawProvider from "./providers/raw.js";

export class SvgParser extends BaseParser {
    async initialize() {
        await this.register(RawProvider);
        await this.register(BodyProvider);
    }

    async parse(schema, data) {
        this._data = data;
        const body = schema.body;
        const provider = this.providers["body"];
        const result = await provider.process(body);
        delete this._data;
        return result;
    }

    async parseChildren(item, parent) {
        const children = item.elements;
        if (children == null) return null;

        for (let child of children) {
            const childElement = await this.parseItem(child, parent);
            parent.appendChild(childElement, parent);
        }
    }

    async parseItem(item, parent) {
        const key = item.element;
        const provider = this.providers[key] || this.providers["raw"];
        return await provider.process(item, parent);
    }

    getDataValue(path) {
        return this._getValueOnPath(this._data, path.replace("$", ""));
    }

    _getValueOnPath(object, path) {
        let obj = object;
        if (path.indexOf(".") == -1) {
            return obj[path];
        }

        const parts = path.split(".");
        for (let i = 0; i < parts.length -1; i++) {
            const part = parts[i];
            obj = obj[part];
            if (obj == null) return null;
        }
        return obj[parts[parts.length -1]];
    }
}