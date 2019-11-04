import {BaseManager} from "./base-manager.js";

export default class VariablesManager extends BaseManager {
    get key() {
        return "variables"
    }

    initialize(variables) {
        this.variables = variables;
    }
}