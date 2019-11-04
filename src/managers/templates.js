import {BaseManager} from "./base-manager.js";
import {assocations} from "./associations.js";

export default class TemplatesManager extends BaseManager {
    get key() {
        return "template"
    }

    get association() {
        return [assocations.attrName]
    }
}