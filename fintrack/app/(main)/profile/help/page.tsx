'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
    HelpCircle,
    MessageCircle,
    BookOpen,
    ChevronRight,
    Mail,
    ExternalLink,
    Sparkles,
    PiggyBank,
    BarChart3,
    Download,
    Shield,
    Bell,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface FaqItem {
    question: string;
    answer: string;
}

interface FeatureInfo {
    icon: React.ElementType;
    title: string;
    description: string;
}

function FaqAccordionItem({ item }: { item: FaqItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border/50 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-3.5 px-4 text-left hover:bg-muted/30 transition-colors"
            >
                <span className="text-sm font-medium text-foreground pr-4">{item.question}</span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>
            <div className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden">
                    <p className="text-xs text-muted-foreground leading-relaxed px-4 pb-3.5">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function HelpPage() {
    const t = useTranslations('help');

    const FAQ_DATA: FaqItem[] = [
        {
            question: t('faqData.q1'),
            answer: t('faqData.a1')
        },
        {
            question: t('faqData.q2'),
            answer: t('faqData.a2')
        },
        {
            question: t('faqData.q3'),
            answer: t('faqData.a3')
        },
        {
            question: t('faqData.q4'),
            answer: t('faqData.a4')
        },
        {
            question: t('faqData.q5'),
            answer: t('faqData.a5')
        },
        {
            question: t('faqData.q6'),
            answer: t('faqData.a6')
        },
        {
            question: t('faqData.q7'),
            answer: t('faqData.a7')
        },
    ];

    const FEATURES: FeatureInfo[] = [
        {
            icon: PiggyBank,
            title: t('features.t1'),
            description: t('features.d1')
        },
        {
            icon: BarChart3,
            title: t('features.t2'),
            description: t('features.d2')
        },
        {
            icon: Sparkles,
            title: t('features.t3'),
            description: t('features.d3')
        },
        {
            icon: Download,
            title: t('features.t4'),
            description: t('features.d4')
        },
        {
            icon: Shield,
            title: t('features.t5'),
            description: t('features.d5')
        },
        {
            icon: Bell,
            title: t('features.t6'),
            description: t('features.d6')
        },
    ];
    return (
        <div className="animate-fade-in space-y-5">
            {/* Hero Info */}
            <Card className="border-border/50 py-0 shadow-none overflow-hidden">
                <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                                <HelpCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-foreground">
                                    {t('title')}
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {t('desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    {t('contactUs')}
                </p>
                <Card className="border-border/50 py-0 gap-0 shadow-none divide-y divide-border/50">
                    <a
                        href="mailto:pitokfauzi@pitok.my.id"
                        className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{t('emailSupport')}</p>
                            <p className="text-xs text-muted-foreground">pitokfauzi@pitok.my.id</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground/50" />
                    </a>
                    <a
                        href="https://wa.me/6283180541892"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{t('whatsapp')}</p>
                            <p className="text-xs text-muted-foreground">{t('whatsappDesc')}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground/50" />
                    </a>
                </Card>
            </div>

            {/* FAQ Section */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    {t('faq')}
                </p>
                <Card className="border-border/50 py-0 gap-0 shadow-none">
                    {FAQ_DATA.map((faq, i) => (
                        <FaqAccordionItem key={i} item={faq} />
                    ))}
                </Card>
            </div>

            {/* Features Guide */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    {t('featuresTitle')}
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={i} className="border-border/50 py-0 shadow-none">
                                <CardContent className="p-3.5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-sm font-medium text-foreground">{feature.title}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
