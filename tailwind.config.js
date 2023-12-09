/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
