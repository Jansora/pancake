'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

const MotionProgressIndicator = motion.create(ProgressPrimitive.Indicator);

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  transition?: Transition;
};

function Progress({
  className,
  value,
  transition = { type: 'spring', stiffness: 100, damping: 30 },
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        className,
      )}
      value={value}
      {...props}
    >
      <MotionProgressIndicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-primary rounded-full"
        animate={{ x: `-${100 - (value || 0)}%` }}
        transition={transition}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress, type ProgressProps };
