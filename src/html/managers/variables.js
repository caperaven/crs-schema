import {BaseManager} from "./base-manager.js";
import {assocations} from "./associations.js";

export default class VariablesManager extends BaseManager {
    get key() {
        return "variables"
    }

    get association() {
        return [assocations.content, assocations.attrValue];
    }

    initialize(variables) {
        this.variables = variables;
    }
}