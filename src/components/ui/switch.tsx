'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

/**
 * Tailwind-styled wrapper над Radix Switch.
 *
 * Использование:
 * ```tsx
 * <Switch checked={value} onCheckedChange={setValue} />
 * ```
 */
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

/**
 * Utility to concat classNames — замени на свой, если он уже есть.
 */
function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, children, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border bg-white  border-zinc-600 transition-colors',
      'data-[state=checked]:border-transparent data-[state=checked]:bg-[#0D87EF]',
      'data-[state=checked]:bg-primary', // используйте свой цвет brand через Tailwind тему
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 translate-x-1 rounded-full bg-gray-400 shadow-md transition-transform',
        'data-[state=checked]:translate-x-6 data-[state=checked]:bg-white'
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';
