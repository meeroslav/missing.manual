import nx from '@nx/eslint-plugin';
import jsoncEslintParser from 'jsonc-eslint-parser';

export default [
  {
    // web-gatsby has no ESLint config of its own and was never linted under the
    // old root .eslintrc.json (ignorePatterns: ["**/*"]); keep it unlinted.
    ignores: ['apps/web-gatsby/**'],
  },
  ...nx.configs['flat/base'],
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: jsoncEslintParser,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
];
