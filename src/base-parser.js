import {BaseManager} from "./html/managers/base-manager.js";

export class BaseParser {
    constructor() {
        this.providers = new Map();
        this.managers = new Map();
    }

    dispose() {
        this.providers.clear();
        delete this.providers;

        this.managers.clear();
        delete this.managers;
    }

    _register(type) {
        const instance = new type(this);

        if (instance instanceof BaseManager) {
            this.managers.set(instance.key, instance);
            for (let association of instance.association) {
                const array = `${association}Managers`;
                if (this[array] != null) {
                    this[array].push(instance);
                }
            }
        }
        else {
            this.providers.set(instance.key, instance);
        }
    }
}