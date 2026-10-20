/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'scss/at-mixin-pattern': null,
    'max-nesting-depth': 5,
    'declaration-empty-line-before': null,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  ignoreFiles: ['dist/**', 'node_modules/**'],
};
