import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // 👇 添加这一项即可关闭 "Unexpected any" 的错误
      '@typescript-eslint/no-explicit-any': 'off',
    },
    overrides: [
      {
        files: ['jest.config.js'], // 只对 jest.config.js 文件生效
        rules: {
          // 关闭这条规则
          '@typescript-eslint/no-require-imports': 'off',
        },
      },
      {
        files: ['*.js'], // 或者对所有 *.js 文件生效
        rules: {
          '@typescript-eslint/no-require-imports': 'off',
        },
      },
    ],
  },
];

export default eslintConfig;
