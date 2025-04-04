import React, { useState } from "react";
import type { Preview } from '@storybook/react'
import "../app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const [queryClient] = useState(() => new QueryClient());

      return (
        <QueryClientProvider client={queryClient} >
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;