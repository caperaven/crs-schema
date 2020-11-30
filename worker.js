importScripts("/dist/iife/crs-schema.js", "/dist/iife/html/crs-html-parser.js", "/dist/material.js");

let manager;
self.crs.createSchemaLoader(new self.crs.HTMLParser())
    .then(async result => {
        manager = result;
        await manager.register(self.crs.material.HeaderProvider);
        await manager.register(self.crs.material.ButtonProvider);
        postMessage("ready");
    });

onmessage = async (msg) => {
    const html = await manager.parse(msg.data);
    postMessage(html);
};