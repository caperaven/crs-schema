import {BaseProvider} from "./../../src/html/providers/base-provider.js";

export default class MaterialHeaderProvider extends BaseProvider {
    get key() {
        return "material-header"
    }

    get template() {
        return `
            <header class="mdc-top-app-bar">
              <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                  <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
                  <span class="mdc-top-app-bar__title">__caption__</span>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                  <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Download">file_download</button>
                  <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Print this page">print</button>
                  <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Bookmark this page">bookmark</button>
                </section>                
              </div>
            </header>        
        `;
    }

    process(item) {
        this.parser.addStyleImports([
            "/node_modules/@material/top-app-bar/dist/mdc.top-app-bar.min.css",
            "/node_modules/@material/icon-button/dist/mdc.icon-button.min.css"
        ]);

        return this.setValues(this.template, {
            "__caption__": this.parser.parseStringValue(item.caption)
        })
    }
}