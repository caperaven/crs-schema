import {BaseManager} from "./base-manager.js";

export async function getValueOnPath(object, path) {
    let obj = object;
    if (path.indexOf(".") == -1) {
        return obj[path];
    }

    const parts = path.split(".");
    for (let i = 0; i < parts.length -1; i++) {
        const part = parts[i];
        obj = obj[part];
        if (obj == null) return null;
    }
    return obj[parts[parts.length -1]];
}

export default class VariablesManager extends BaseManager {
    get key() {
        return "variables"
    }

    get valueProcessor() {
        return true;
    }

    async reset() {
        delete this.variables;
    }

    async initialize(variables) {
        this.variables = variables;
    }

    async process(value) {
        return this.getValue(value);
    }

    async getValue(value) {
        if (typeof value != "string" || value.trim()[0] != "@") return value;
        return getValueOnPath(this.variables, value.slice(1));
    }
}