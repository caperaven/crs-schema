import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "material/index.js",
        output: [
            { file: 'dist/material.js', format: 'iife', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "material/index.cjs.js",
        output: [
            { file: 'dist/cjs/material.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/es/crs-schema.js', format: 'es', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/cjs/crs-schema.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/schema.js",
        output: [
            { file: 'dist/iife/crs-schema.js', format: 'iife', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/es/html/crs-html-parser.js', format: 'es', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/cjs/html/crs-html-parser.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/html-parser.js",
        output: [
            { file: 'dist/iife/html/crs-html-parser.js', format: 'iife', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },


    {
        input: "src/html/template-parser.js",
        output: [
            { file: 'dist/es/html/crs-template-parser.js', format: 'es', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/template-parser.js",
        output: [
            { file: 'dist/cjs/html/crs-template-parser.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/template-parser.js",
        output: [
            { file: 'dist/iife/html/crs-template-parser.js', format: 'iife', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/providers/base-provider.js",
        output: [
            { file: 'dist/es/html/crs-base-provider.js', format: 'es', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/providers/base-provider.js",
        output: [
            { file: 'dist/cjs/html/crs-base-provider.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/managers/base-manager.js",
        output: [
            { file: 'dist/es/html/crs-base-manager.js', format: 'es', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/html/managers/base-manager.js",
        output: [
            { file: 'dist/cjs/html/crs-base-manager.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/base-parser.js",
        output: [
            { file: 'dist/es/base-parser.js', format: 'es', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/base-parser.js",
        output: [
            { file: 'dist/cjs/base-parser.js', format: 'cjs', sourcemap: true}
        ],
        plugins: [
            terser()
        ]
    }
];