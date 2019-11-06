import {BaseManager} from "./html/managers/base-manager.js";

export class BaseParser {
    constructor() {
        this.providers = new Map();
        this.managers = new Map();

        this.valueProcessors = [];
    }

    dispose() {
        this.providers.clear();
        delete this.providers;

        this.managers.clear();
        delete this.managers;

        this.valueProcessors.length = 0;
    }

    register(type) {
        const instance = new type(this);

        if (instance instanceof BaseManager) {
            this.managers.set(instance.key, instance);
            if (instance.valueProcessor == true) {
                this.valueProcessors.push(instance);
            }
        }
        else {
            this.providers.set(instance.key, instance);
        }
    }
}