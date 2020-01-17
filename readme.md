# UI Schema

## Introduction
This provides a way for you to have schema driven UI.
crs schema is modular allowing you to provide any feature you need.
Though the default generates html you can really generate whatever you want by writing your own parsers.

## Schema
The schema is a json structure that defines a user interface.
The schema is interpreted using a parser.
There is a HTMLParser and TemplateParser that ships with the standard package.

## Parsing
The parser uses managers and providers to process the schema and generate the relevant markup.  

Providers are used to generate UI markup from elements.  
Managers are used to assist providers and manage data structures.

The best way to explain this is by using a example.
For this example I will use the template ability of the HTMLParser.  

Templates define reusable data structures.
They are defined in a "templates" property.

```json
{
  "templates": [
    {
      "id": 0,
      "elements": [
        {
          "element": "div",
          "content": "Hello World"
        } 
      ] 
    } 
  ],
  "body": {
    "elements": [
      {
        "element": "template",
        "template": 0
      }
    ] 
  } 
}
```

To define the location of where the template is rendered we use a "template" element.  
The template element uses the template id to define the actual template to use.
In the above example the template element uses the template with id 0.

It can be difficult to mange a lot of templates and you may want to group them in different lists.
You can do this on the root level of the schema where you can create different template lists.

```json
{
  "uiTemplates": [
      ... normal template definition
  ],
  "templates": [
     {
        "import": "uiTemplates"
     }
  ]
}
```
In the above example you can see ware are importing uiTemplates in templates.
To prevent id clash they are managed seperate.
This means that when you use it you need be a bit more explicit.

First a example of a normal template usage 
```json
{
    "element": "template",
    "template": 0,
},
```

Next using a template defined in the uiTemplates collection
```json
{
    "element": "template",
    "uiTemplates": 0,
},
```

When using a imported custom template collection you need to define what the template collection is using that name in your usage definition.

## Starting the process
To start using the schema you need to first initialize it

```js
import {createSchemaLoader} from "/node_modules/crs-schema/es/crs-schema.js";
import {HTMLParser} from "/node_modules/crs-schema/es/html/crs-html-parser.js";

createSchemaLoader(new HTMLParser()).then(async manager => {
    manager.register(MyProvider);
})
```

## Custom provider
```js
import {BaseProvider} from "/node_modules/crs-schema/es/html/crs-base-provider.js"

export default class GroupProvider extends BaseProvider {
        get key() {
            return "button"
        }
    
        get template() {
            return `<button __attributes__ __styles__>
                        __icon__
                        <span class="mdc-button__label">__caption__</span>
                    </button>`;
        }

    process(item) {
        const parts = super.process(item);

        if (parts.styles == null) {
            parts.styles = 'class="mdc-button"'
        }
        else {
            parts.styles = parts.styles.split('="').join('="mdc-button ')
        }

        this.parser.addStyleImports([
            "/node_modules/@material/button/dist/mdc.button.css",
        ]);

        const icon = item.icon != null ? this.iconTemplate.split("__icon__").join(item.icon) : "";

        return this.setValues(this.template, {
            "__icon__": icon,
            "__caption__": icon.caption,
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}
```

this.setValues is a function on the base provider.

## Validating schema
You can use the manager to validate if the schema object is formatted correctly.

```js
createSchemaLoader(new HTMLParser()).then(async manager => {
    const result = manager.validate(json);
})
```

Providers need a validate function.

```js
validate(item, errors) {
    this.assert(() => item.caption == null, errors, "button must have a caption");
    super.validate(item, errors);
}
```

this.assert is a build in function of the base provider

## Webworker
This can function on a web worker

```js
const worker = new Worker('worker.js');

worker.onmessage = (e) => {
    // when the worker is ready, send it the template to process
    if (e.data == "ready") {
        worker.postMessage(template);
    }
    else {
        // append the html the worker sent back
        document.body.innerHTML = e.data;
    }
};
```

See the following worker logic

```js
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
```

if you are using modular web workers you can import them using normal es6 modules.
In this example we are not using modular workers as at this time it was not supported in chrome and thus we need to use iife.

The material.js file is a bundled file (you can just use rollup) and can look like this

```js
import HeaderProvider from "./providers/header.js";
import ButtonProvider from "./providers/button.js";

globalThis.crs = globalThis.crs || {};
globalThis.crs.material = {
    HeaderProvider: HeaderProvider,
    ButtonProvider: ButtonProvider
};
```

## Template Parser
All the examples above use the html parser that parses the schema once to html and then is done.
The template parser is a bit different.
It does not parse the entire document in one go, but instead you can ask for a template at a time using the template's id defined in the schema.

Consider the following schema structure

```json
{
    "templates": [
        {
            "id": 0,
            "elements": [
                {
                    "element": "div",
                    "content": "Hello world"
                }
            ]
        }
    ]
}
```
If I wanted the HTML for that template i can use the template parser and for template 0.

```js
createSchemaLoader(new TemplateParser(template)).then(async manager => {
    const result = manager.parse(0);
    console.log(result);
});
```

You will notice that it looks a lot like the template parser, but in this case you parse the template on during the constructor.
This means that you need to manually dipose the manager when you are done with it, but it also means that you can call the parse of the manager when ever you need it.

This is useful when you want to generate bit's and bobs of HTML and not all at once.

##Variables
You can declare variables in the schema under a variables property.

```json
{
  "variables": {
    "translations": {
      "heading": "Hello World"
    } 
  }
}
```

In the above example we created a sub object in the variables called translations where you can insert the translated text.
When you want to use that you need to refer to the path of the variable you want to use.

```json
"caption": "@translations.heading"
```

If you create custom providers for different scenarios you need to ensure you use parseStringValue.
Different managers are value processors. That means that they are called before setting the final value and they manipulate the final result.
By default the schema parser has a variables manager that enables the variables function.

The variables manager extends BaseManager but has a extra property.

```js
get valueProcessor() {
    return true;
}
```

Consider the following process code of a provider

```js
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
```

You can see that it calls the parsers's parseStringValue function.
This will loop through all the value processors, make changes and send you the result back.

The parser base has some other functions you may want to take note of

1. parseAttributes
1. parseStyles
1. parseChildren
1. parseContent

The process function on the base provider already calls all those by default for you to use as it returns you the processed parts as.

```js
{
    children: children,
    attributes: attributes,
    styles: styles,
    content: content
}
```

so in your process function you can use it this way.

```js
const parts = super.process(item);
return parts.children;
```

here is a more complete example of a provider

```js
import {BaseProvider} from "./pathtobaseprovider/crs-base-provider.js";

export default class GroupProvider extends BaseProvider {
    get key() {
        return "group"
    }

    get template() {
        return `<div role="group" __attributes__ __styles__>
                    <header><h2>__caption__</h2></header>
                    <div data-container="true"></div>
                </div>`
    }

    process(item) {
        const parts = super.process(item);

        return this.setValues(this.template, {
            "__caption__": this.parser.parseStringValue(item.caption),
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}
```