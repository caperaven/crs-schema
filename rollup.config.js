import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/index.js",
        output: [
            { file: 'dist/crs-ui-schema.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/managers/templates.js",
        output: [
            { file: 'dist/crs-ui-templates.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
    {
        input: "src/managers/variables.js",
        output: [
            { file: 'dist/crs-ui-variables.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    },
];