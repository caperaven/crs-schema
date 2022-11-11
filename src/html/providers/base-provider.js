export class BaseProvider {
    #parser;

    get parser() {
        return this.#parser;
    }
    
    constructor(parser) {
        this.#parser = parser;
    }

    async dispose() {
        this.#parser = null;
    }

    /**
     * This function will be called for each provider to do some validation checks if the item can be parsed
     * @param item
     */
    async shouldParse(item) {
        return true;
    }
    
    async process(item, ctx) {
        if (this.styles != null) {
            item.styles = [];
        }

        const children = await this.#parser.parseChildren(item, ctx);
        const attributes = await this.#parser.parseAttributes(item);
        const styles = await this.#parser.parseStyles(item);
        const content = await this.#parser.parseContent(item);

        return {
            children: children,
            attributes: attributes,
            styles: styles,
            content: content
        }
    }

    async setValues(str, obj) {
        const keys = Object.keys(obj);
        for (let key of keys) {
            const value = obj[key] != null ? obj[key] : "";
            str = str.split(key).join(value);
        }
        return str;
    }

    async assert(callback, errors, message) {
        const failed = (await callback()) == true;

        if (failed) {
            errors.push(message)
        }

        return !failed;
    }
}