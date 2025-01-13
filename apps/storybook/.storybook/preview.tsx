import "./style.css";

import { ComposerKitProvider } from "@composer-kit/ui/core";
import { themes } from "@storybook/theming";
import { useDarkMode, DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import React, { useEffect } from "react";
import { addons } from "@storybook/preview-api";

import { Preview } from "@storybook/react";

const channel = addons.getChannel();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark },
      // Override the default light theme
      light: { ...themes.light },
      stylePreview: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: ({ children, context }) => {
        const [darkMode, setDarkMode] = React.useState(false);
        React.useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDarkMode);
        }, []);

        return (
          <DocsContainer
            context={context}
            theme={
              darkMode
                ? {
                    ...themes.dark,
                  }
                : {
                    ...themes.light,
                  }
            }
          >
            {children}
          </DocsContainer>
        );
      },
    },
  },
  decorators: [
    (Story) => {
      const isDark = useDarkMode();

      useEffect(() => {
        document.documentElement.classList.remove(isDark ? "light" : "dark");
        document.documentElement.classList.add(isDark ? "dark" : "light");
      }, [isDark]);

      return (
        <ComposerKitProvider colorMode={isDark ? "dark" : "light"}>
          <Story />
        </ComposerKitProvider>
      );
    },
  ],
};

export default preview;
