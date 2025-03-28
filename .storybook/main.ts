import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "build": {
    "test": {
      "disabledAddons": ['@storybook/addon-docs', '@storybook/addon-essentials/docs'],
    },
  },
  "addons": [
    "@storybook/addon-actions",
    // '@storybook/addon-interactions',
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          exclude: ['**/components/**/index.ts'],
        },
      },
    },
    {
      name: 'storybook-addon-module-mock',
      options: {
        exclude: ['**/node_modules/@mui/**'],
      },
    },
  ],
  "framework": {
    // "name": "@storybook/experimental-nextjs-vite",
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ]
};
export default config;