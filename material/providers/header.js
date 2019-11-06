import {BaseProvider} from "./../../src/html/providers/base-provider.js";

export default class MaterialHeaderProvider extends BaseProvider {
    get key() {
        return "header"
    }

    get template() {
        return `
            <header class="mdc-top-app-bar">
              <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                  <button id="btnMenu" class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
                  <span class="mdc-top-app-bar__title">__caption__</span>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                __actions__
                </section>                
              </div>
            </header>        
        `;
    }

    get buttonTemplate() {
        return `<button id="__id__" class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="__caption__">__icon__</button>`
    }

    _processButtons(item) {
        if (item.buttons == null) return "";

        const result = [];
        item.buttons.forEach(button => result.push(
            this.buttonTemplate
                .split("__id__").join(button.id)
                .split("__caption__").join(button.caption)
                .split("__icon__").join(button.icon))
        );
        return result.join("");
    }

    process(item) {
        this.parser.addStyleImports([
            "/node_modules/@material/top-app-bar/dist/mdc.top-app-bar.min.css",
            "/node_modules/@material/icon-button/dist/mdc.icon-button.min.css"
        ]);

        return this.setValues(this.template, {
            "__caption__": this.parser.parseStringValue(item.caption),
            "__actions__": this._processButtons(item)
        })
    }
}