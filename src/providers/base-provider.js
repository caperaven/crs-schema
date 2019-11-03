export class BaseProvider {
    process(item) {
        const children = crs.schema.parseChildren(item);
        const attributes = crs.schema.parseAttributes(item);
        const styles = crs.schema.parseStyles(item);
        const content = crs.schema.parseContent(item);

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