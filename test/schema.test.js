import {createSchemaLoader} from "./../src/schema.js";
import {HTMLParser} from "./../src/html/html-parser.js";
import {TemplateParser} from "../src/html/template-parser.js";
import {template} from "./../schema.js";
import HeaderProvider from "./../material/providers/header.js";

test("createSchemaLoader", async () => {
    const parser = new HTMLParser();
    const manager = await createSchemaLoader(parser);
    await manager.register(HeaderProvider);

    const result = await manager.parse(template);
    await parser.dispose();

    expect(result.length).toBeGreaterThan(0);
});

test("validate", async () => {
    const parser = new HTMLParser();
    const manager = await createSchemaLoader(parser);
    await manager.register(HeaderProvider);

    await parser.dispose();
});

test("template parser", async () => {
    const parser = new TemplateParser(template);
    const manager = await createSchemaLoader(parser);
    await manager.register(HeaderProvider);

    const result = await manager.parse(0);
    await parser.dispose();

    expect(result.indexOf("Welcome Material")).toBeGreaterThan(0);
});