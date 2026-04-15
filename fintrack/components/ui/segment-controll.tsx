"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedControlOption {
    label: React.ReactNode;
    value: string;
    activeBgClass?: string;
    activeTextClass?: string;
}

export interface SegmentedControlProps {
    options: SegmentedControlOption[];
    id?: string;
    value: string;
    onValueChange: (value: string) => void;
    activeBgClass?: string;
    inactiveBgClass?: string;
    activeTextClass?: string;
    inactiveTextClass?: string;
    className?: string;
    fullWidth?: boolean;
}

export function SegmentedControl({
    id,
    options,
    value,
    onValueChange,
    activeBgClass = "bg-red-500",
    inactiveBgClass = "bg-zinc-100 dark:bg-zinc-800",
    activeTextClass = "text-white font-semibold",
    inactiveTextClass = "text-zinc-500 dark:text-zinc-400 font-medium hover:text-zinc-700 dark:hover:text-zinc-300",
    className,
    fullWidth = true,
}: SegmentedControlProps) {
    return (
        <div
            id={id}
            className={cn(
                "flex items-center gap-2",
                fullWidth && "w-full",
                className
            )}
            role="radiogroup"
        >
            {options.map((option) => {
                const isActive = value === option.value;

                const currentActiveBgClass = option.activeBgClass ?? activeBgClass;
                const currentActiveTextClass = option.activeTextClass ?? activeTextClass;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => onValueChange(option.value)}
                        className={cn(
                            "relative flex items-center justify-center rounded-xl px-4 py-3 text-sm transition-all duration-200 active:scale-[0.98]",
                            fullWidth && "flex-1",
                            isActive ? currentActiveBgClass : inactiveBgClass,
                            isActive ? currentActiveTextClass : inactiveTextClass
                        )}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}