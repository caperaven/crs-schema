importScripts("/dist/iife/crs-schema.js", "/dist/iife/html/crs-html-parser.js");

let manager;
self.crs.createSchemaLoader(new self.crs.HTMLParser())
    .then(result => {
        manager = result;
        postMessage("ready");
    });

onmessage = (msg) => {
    const html = manager.parse(msg.data);
    postMessage(html);
};