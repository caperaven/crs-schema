import {BaseManager} from "./base-manager.js";

export class VariablesManager extends BaseManager {
    get key() {
        return "variable"
    }

    get association() {
        return [crs.schema.assocations.content, crs.schema.assocations.attrValue];
    }

    constructor(schema) {
        super();
    }
}

crs.schema.register(VariablesManager);