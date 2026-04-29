'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export type NotificationType = 'budget_warning' | 'pattern_found' | 'reminder' | 'achievement';

export interface Notification {
    readonly id: string;
    readonly type: NotificationType;
    readonly title: string;
    readonly message: string;
    readonly date: string;
    readonly read: boolean;
}

export function NotificationCard({ notification, className, icon: Icon, bg }: { notification: Notification, className: string, icon: React.ComponentType<{ className: string }>, bg: string }) {
    return (
        <Card key={notification.id} className={`animate-fade-in border-0 py-0 shadow-sm ${!notification.read ? 'ring-1 ring-primary/20' : ''}`}>
            <CardContent className="flex items-start gap-3 p-4">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-4 w-4 ${className}`} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold">{notification.title}</p>
                        {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{notification.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">{notification.date}</p>
                </div>
            </CardContent>
        </Card>
    )
}