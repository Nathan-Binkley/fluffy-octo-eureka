import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Modal, Navbar } from '@mantine/core';

export const metadata = {
  title: 'Tech Assessment',
  description: 'Technical Assessment for Comments a la YouTube',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}