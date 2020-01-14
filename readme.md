# UI Schema

## Introduction
This provides a way for you to have schema driven UI.

## Schema
The schema is a json structure that defines a user interface.
The schema is interpreted using a parser.
There is a HTMLParser that ships with the standard package.

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
