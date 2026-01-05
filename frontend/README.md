# Frontend - Next.js with Mantine v5

This is a Next.js application with Mantine v5 UI components.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **Mantine v5** - UI component library
- **TypeScript** - Type safety
- **Tabler Icons** - Icon library
- **Theme Context** - Custom theme management

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx    # Root layout with Theme provider
│   ├── page.tsx      # Home page with theme demo
│   ├── theme.ts      # Theme configuration
│   └── globals.css   # Global styles
├── contexts/
│   └── ThemeContext.tsx  # Theme context provider
├── components/
│   └── ThemeSwitcher.tsx # Example theme switcher component
├── package.json
├── tsconfig.json
└── next.config.js
```

## Theme Context Usage

The app includes a custom theme context that wraps Mantine's theme provider. You can use it in any component:

```tsx
'use client';

import { useThemeContext } from '../contexts/ThemeContext';
import { useMantineTheme } from '@mantine/core';

export function MyComponent() {
  const { theme, updateTheme, resetTheme } = useThemeContext();
  const mantineTheme = useMantineTheme();

  // Update theme dynamically
  const changeColor = () => {
    updateTheme({ primaryColor: 'green' });
  };

  return (
    // Your component JSX
  );
}
```

### Theme Context API

- `theme` - Current theme object
- `updateTheme(newTheme)` - Update theme with partial theme object
- `resetTheme()` - Reset theme to default configuration

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine Documentation](https://mantine.dev/)
- [Mantine v5 Documentation](https://v5.mantine.dev/)

