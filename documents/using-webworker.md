# Using crs-schema in a webworker

For this to work you need to initialize crs-schema in a worker and then send the schema to it for processing.
Here is a example worker.

## Worker.js
```js
importScripts("[...path]/iife/crs-schema.js", "[...path]/iife/html/crs-html-parser.js", "[...path]/material.js");

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
```

## Index.html
```js
import {template} from "./schema.js";

const worker = new Worker('worker.js');

worker.onmessage = (e) => {
    if (e.data == "ready") {
        worker.postMessage(template);
    }
    else {
        document.body.innerHTML = e.data;
    }
};
```