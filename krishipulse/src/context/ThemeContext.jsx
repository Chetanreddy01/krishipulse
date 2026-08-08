/**
 * KrishiPulse AI - Theme Context (Pure JavaScript)
 * Manages Paper White Light Mode & Linear Dark Mode switching.
 * Chetan: You can edit the default theme or add new themes here easily!
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Saved Theme or Default to Paper White
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('krishi_theme');
    return saved || 'paper-white';
  });

  const isDark = theme === 'linear-dark';

  // Apply data-theme attribute on <html> element
  useEffect(() => {
    localStorage.setItem('krishi_theme', theme);
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme, isDark]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'paper-white' ? 'linear-dark' : 'paper-white'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
