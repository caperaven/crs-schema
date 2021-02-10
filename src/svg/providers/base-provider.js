export class SvgBaseProvider {
    constructor(parser) {
        this.parser = parser;
    }

    dispose() {
        delete this.parser;
    }

    async process(item, element) {
        if (item.attributes != null) {
            const keys = Object.keys(item.attributes);
            for (let key of keys) {
                element.setAttribute(key, item.attributes[key]);
            }
        }

        if (item.elements != null) {
            await this.parser.parseChildren(item, element);
        }
    }

    async getPropertyValue(value) {
        if (value.indexOf("$") == 0) {
            value = value.replace("$", "");
            return this.parser.getDataValue(value);
        }
        return value;
    }
}