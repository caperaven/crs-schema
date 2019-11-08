# Using crs-schema in nodejs

```js
const createSchemaLoader = require("[..path]/cjs/crs-schema.js").createSchemaLoader;
const HTMLParser = require("[..path]/cjs/html/crs-html-parser.js").HTMLParser;
const material = require("[..path]/cjs/material.js");

createSchemaLoader(new HTMLParser()).then(async manager => {
    manager.register(material.HeaderProvider);
    manager.register(material.ButtonProvider);

    const html = manager.parse(template);
    console.log(html);
});
```

If you want to parse several schemas, cache the manager and call parse as and when you need it.

