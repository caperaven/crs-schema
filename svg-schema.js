export const svgTemplate = {
    "body": {
        "elements": [
            {
                "element": "rect",
                "attributes": {
                    x: 10,
                    y: 10,
                    width: 100,
                    height: 100,
                    fill: "green"
                }
            },
            {
                "element": "group",
                "title": "$group.title",
                "width": 350,
                "attributes": {
                    "transform": "translate(100, 100)",
                },
                "elements": [
                    {
                        "element": "list",
                        "field": "items"
                    }
                ]
            }
        ]
    }
}