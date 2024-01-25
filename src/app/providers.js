"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
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
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
