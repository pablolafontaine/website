"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <IconButton
      colorScheme={theme == "dark" ? "orange" : "purple"}
      aria-label="Toggle Theme"
      variant="outline"
      size="lg"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      icon={theme == "dark" ? <SunIcon /> : <MoonIcon />}
    />
  );
}
