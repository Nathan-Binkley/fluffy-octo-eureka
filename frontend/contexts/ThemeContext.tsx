'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { theme as defaultTheme } from '../app/theme';

interface ThemeContextType {
    theme: MantineThemeOverride;
    updateTheme: (newTheme: Partial<MantineThemeOverride>) => void;
    resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<MantineThemeOverride>(defaultTheme);

    const updateTheme = (newTheme: Partial<MantineThemeOverride>) => {
        setCurrentTheme((prev: MantineThemeOverride) => ({ ...prev, ...newTheme }));
    };

    const resetTheme = () => {
        setCurrentTheme(defaultTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, updateTheme, resetTheme }}>
            <MantineProvider theme={currentTheme}>
                {children}
            </MantineProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}

