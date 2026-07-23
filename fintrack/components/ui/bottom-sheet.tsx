"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function BottomSheet({ open, onClose, title, description, children, className }: BottomSheetProps) {
    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl p-5 pb-8 shadow-2xl border-t border-border/50 animate-in slide-in-from-bottom-5 duration-300",
                className
            )}>
                <div className="max-w-2xl mx-auto">
                    <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-5" />
                    {title && <h2 className="text-base font-bold text-foreground mb-1">{title}</h2>}
                    {description && <p className="text-xs text-muted-foreground mb-5">{description}</p>}
                    {children}
                </div>
            </div>
        </>
    );
}
