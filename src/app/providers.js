"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
      colors: {
	orange:{
		600: "#FBD38D",
		50: "rgba(251, 211, 141, 0.12)",
	}
      },
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "",
      },
    }),
  },
});

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ChakraProvider resetCSS={false} cssVarsRoot="body" theme={theme}>{children}</ChakraProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
