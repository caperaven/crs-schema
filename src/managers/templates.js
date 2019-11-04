import {BaseManager} from "./base-manager.js";

export class TemplatesManager extends BaseManager {
    get key() {
        return "template"
    }

    get association() {
        return [crs.schema.assocations.attrName]
    }

    constructor(schema) {
        super();
    }
}

crs.schema.register(TemplatesManager);