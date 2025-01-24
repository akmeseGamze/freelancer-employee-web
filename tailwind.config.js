/** @type {import('tailwindcss').Config} */

export default {
    plugins: [require("daisyui")],
    content: ["./src/**/*.jsx", "./src/index.html"],
    daisyui: {
        themes: ["corporate"],
    },
};