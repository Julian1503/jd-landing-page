import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: "../next.config.js",
    },
  },
  staticDirs: [
    { from: "../public", to: "/" },
  ],
  webpackFinal: async (sbConfig) => {
    if (sbConfig.resolve) {
      sbConfig.resolve.alias = {
        ...(sbConfig.resolve.alias || {}),
        "@": path.resolve(__dirname, "../src"),
      };
      sbConfig.resolve.extensionAlias = {
        ".js": [".ts", ".tsx", ".js", ".jsx"],
        ".mjs": [".mts", ".mjs"],
      };
    }
    return sbConfig;
  },
};

export default config;
