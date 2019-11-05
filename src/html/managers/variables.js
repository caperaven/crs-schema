import {BaseManager} from "./base-manager.js";

export default class VariablesManager extends BaseManager {
    get key() {
        return "variables"
    }

    get valueProcessor() {
        return true;
    }

    reset() {
        delete this.variables;
    }

    initialize(variables) {
        this.variables = variables;
    }

    process(value) {
        if (value.trim()[0] != "@") return value;

        //JHR: make this async and put a catch on it

        value = value.slice(1);
        let fn = new Function("variables", `return variables.${value}`);
        const result = fn(this.variables);
        fn = null;
        return result;
    }
}