import type { Preview } from "@storybook/nextjs";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "hsl(0 0% 100%)" },
        { name: "dark", value: "hsl(240 10% 4%)" },
      ],
    },
  },
};

export default preview;
