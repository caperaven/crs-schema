import {beforeAll, afterAll, afterEach, beforeEach, describe, it} from "https://deno.land/std@0.157.0/testing/bdd.ts";
import { assertEquals, assertExists, assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import "./../src/schema.js";
import {HTMLParser} from "./../src/html/html-parser.js";

let parser;

beforeAll(async () => {
    parser = await crs.createSchemaLoader(new HTMLParser(null));
})

describe("html parser tests", async () => {
    it ("parse simple schema", async () => {
        const result = await parser.parse({
            body: {
                elements: [
                    {
                        element: "div",
                        content: "hello world"
                    }
                ]
            }
        });

        assertEquals(result, "<div  >hello world</div>");
    })

    it ("variables", async () => {
        const result = await parser.parse({
            variables: {
                translations: {
                    "heading": "hello world"
                }
            },
            body: {
                elements: [
                    {
                        element: "h1",
                        content: "@translations.heading"
                    }
                ]
            }
        });

        assertEquals(result, "<h1  >hello world</h1>");
    })

    it ("templates", async () => {
        const result = await parser.parse({
            variables: {
                translations: {
                    "heading": "hello world"
                }
            },

            templates: [
                {
                    "id": 0,
                    "elements": [
                        {
                            "element": "div",
                            "content": "@translations.heading"
                        }
                    ]
                }
            ],

            body: {
                elements: [
                    {
                        element: "template",
                        template: 0
                    }
                ]
            }
        });

        assert(result.indexOf("<div  >hello world</div>") != -1);
    })
})