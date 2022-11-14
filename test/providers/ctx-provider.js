export class CtxProvider {
    #parser;

    get parser() {
        return this.#parser;
    }

    get key() {
        return "ctx"
    }

    constructor(parser) {
        this.#parser = parser;
    }

    async dispose() {
        this.#parser = null;
    }

    async process(item, ctx) {
        ctx.called = true;
    }

    async shouldParse(item) {
        return true;
    }
}