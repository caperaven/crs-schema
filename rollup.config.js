import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/crs-schema.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/crs-html-parser.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/providers/base-provider.js",
        output: [
            { file: 'dist/html/crs-base-provider.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/managers/base-manager.js",
        output: [
            { file: 'dist/html/crs-base-manager.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    }
];