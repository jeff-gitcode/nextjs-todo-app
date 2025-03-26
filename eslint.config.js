// import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  {
    ignores: ['node_modules/', '.next/'],
  },
  // nextCoreWebVitals,
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': 'error',
      'no-console': 'warn',
    },
  },
];