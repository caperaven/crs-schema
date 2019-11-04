export class BaseProvider {
    constructor(schemaManager) {
        this.schemaManager = schemaManager;
    }

    dispose() {
        delete this.schemaManager;
    }
    
    process(item) {
        const children = this.schemaManager.parseChildren(item);
        const attributes = this.schemaManager.parseAttributes(item);
        const styles = this.schemaManager.parseStyles(item);
        const content = this.schemaManager.parseContent(item);

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
}