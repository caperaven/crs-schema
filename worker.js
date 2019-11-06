importScripts("/dist/iife/crs-schema.js", "/dist/iife/html/crs-html-parser.js", "/dist/material.js");

let manager;
self.crs.createSchemaLoader(new self.crs.HTMLParser())
    .then(result => {
        manager = result;
        manager.register(self.crs.material.HeaderProvider);
        manager.register(self.crs.material.ButtonProvider);
        postMessage("ready");
    });

onmessage = (msg) => {
    const html = manager.parse(msg.data);
    postMessage(html);
};