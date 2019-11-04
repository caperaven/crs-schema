export class BaseManager {
    constructor(schemaManager) {
        this.schemaManager = schemaManager;
    }
    
    dispose() {
        delete this.schemaManager;    
    }
}