const config = {
  ...require("config/eslint-preset"),
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};

module.exports = config;
