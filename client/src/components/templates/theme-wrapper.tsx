import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from '@/lib/stores/theme.store';
import { Toaster } from 'sonner';

export function ThemeWrapper() {
  const { theme } = useThemeStore()
  
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <>
      <Toaster position="top-right" richColors />
      <Outlet />
    </>
  );
} 