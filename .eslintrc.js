module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: '@react-native',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // we want to force semicolons
    semi: ['error', 'always'],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
  },
};
