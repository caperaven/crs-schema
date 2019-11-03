export class Schema {
    constructor() {
        this.options = {
            elementKey: "element",
            childrenKey: "elements",
            attributesKey: "attributes",
            stylesKey: "styles",
            root: "body",
            contentKey: "content",

            variables: "variables",
            templates: "templates",
            datasets: "datasets",
            datasources: "datasources",
            events: "customEvents",
            triggers: "customTriggers",
            perspectives: "perspectives"
        };

        this.data = {};
        this.providers = new Map();
    }

    dispose() {
        delete this.data;
        delete this.options;

        this.providers.clear();
        delete this.providers;
    }

    register(providerType) {
        const instance = new providerType();
        this.providers.set(instance.key, instance);
    }

    parse(schema) {
        return this.parseItem(schema[this.options.root] != null ? schema[this.options.root] : schema, this.options.root);
    }

    parseItem(item, key) {
        key = key || item[this.options.elementKey];
        if (this.providers.has(key)) {
            return this.providers.get(key).process(item);
        }
        else {
            return this.providers.get("raw").process(item, key);
        }
    }

    parseAttributes(item) {
        if (item[this.options.attributesKey] == null) return null;
        return "";
    }

    parseStyles(item) {
        if (item[this.options.stylesKey] == null) return null;
        return "";
    }

    parseChildren(item) {
        const children = item[this.options.childrenKey];
        if (children == null) return null;

        const result = [];
        for (let child of children) {
            result.push(this.parseItem(child));
        }
        return result.join("");
    }

    parseContent(item) {
        const content = item[this.options.contentKey];
        if (content == null) return null;

        // check for variable content
        return content;
    }
}

window.crs = {schema: new Schema()};
// JHR: todo: check for globals so that it attaches to window or globals if it runs in node.


