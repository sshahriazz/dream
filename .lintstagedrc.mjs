const config = {
  // Lint & format TypeScript/JavaScript files
  "*.{ts,tsx,js,jsx,mjs}": ["eslint --fix", "prettier --write"],

  // Format-only for non-code files
  "*.{json,css,md}": ["prettier --write"],
};

export default config;
