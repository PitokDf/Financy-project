'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAnalysis, AnalysisRunResult, MlClusterResponse } from '@/hooks/use-analysis';
import { useCategories } from '@/hooks/use-categories';
import { Brain, ArrowRight, Loader2, CheckCircle2, Sparkles, Tag, ChevronDown, ChevronUp, Trash2, FolderInput, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { CLUSTER_COLORS } from './_components/constant';
import { ClusterPieChart } from './_components/cluster-pie-chart';
import { ClusterCard } from './_components/cluster-card';

type UIState = 'IDLE' | 'RUNNING' | 'REVIEWING' | 'FORECAST_REVEAL';

export default function AnalysisLabPage() {
    const { runAnalysis, isRunning, confirmAnalysis, isConfirming, latestRun, isLoadingLatest } = useAnalysis();
    const { categories } = useCategories();

    const [uiState, setUiState] = useState<UIState>('IDLE');
    const [analysisResult, setAnalysisResult] = useState<AnalysisRunResult | null>(null);
    const [mappings, setMappings] = useState<Record<number, string>>({});
    const [assignments, setAssignments] = useState<Record<number, MlClusterResponse['members']>>({});
    const [forecastData, setForecastData] = useState<any>(null);

    useEffect(() => {
        if (latestRun && latestRun.status === 'waiting_confirmation') {
            loadResult(latestRun);
        }
    }, [latestRun]);

    useEffect(() => {
        if (latestRun && latestRun.status === 'running') {
            setUiState('RUNNING');
        }
    }, [latestRun]);

    const loadResult = (result: AnalysisRunResult) => {
        setAnalysisResult(result);
        const initialMappings: Record<number, string> = {};
        const initialAssignments: Record<number, MlClusterResponse['members']> = {};

        result.clusters.forEach(c => {
            const idx = c.index !== undefined ? c.index : Number(c.id);
            // Default name for -1 is Lain-lain
            initialMappings[idx] = c.suggestedName || c.name || (idx === -1 ? 'Lain-lain' : `Kategori ${idx + 1}`);
            initialAssignments[idx] = c.members;
        });

        // Ensure "Lain-lain" (-1) bucket exists so we have a place to drop excluded items
        if (!initialAssignments[-1]) {
            initialAssignments[-1] = [];
            initialMappings[-1] = 'Lain-lain';
        }

        setMappings(initialMappings);
        setAssignments(initialAssignments);
        setUiState('REVIEWING');
    };

    const handleRunAnalysis = async () => {
        setUiState('RUNNING');
        try {
            const result = await runAnalysis({});
            if (!result || !result.clusters) throw new Error('Invalid result');
            loadResult(result);
        } catch {
            setUiState('IDLE');
        }
    };

    const handleConfirm = async () => {
        if (!analysisResult) return;

        const clusterMappings = Object.keys(assignments).map((key, i) => {
            const idx = Number(key);
            return {
                index: idx,
                name: mappings[idx] || `Kategori ${idx + 1}`,
                color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
                icon: 'Tag',
                transactionIds: assignments[idx]?.map(t => t.id) || [],
            };
        });

        try {
            const res = await confirmAnalysis({ runId: analysisResult.runId, clusterMappings });
            setForecastData(res.topForecasts);
            setUiState('FORECAST_REVEAL');
        } catch {
            // Error toast handled by hook
        }
    };

    // Show all clusters, but sort so that Lain-lain (-1) is always at the bottom
    const visibleClusters = [...(analysisResult?.clusters ?? [])]
        .filter(c => assignments[c.index]?.length > 0 || c.index === -1)
        .sort((a, b) => {
            if (a.index === -1) return 1;
            if (b.index === -1) return -1;
            return a.index - b.index;
        });

    // We must ensure -1 is in visibleClusters if we created it artificially for excluded items
    if (!visibleClusters.find(c => c.index === -1) && assignments[-1]?.length > 0) {
        visibleClusters.push({
            id: 'unassigned',
            index: -1,
            name: 'Lain-lain',
            suggestedName: 'Lain-lain',
            color: '#9CA3AF',
            size: assignments[-1].length,
            totalAmount: assignments[-1].reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0),
            representativeDescriptions: [],
            members: assignments[-1]
        });
    }
    if (isLoadingLatest && uiState === 'IDLE') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in text-foreground pb-28">
            {/* IDLE */}
            {uiState === 'IDLE' && (
                <div className="flex flex-col items-center mt-12 space-y-6 px-2">
                    <div className="relative w-28 h-28">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                        <div className="relative w-full h-full gradient-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30">
                            <Brain className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold tracking-tight mb-2">Mulai Clustering Pintar</h2>
                        <p className="text-xs text-muted-foreground leading-relaxed px-4 mb-8">
                            Pindahkan transaksi tak berkategori ke dalam kelompok cerdas yang dibuat oleh AI.
                        </p>
                        <Button
                            onClick={handleRunAnalysis}
                            size="lg"
                            disabled={isRunning}
                            className="w-full h-12 rounded-xl gradient-primary shadow-lg shadow-primary/30 font-bold text-white text-sm border-0"
                        >
                            {isRunning ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2 text-white/90" />}
                            Jalankan Clustering AI
                        </Button>
                    </div>
                </div>
            )}

            {/* RUNNING */}
            {uiState === 'RUNNING' && (
                <div className="flex flex-col items-center justify-center mt-20 space-y-6 animate-fade-in">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                        <div className="absolute inset-0 border-[6px] border-primary/20 rounded-full animate-ping" />
                        <div className="relative w-24 h-24 gradient-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40">
                            <Brain className="w-10 h-10 text-white animate-pulse" />
                        </div>
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-base font-bold text-primary">Sedang Menganalisis...</h3>
                        <p className="text-xs text-muted-foreground">Mesin AI memproses pola transaksi Anda</p>
                        <Loader2 className="w-4 h-4 text-primary/50 animate-spin mx-auto mt-2" />
                    </div>
                </div>
            )}

            {/* REVIEWING */}
            {uiState === 'REVIEWING' && analysisResult && (
                <div className="animate-fade-in space-y-4">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: 'Transaksi', value: analysisResult.totalTransactions },
                            { label: 'Klaster', value: visibleClusters.length },
                            { label: 'Skor Kualitas', value: `${(analysisResult.silhouetteScore * 100).toFixed(0)}%` },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-card border border-border rounded-2xl p-3 text-center">
                                <p className="text-base font-bold text-primary">{stat.value}</p>
                                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pre-assigned summary banner */}
                    {analysisResult.preAssignedSummary && analysisResult.preAssignedSummary.count > 0 && (
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-3.5">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-emerald-500/10 rounded-xl shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
                                        {analysisResult.preAssignedSummary.count} transaksi otomatis dikategorikan
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">
                                        AI menemukan kecocokan semantik dengan kategori yang sudah ada
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pie Chart */}
                    <div className="bg-card border border-border rounded-2xl p-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Distribusi Klaster</p>
                        <ClusterPieChart clusters={analysisResult.clusters} />
                    </div>

                    {/* Cluster list */}
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                            Beri Nama Kategori
                        </p>
                        <div className="space-y-2">
                            {visibleClusters.map((cluster, i) => (
                                <ClusterCard
                                    key={cluster.id}
                                    cluster={cluster}
                                    index={cluster.index}
                                    color={CLUSTER_COLORS[i % CLUSTER_COLORS.length]}
                                    mapping={mappings[cluster.index] || ''}
                                    onNameChange={v => setMappings(prev => ({ ...prev, [cluster.index]: v }))}
                                    transactions={assignments[cluster.index] || []}
                                    clusterOptions={visibleClusters.map(c => ({ index: c.index, name: mappings[c.index] || c.suggestedName || `Kategori ${c.index + 1}` }))}
                                    existingCategories={categories.map(c => ({ id: c.id, name: c.name }))}
                                    onExcludeTransaction={(txId) => {
                                        setAssignments(prev => {
                                            const updated = { ...prev };
                                            // Find the transaction
                                            const tx = updated[cluster.index].find(t => t.id === txId);
                                            if (!tx) return prev;

                                            // Remove from current cluster
                                            updated[cluster.index] = updated[cluster.index].filter(t => t.id !== txId);
                                            // Move to Lain-lain (-1)
                                            updated[-1] = [...(updated[-1] || []), tx];
                                            return updated;
                                        });
                                    }}
                                    onMoveTransaction={(txId, targetIndex) => {
                                        setAssignments(prev => {
                                            const updated = { ...prev };
                                            const tx = updated[cluster.index].find(t => t.id === txId);
                                            if (!tx) return prev;

                                            updated[cluster.index] = updated[cluster.index].filter(t => t.id !== txId);
                                            updated[targetIndex] = [...(updated[targetIndex] || []), tx];
                                            return updated;
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Fixed apply button */}
                    <div className="fixed bottom-[76px] left-0 right-0 px-4 pb-2 pt-3 bg-gradient-to-t from-background via-background/90 to-transparent z-40">
                        <Button
                            onClick={handleConfirm}
                            disabled={isConfirming}
                            size="lg"
                            className="w-full h-12 gradient-primary rounded-xl shadow-lg shadow-primary/30 font-bold text-white text-sm border-0"
                        >
                            {isConfirming ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
                            Terapkan ke Aplikasi
                        </Button>
                    </div>
                </div>
            )}

            {/* FORECAST_REVEAL */}
            {uiState === 'FORECAST_REVEAL' && (
                <div className="flex flex-col items-center mt-10 space-y-5 animate-fade-in px-2">
                    <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold tracking-tight">Analisis Selesai!</h2>
                        <p className="text-xs text-muted-foreground mt-1">Kategori AI telah diterapkan ke transaksi Anda.</p>
                    </div>

                    {forecastData && forecastData.length > 0 ? (
                        <div className="w-full gradient-primary p-5 rounded-xl text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                            <div className="absolute -top-12 -right-12 opacity-10">
                                <Brain className="w-48 h-48" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-1.5 bg-white/20 w-fit px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2">
                                    <Sparkles className="w-3 h-3" /> Prediksi 3 Kategori Terbesar
                                </div>
                                <div className="space-y-3 mt-4">
                                    {forecastData.map((f: any) => (
                                        <div key={f.categoryName} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                                                    {f.rank}
                                                </div>
                                                <p className="text-sm font-bold">{f.categoryName}</p>
                                            </div>
                                            <p className="text-sm font-bold tabular-nums">
                                                {formatCurrency(Number(f.predictedAmount || 0))}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-card border border-border p-5 rounded-xl text-center w-full">
                            <p className="text-sm font-medium text-foreground">Kategori berhasil dibuat!</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Butuh lebih banyak data historis untuk menghasilkan forecast.
                            </p>
                        </div>
                    )}

                    <div className="w-full space-y-2 pt-2">
                        <Button
                            onClick={() => setUiState('IDLE')}
                            className="w-full h-11 rounded-xl gradient-primary text-white font-semibold text-sm border-0 shadow-md shadow-primary/20"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Analisis Ulang
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/transactions'}
                            variant="outline"
                            className="w-full h-11 rounded-xl border border-border text-foreground font-semibold text-sm"
                        >
                            Lihat Transaksi
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
