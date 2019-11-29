import HeaderProvider from "./providers/header.js";
import ButtonProvider from "./providers/button.js";

globalThis.crs = self.crs || {};
globalThis.crs.material = {
    HeaderProvider: HeaderProvider,
    ButtonProvider: ButtonProvider
};