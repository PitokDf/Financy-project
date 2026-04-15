"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FilterChipOption {
    label: React.ReactNode;
    value: string;
}

export interface FilterChipsProps {
    id?: string;
    options: (string | FilterChipOption)[];
    value?: string | null;
    onValueChange: (value: string) => void;
    allowDeselect?: boolean;
    activeClass?: string;
    inactiveClass?: string;
    chipClassName?: string;
    className?: string;
}

export function FilterChips({
    id,
    options,
    value,
    onValueChange,
    allowDeselect = true,
    activeClass = "bg-primary text-primary-foreground",
    inactiveClass = "bg-muted text-muted-foreground hover:bg-muted/80",
    chipClassName = "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
    className,
}: FilterChipsProps) {
    const normalizedOptions: FilterChipOption[] = options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    return (
        <div id={id} className={cn("flex flex-wrap gap-1.5", className)}>
            {normalizedOptions.map((option) => {
                const isActive = value === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                            if (allowDeselect && isActive) {
                                onValueChange("");
                            } else {
                                onValueChange(option.value);
                            }
                        }}
                        className={cn(
                            chipClassName,
                            isActive ? activeClass : inactiveClass
                        )}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}