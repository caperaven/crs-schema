export class BaseManager {
    constructor(parser) {
        this.parser = parser;
    }
    
    dispose() {
        this.reset();
        delete this.parser;
    }

    reset() {
    }
}