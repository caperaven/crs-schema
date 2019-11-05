export const template = {
    "variables": {
        "translations": {
            "heading": "Welcome Material",
            "alarm": "Alarm",
            "bookmark": "Bookmark"
        }
    },
    "body": {
        "elements": [
            {
                "element": "header",
                "elements": [
                    {
                        "element": "header-bar",
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
                    }
                ]
            },
            {
                "element": "main",
                "elements": [
                    {
                        "element": "button",
                        "caption": "Add",
                        "icon": "add",
                        "styles": ["mdc-button--raised"]
                    }
                ]
            }
        ]
    }
};