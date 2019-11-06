import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/es/crs-schema.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/cjs/crs-schema.js', format: 'cjs' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/iife/crs-schema.js', format: 'iife' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/es/html/crs-html-parser.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/cjs/html/crs-html-parser.js', format: 'cjs' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/iife/html/crs-html-parser.js', format: 'iife' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/providers/base-provider.js",
        output: [
            { file: 'dist/es/html/crs-base-provider.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/providers/base-provider.js",
        output: [
            { file: 'dist/cjs/html/crs-base-provider.js', format: 'cjs' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/managers/base-manager.js",
        output: [
            { file: 'dist/es/html/crs-base-manager.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/managers/base-manager.js",
        output: [
            { file: 'dist/cjs/html/crs-base-manager.js', format: 'cjs' }
        ],
        plugins: [
            terser()
        ]
    }
];