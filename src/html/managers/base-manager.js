export class BaseManager {
    constructor(parser) {
        this.parser = parser;
        this.isManager = true;
    }
    
    async dispose() {
        await this.reset();
        delete this.parser;
    }

    async assert(callback, errors, message) {
        const failed = callback() == true;

        if (failed) {
            errors.push(message)
        }

        return !failed;
    }

    async reset() {
        // override to clear
    }
}