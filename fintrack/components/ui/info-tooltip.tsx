"use client"

import * as React from "react"
import { Info } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface InfoTooltipProps {
  title?: string
  content: React.ReactNode
  icon?: LucideIcon
  triggerClassName?: string
  contentClassName?: string
  align?: "start" | "center" | "end"
  sideOffset?: number
  children?: React.ReactNode
}

export function InfoTooltip({
  title,
  content,
  icon: CustomIcon,
  triggerClassName,
  contentClassName,
  align = "center",
  sideOffset = 8,
  children,
}: InfoTooltipProps) {
  const Icon = CustomIcon || Info

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children ? (
          children
        ) : (
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center",
              "w-7 h-7 rounded-full",
              "text-muted-foreground/50 hover:text-muted-foreground",
              "hover:bg-muted active:scale-95",
              "transition-all duration-150 outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              triggerClassName
            )}
            aria-label={title || "Informasi"}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align={align}
        sideOffset={sideOffset}
        collisionPadding={{
          top: 16,
          bottom: 32,
          left: 16,
          right: 16,
        }}
        avoidCollisions
        className={cn(
          "w-56 p-0 border-border/40",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=top]:slide-in-from-bottom-2",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "duration-150 ease-out",
          "shadow-lg shadow-black/8 rounded-xl overflow-hidden",
          contentClassName
        )}
      >
        {title && (
          <div className="px-3 pt-3 pb-2 border-b border-border/30">
            <p className="text-xs font-semibold text-foreground leading-tight">
              {title}
            </p>
          </div>
        )}
        <div className={cn(
          "text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap",
          title ? "px-3 py-2.5" : "p-3"
        )}>
          {content}
        </div>
      </PopoverContent>
    </Popover>
  )
}