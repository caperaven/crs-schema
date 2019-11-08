const createSchemaLoader = require("./../dist/cjs/crs-schema.js").createSchemaLoader;
const HTMLParser = require("./../dist/cjs/html/crs-html-parser.js").HTMLParser;
const material = require("./../dist/cjs/material.js");

const template = {
    "variables": {
        "translations": {
            "heading": "Welcome Material",
            "alarm": "Alarm",
            "bookmark": "Bookmark"
        }
    },
    "templates": [
        {
            "id": 0,
            "elements": [
                {
                    "element": "div",
                    "content": "Ziggy has blue eyes"
                }
            ]
        }
    ],
    "body": {
        "elements": [
            {
                "element": "header",
                "caption": "@translations.heading",
                "buttons": [
                    {
                        "id": "btnAlarm",
                        "caption": "@translations.alarm",
                        "icon": "alarm"
                    },
                    {
                        "id": "btnBookmark",
                        "caption": "@translations.bookmark",
                        "icon": "bookmark"
                    }
                ]
            },
            {
                "element": "main",
                "elements": [
                    {
                        "element": "button",
                        "caption": "Add",
                        "icon": "add"
                    },
                    {
                        "element": "template",
                        "template": 0
                    }
                ]
            }
        ]
    }
};

createSchemaLoader(new HTMLParser()).then(async manager => {
    manager.register(material.HeaderProvider);
    manager.register(material.ButtonProvider);

    const html = manager.parse(template);
    console.log(html);
});

