'use client';

import { useState, useEffect } from 'react';
import { Mic, Loader2, Check } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { useQueryClient } from '@tanstack/react-query';
import { useTransactions } from '@/hooks/use-transactions';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function VoiceTransactionButton() {
    const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported } = useSpeechRecognition();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [parsedResult, setParsedResult] = useState<{ amount: number; description: string } | null>(null);
    const queryClient = useQueryClient();
    const { createTransaction } = useTransactions();

    const createMutation = {
        mutate: (data: any) => {
            setIsProcessing(true);
            createTransaction(data)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
                    queryClient.invalidateQueries({ queryKey: ['gamification-stats'] });
                    setIsProcessing(false);
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                        setParsedResult(null);
                        resetTranscript();
                    }, 2500);
                })
                .catch(() => setIsProcessing(false));
        },
    };

    useEffect(() => {
        if (!isListening && transcript && !isProcessing && !showSuccess) {
            processTranscript(transcript);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening]);

    const parseVoiceInput = (text: string) => {
        let t = text.toLowerCase().replace(/rp/g, '').trim();
        t = t.replace(/[,.]00\b/g, '').replace(/(\d)[.,](\d{3})/g, '$1$2').replace(/(\d)[.,](\d{3})/g, '$1$2');
        t = t.replace(/sebelas/g, '11').replace(/sepuluh/g, '10').replace(/seratus/g, '100').replace(/seribu/g, '1000').replace(/sejuta/g, '1000000');

        const idNums: Record<string, string> = { satu: '1', dua: '2', tiga: '3', empat: '4', lima: '5', enam: '6', tujuh: '7', delapan: '8', sembilan: '9' };
        for (const [k, v] of Object.entries(idNums)) t = t.replace(new RegExp(`\\b${k}\\b`, 'g'), v);

        t = t.replace(/(\d+)\s*belas/g, '1$1');
        t = t.replace(/(\d+)\s*puluh\s*(\d*)/g, (_, p1, p2) => (p2 ? `${p1}${p2}` : `${p1}0`));
        t = t.replace(/(\d+)\s*ratus\s*(\d*)/g, (_, p1, p2) => (p2 ? `${p1}${p2.padStart(2, '0')}` : `${p1}00`));
        t = t.replace(/(\d+)\s*ribu\s*(\d*)/g, (_, p1, p2) => (p2 ? `${p1}${p2.padStart(3, '0')}` : `${p1}000`));
        t = t.replace(/(\d+)\s*juta\s*(\d*)/g, (_, p1, p2) => (p2 ? `${p1}${p2.padStart(6, '0')}` : `${p1}000000`));
        t = t.replace(/(\d+)\s*(ribu|k)\b/gi, (_, n) => String(Number(n) * 1000));
        t = t.replace(/(\d+)\s*(juta|m)\b/gi, (_, n) => String(Number(n) * 1000000));

        const numbers = t.match(/\d+/g);
        let amount = 0, amountStr = '';
        if (numbers?.length) { amountStr = numbers[numbers.length - 1]; amount = Number(amountStr); }

        let description = t.replace(amountStr, '').replace(/rupiah/gi, '').replace(/\s+/g, ' ').trim();
        if (description) description = description.charAt(0).toUpperCase() + description.slice(1);

        const type: 'INCOME' | 'EXPENSE' = ['gaji', 'bonus', 'dikasih', 'terima', 'dapat'].some(kw => description.toLowerCase().includes(kw)) ? 'INCOME' : 'EXPENSE';
        return { amount, description: description || 'Transaksi Voice', type };
    };

    const processTranscript = (text: string) => {
        if (!text) return;
        setIsProcessing(true);
        const { amount, description, type } = parseVoiceInput(text);
        setParsedResult({ amount, description });
        if (amount > 0) {
            createMutation.mutate({ amount, description, type, date: new Date().toISOString() });
        } else {
            setIsProcessing(false);
            toast.error('Tidak ada nominal angka yang terdeteksi.');
            resetTranscript();
        }
    };

    const toggleListening = () => {
        if (isListening) { stopListening(); if (!transcript) resetTranscript(); }
        else startListening();
    };

    if (!isSupported) return null;

    const showPanel = isListening || isProcessing || showSuccess || !!transcript;

    return (
        <div className="relative flex items-center justify-end">
            {/* Pill panel */}
            {showPanel && (
                <div className={cn(
                    'absolute right-[68px] top-1/2 -translate-y-1/2',
                    'flex items-center gap-2.5 px-3.5 py-2.5',
                    'rounded-2xl border border-border/50 bg-background',
                    'shadow-sm',
                    'animate-in fade-in slide-in-from-right-3 duration-200',
                    'max-w-[210px]',
                )}>
                    {showSuccess ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={2.5} />
                            <div className="min-w-0">
                                <p className="text-[11px] text-muted-foreground truncate leading-none mb-0.5">
                                    {parsedResult?.description}
                                </p>
                                <p className="text-sm font-semibold tabular-nums text-foreground leading-none">
                                    Rp {parsedResult?.amount.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </>
                    ) : isProcessing ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground shrink-0" />
                            <p className="text-[11px] text-muted-foreground">Memproses...</p>
                        </>
                    ) : (
                        <>
                            {/* Live dot */}
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                            </span>
                            <p className={cn(
                                'text-[11px] leading-tight truncate',
                                transcript ? 'text-foreground' : 'text-muted-foreground',
                            )}>
                                {transcript || 'Sebutkan pengeluaran…'}
                            </p>
                        </>
                    )}
                </div>
            )}

            {/* Mic button */}
            <button
                onClick={toggleListening}
                aria-label="Catat dengan suara"
                className={cn(
                    'relative w-12 h-12 rounded-2xl flex items-center justify-center',
                    'transition-all duration-200 outline-none',
                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isListening
                        ? 'bg-rose-500 text-white scale-105 shadow-[0_4px_20px_-2px_rgb(244_63_94/0.4)]'
                        : 'bg-secondary text-foreground/70 hover:text-foreground hover:bg-secondary/80 active:scale-95',
                )}
            >
                {isProcessing
                    ? <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    : <Mic className="w-4.5 h-4.5" strokeWidth={2} />
                }
            </button>
        </div>
    );
}