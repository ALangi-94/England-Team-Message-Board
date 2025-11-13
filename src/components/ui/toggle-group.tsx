"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

const ToggleGroup = ToggleGroupPrimitive.Root

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-england-red focus-visible:ring-offset-2",
      "data-[state=on]:border-england-red data-[state=on]:bg-england-red data-[state=on]:text-white",
      className
    )}
    {...props}
  />
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

