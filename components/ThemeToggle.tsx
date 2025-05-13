'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import React, { useEffect, useState } from 'react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;

  return (
    <Button
      variant={'outline'}
      onClick={() => {
        if (theme == 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }}
    >
      {theme == 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
}

export default ThemeToggle;
