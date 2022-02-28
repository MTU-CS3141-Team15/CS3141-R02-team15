const config = {
  ...require("config/eslint-preset"),
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};

config.extends.unshift("react-app", "react-app/jest");

module.exports = config;
