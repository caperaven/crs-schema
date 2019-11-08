# Using crs-schema on the web

```js
import {createSchemaLoader} from "[...path]/es/crs-schema.js";
import {HTMLParser} from "[...path]/es/html/crs-html-parser.js";
import HeaderProvider from "[...path]/material/providers/header.js";
import ButtonProvider from "[...path]/material/providers/button.js";

createSchemaLoader(new HTMLParser()).then(async manager => {
    manager.register(HeaderProvider);
    manager.register(ButtonProvider);

    document.body.innerHTML = manager.parse(template);
});
```

If you want to parse several schemas, cache the manager and call parse as and when you need it.