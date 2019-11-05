export class Schema {
    constructor(parser, callback, addons) {
        this.parser = parser;
        this.parser.initialize(callback, addons).catch(error => console.log(error));
    }

    dispose() {
        this.parser.dispose();
        this.parser = null;
    }

    parse(schema) {
        return this.parser.parse(schema);
    }
}
