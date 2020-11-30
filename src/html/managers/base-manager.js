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

    async validate(item, errors) {
        if (item.elements != null) {
            for (let element of item.elements) {
                await this.parser.validateItem(element, errors);
            }
        }
    }

    async reset() {
        // override to clear
    }
}