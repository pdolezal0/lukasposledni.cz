/** @type {import("prettier").Config} */

export default {
    singleQuote: true,
    jsxSingleQuote: true,
    semi: false,
    printWidth: 80,
    trailingComma: 'all',
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
}
