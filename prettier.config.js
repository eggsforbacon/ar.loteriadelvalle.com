module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  bracketSameLine: true,
  trailingComma: "es5",
  endOfLine: "crlf",

  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindAttributes: ["className"],
};
