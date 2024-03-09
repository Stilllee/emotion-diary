/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        bgLight: "#f6f6f6",
        btnLight: "#ececec",
        lineLight: "#e2e2e2",
        bgDark: "#0e1725",
        btnDark: "#1e293b",
        lineDark: "#3f4d5c",
        navy: "#0f172a",
        yellow: "#fdce17",
        orange: "#fd8446",
        red: "#fd565f",
        yellowGreen: "#9dd772",
        green: "#64c964",
      },
    },
  },
  plugins: [],
};
