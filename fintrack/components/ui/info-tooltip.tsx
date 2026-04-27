"use client"

import * as React from "react"
import { Info, LucideIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
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
                "inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors outline-none",
                triggerClassName
            )}
            aria-label={title || "Informasi"}
            >
            <Icon className="h-4 w-4" />
            </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        className={cn("w-64 p-3 shadow-xl border-border/50", contentClassName)}
      >
        <div className="space-y-1.5">
          {title && (
            <PopoverHeader className="pb-1 border-b border-border/30 mb-2">
              <PopoverTitle className="text-sm font-bold leading-tight">
                {title}
              </PopoverTitle>
            </PopoverHeader>
          )}

          <div className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}