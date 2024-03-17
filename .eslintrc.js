module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-console': ['warn', {allow: ['info', 'warn', 'error']}],

    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',

    'max-len': [0, 120],
  },
};
