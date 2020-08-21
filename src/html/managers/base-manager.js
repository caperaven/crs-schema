export class BaseManager {
    constructor(parser) {
        this.parser = parser;
        this.isManager = true;
    }
    
    dispose() {
        this.reset();
        delete this.parser;
    }

    assert(callback, errors, message) {
        const failed = callback() == true;

        if (failed) {
            errors.push(message)
        }

        return !failed;
    }

    validate(item, errors) {
        if (item.elements != null) {
            for (let element of item.elements) {
                this.parser.validateItem(element, errors);
            }
        }
    }

    reset() {
        // override to clear
    }
}