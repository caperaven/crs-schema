export const template = {
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
                    "element": "group",
                    "caption": "@translations.heading"
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