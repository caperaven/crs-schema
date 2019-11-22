export class BaseProvider {
    constructor(parser) {
        this.parser = parser;
    }

    dispose() {
        delete this.parser;
    }
    
    process(item) {
        if (this.styles != null) {
            item.styles = [];
        }

        const children = this.parser.parseChildren(item);
        const attributes = this.parser.parseAttributes(item);
        const styles = this.parser.parseStyles(item);
        const content = this.parser.parseContent(item);

        return {
            children: children,
            attributes: attributes,
            styles: styles,
            content: content
        }
    }

    setValues(str, obj) {
        const keys = Object.keys(obj);
        for (let key of keys) {
            const value = obj[key] != null ? obj[key] : "";
            str = str.split(key).join(value);
        }
        return str;
    }

    validate(item, errors) {
        if (item.elements != null) {
            for (let element of item.elements) {
                this.parser.validateItem(element, errors);
            }
        }
    }

    assert(callback, errors, message) {
        const failed = callback() == true;

        if (failed) {
            errors.push(message)
        }

        return !failed;
    }
}