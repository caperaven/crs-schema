import HeaderProvider from "./providers/header.js";
import ButtonProvider from "./providers/button.js";

self.crs = self.crs || {};
self.crs.material = {
    HeaderProvider: HeaderProvider,
    ButtonProvider: ButtonProvider
};