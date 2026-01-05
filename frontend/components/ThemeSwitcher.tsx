'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { useThemeContext } from '../contexts/ThemeContext';
import { useMantineTheme } from '@mantine/core';

export function ThemeSwitcher() {
  const { updateTheme, resetTheme } = useThemeContext();
  const theme = useMantineTheme();

  const colors = ['blue', 'green', 'red', 'violet', 'orange', 'teal', 'pink'];

  return (
    <Stack gap="sm">
      <Text size="sm" fw={500}>
        Primary Color: {theme.primaryColor}
      </Text>
      <Group gap="xs">
        {colors.map((color) => (
          <Button
            key={color}
            size="xs"
            variant={theme.primaryColor === color ? 'filled' : 'outline'}
            onClick={() => updateTheme({ primaryColor: color })}
          >
            {color}
          </Button>
        ))}
      </Group>
      <Button size="xs" variant="subtle" onClick={resetTheme}>
        Reset to Default
      </Button>
    </Stack>
  );
}

