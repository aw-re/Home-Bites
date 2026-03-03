/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#a3a3a3',
                    600: '#8b8b8b',
                    700: '#6b6b6b',
                    800: '#525252',
                    900: '#3f3f3f',
                },
                accent: {
                    light: '#f9a826',
                    DEFAULT: '#f08a5d',
                    dark: '#b83b5e'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
