// @ts-nocheck

'use client'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { IconArrowDown } from '@/components/ui/icons'
import { useAtBottom } from '@/hooks/use-at-bottom'
import { cn } from '@/utils'

export function ButtonScrollToBottom({
  className,
  ...props
}: Omit<ButtonProps, 'asChild'>) {
  const isAtBottom = useAtBottom()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
