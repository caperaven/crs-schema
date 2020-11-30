export const template = {
    "variables": {
        "translations": {
            "heading": "Welcome Material",
            "alarm": "Alarm",
            "bookmark": "Bookmark"
        }
    },

    "uiTemplates": [
        {
            "id": 0,
            "elements": [
                {
                    "element": "h1",
                    "content": "Hello World"
                }
            ]
        },
        {
            "id": 1,
            "elements": [
                {
                    "element": "h2",
                    "content": "Hello World"
                }
            ]
        }
    ],

    "templates": [
        {
            "import": "uiTemplates"
        },
        {
            "id": 0,
            "elements": [
                {
                    "element": "group",
                    "content": "@translations.heading"
                }
            ]
        },
        {
            "id": 1,
            "elements": [
                {
                    "element": "group",
                    "caption": "Main Group",
                    "elements": [
                        {
                            "element": "div",
                            "content": true
                        }
                    ]
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
                    },
                    {
                        "element": "template",
                        "uiTemplates": 0,
                    },
                    {
                        "element": "template",
                        "uiTemplates": 1,
                    },
                    {
                        "element": "template",
                        "template": 1
                    },
                ]
            }
        ]
    }
};