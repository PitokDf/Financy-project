"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  useAnalysis,
  AnalysisRunResult,
  MlClusterResponse,
} from "@/hooks/use-analysis";
import { useCategories } from "@/hooks/use-categories";
import {
  Brain,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { CLUSTER_COLORS } from "./_components/constant";
import { ClusterPieChart } from "./_components/cluster-pie-chart";
import { ClusterCard } from "./_components/cluster-card";

type UIState = "IDLE" | "RUNNING" | "REVIEWING" | "FORECAST_REVEAL";

export default function AnalysisLabPage() {
  const {
    runAnalysis,
    isRunning,
    confirmAnalysis,
    isConfirming,
    latestRun,
    isLoadingLatest,
    needsReviewTxs,
    isLoadingReview,
    batchConfirmReview,
  } = useAnalysis();
  const { categories } = useCategories();
  const t = useTranslations("lab");

  const [uiState, setUiState] = useState<UIState>("IDLE");
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisRunResult | null>(null);
  const [mappings, setMappings] = useState<Record<number, string>>({});
  const [assignments, setAssignments] = useState<
    Record<number, MlClusterResponse["members"]>
  >({});
  const [forecastData, setForecastData] = useState<any>(null);
  const [selectedReviewIds, setSelectedReviewIds] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (latestRun?.status === "waiting_confirmation") loadResult(latestRun);
  }, [latestRun]);

  useEffect(() => {
    if (latestRun?.status === "running") setUiState("RUNNING");
  }, [latestRun]);

  const handleToggleReview = (id: string) => {
    setSelectedReviewIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAllReview = () => {
    if (selectedReviewIds.size === needsReviewTxs.length) {
      setSelectedReviewIds(new Set());
    } else {
      setSelectedReviewIds(new Set(needsReviewTxs.map((tx) => tx.id)));
    }
  };

  const handleConfirmReview = async () => {
    if (selectedReviewIds.size === 0) return;
    try {
      await batchConfirmReview(Array.from(selectedReviewIds));
      setSelectedReviewIds(new Set());
    } catch {
      // error toast handled by mutation
    }
  };

  const loadResult = (result: AnalysisRunResult) => {
    setAnalysisResult(result);
    const initialMappings: Record<number, string> = {};
    const initialAssignments: Record<number, MlClusterResponse["members"]> = {};
    result.clusters.forEach((c) => {
      const idx = c.index !== undefined ? c.index : Number(c.id);
      initialMappings[idx] =
        c.suggestedName ||
        c.name ||
        (idx === -1 ? t("others") : t("categoryDefaultName", { num: idx + 1 }));
      initialAssignments[idx] = c.members;
    });
    if (!initialAssignments[-1]) {
      initialAssignments[-1] = [];
      initialMappings[-1] = t("others");
    }
    setMappings(initialMappings);
    setAssignments(initialAssignments);
    setUiState("REVIEWING");
  };

  const handleRunAnalysis = async () => {
    setUiState("RUNNING");
    try {
      const result = await runAnalysis({});
      if (!result?.clusters) throw new Error();
      loadResult(result);
    } catch {
      setUiState("IDLE");
    }
  };

  const handleConfirm = async () => {
    if (!analysisResult) return;
    const clusterMappings = Object.keys(assignments).map((key, i) => {
      const idx = Number(key);
      return {
        index: idx,
        name: mappings[idx] || t("categoryDefaultName", { num: idx + 1 }),
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
        icon: "Tag",
        transactionIds: assignments[idx]?.map((t) => t.id) || [],
      };
    });
    try {
      const res = await confirmAnalysis({
        runId: analysisResult.runId,
        clusterMappings,
      });
      setForecastData(res.topForecasts);
      setUiState("FORECAST_REVEAL");
    } catch {}
  };

  const handleAddCustomCluster = () => {
    if (!analysisResult) return;

    const existingIndices = analysisResult.clusters
      .map((c) => c.index)
      .filter((idx) => idx !== undefined);
    const newIndex =
      existingIndices.length > 0 ? Math.max(...existingIndices) + 1 : 1;

    const newCluster: MlClusterResponse = {
      id: `custom-${newIndex}`,
      index: newIndex,
      name: "",
      suggestedName: "",
      color: CLUSTER_COLORS[newIndex % CLUSTER_COLORS.length],
      size: 0,
      totalAmount: 0,
      representativeDescriptions: [],
      members: [],
    };

    setAnalysisResult({
      ...analysisResult,
      clusters: [newCluster, ...analysisResult.clusters],
    });

    setMappings((prev) => ({ ...prev, [newIndex]: "" }));
    setAssignments((prev) => ({ ...prev, [newIndex]: [] }));
  };

  const visibleClusters = [...(analysisResult?.clusters ?? [])]
    .filter(
      (c) =>
        assignments[c.index]?.length > 0 ||
        c.index === -1 ||
        c.id.toString().startsWith("custom-"),
    )
    .sort((a, b) =>
      a.index === -1 ? 1 : b.index === -1 ? -1 : a.index - b.index,
    );

  if (
    !visibleClusters.find((c) => c.index === -1) &&
    assignments[-1]?.length > 0
  ) {
    visibleClusters.push({
      id: "unassigned",
      index: -1,
      name: t("others"),
      suggestedName: t("others"),
      color: "#9CA3AF",
      size: assignments[-1].length,
      totalAmount: assignments[-1].reduce(
        (s: number, t: any) => s + Math.abs(t.amount),
        0,
      ),
      representativeDescriptions: [],
      members: assignments[-1],
    });
  }

  if (isLoadingLatest && uiState === "IDLE") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-foreground">
      {/* ── IDLE ── */}
      {uiState === "IDLE" && (
        <div className="animate-fade-in space-y-6 pt-4">
          {/* Needs Review Section */}
          {!isLoadingReview && needsReviewTxs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Perlu Review</p>
                    <p className="text-[10px] text-muted-foreground">
                      {needsReviewTxs.length} transaksi kategori otomatis
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllReview}
                  className="h-7 text-[10px] px-2.5 rounded-xl"
                >
                  {selectedReviewIds.size === needsReviewTxs.length
                    ? "Batal Pilih"
                    : "Pilih Semua"}
                </Button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {needsReviewTxs.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => handleToggleReview(tx.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedReviewIds.has(tx.id)
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-muted/50 border-border/40 hover:bg-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selectedReviewIds.has(tx.id)
                          ? "bg-amber-500 border-amber-500"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {selectedReviewIds.has(tx.id) && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {tx.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {tx.category?.name || "Belum dikategorikan"} ·{" "}
                        {new Date(tx.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-red-500 shrink-0">
                      -{formatCurrency(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>

              {selectedReviewIds.size > 0 && (
                <Button
                  onClick={handleConfirmReview}
                  className="w-full h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm border-0"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Konfirmasi {selectedReviewIds.size} Transaksi
                </Button>
              )}
            </div>
          )}

          {/* Divider if both sections exist */}
          {!isLoadingReview && needsReviewTxs.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <p className="text-[10px] text-muted-foreground font-medium">
                ATAU
              </p>
              <div className="flex-1 h-px bg-border" />
            </div>
          )}

          {/* Hero illustration area */}
          <div className="relative mb-8 mt-8 flex flex-col items-center px-1">
            {/* Soft glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/8 animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/12" />
            </div>
            {/* Icon core */}
            <div className="relative w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-3">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-65 mx-auto">
              {t("desc")}
            </p>
          </div>

          <Button
            onClick={handleRunAnalysis}
            size="lg"
            disabled={isRunning}
            className="w-full h-13 rounded-2xl gradient-primary shadow-lg shadow-primary/25 font-semibold text-white text-sm border-0 tracking-wide"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2 text-white/80" />
            )}
            {t("runPrediction")}
          </Button>
        </div>
      )}

      {/* ── RUNNING ── */}
      {uiState === "RUNNING" && (
        <div className="flex flex-col items-center justify-center mt-20 space-y-8 animate-fade-in">
          {/* Pulsing brain */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-primary/10 animate-ping"
              style={{ animationDuration: "1.8s" }}
            />
            <div
              className="absolute inset-2 rounded-full bg-primary/15 animate-ping"
              style={{ animationDuration: "1.4s", animationDelay: "0.2s" }}
            />
            <div className="relative w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-3">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Steps */}
          <div className="text-center space-y-1.5">
            <p className="text-base font-semibold text-foreground">
              {t("analyzing")}
            </p>
            <p className="text-xs text-muted-foreground">{t("pleaseWait")}</p>
          </div>

          <div className="flex gap-1.5">
            {[0, 0.15, 0.3].map((delay, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── REVIEWING ── */}
      {uiState === "REVIEWING" && analysisResult && (
        <div className="animate-fade-in space-y-5 pb-28">
          {/* Page header */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold tracking-tight">
              {t("resultTitle")}
            </h2>
            <p className="text-xs text-muted-foreground">{t("resultDesc")}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                label: t("stats.transactions"),
                value: analysisResult.totalTransactions,
                suffix: "",
              },
              {
                label: t("stats.categories"),
                value: visibleClusters.length,
                suffix: "",
              },
              {
                label: t("stats.accuracy"),
                value: `${(analysisResult.silhouetteScore * 100).toFixed(0)}`,
                suffix: "%",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-muted/50 rounded-2xl p-3.5 text-center border border-border/40"
              >
                <p className="text-xl font-bold text-primary leading-none">
                  {s.value}
                  <span className="text-sm">{s.suffix}</span>
                </p>
                <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Pre-assigned banner (v1) / Review banner (v2) */}
          {(analysisResult.preAssignedSummary?.count ?? 0) > 0 &&
            (analysisResult.elbowData && analysisResult.elbowData.length > 0 ? (
              // V1: transaksi cocok kategori yang ada → hijau
              <div className="flex items-center gap-3 p-3.5 bg-emerald-500/8 border border-emerald-500/20 rounded-2xl">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {t("preassignedSuccess", {
                      count: analysisResult.preAssignedSummary?.count || 0,
                    })}
                  </p>
                  <p className="text-[10px] text-emerald-500/70 mt-0.5">
                    {t("preassignedSuccessDesc")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3.5 bg-amber-500/8 border border-amber-500/20 rounded-2xl">
                <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-600 dark:text-emerald-400">
                    {t("preassignedLowConf", {
                      count: analysisResult.preAssignedSummary?.count || 0,
                    })}
                  </p>
                  <p className="text-[10px] text-amber-500/70 mt-0.5">
                    {t("preassignedLowConfDesc")}
                  </p>
                </div>
              </div>
            ))}

          {/* Pie chart section */}
          <div className="bg-muted/30 rounded-2xl border border-border/40 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              {t("categoryDist")}
            </p>
            <ClusterPieChart
              clusters={analysisResult.clusters}
              mappings={mappings}
            />
          </div>

          {/* Cluster cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {t("nameCategory")}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-[10px] text-muted-foreground">
                  {t("groups", { count: visibleClusters.length })}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddCustomCluster}
                  className="h-7 text-[10px] px-2.5 rounded-xl border-dashed hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {t("newGroup")}
                </Button>
              </div>
            </div>
            {visibleClusters.map((cluster, i) => (
              <ClusterCard
                key={cluster.id}
                cluster={cluster}
                index={cluster.index}
                color={CLUSTER_COLORS[i % CLUSTER_COLORS.length]}
                mapping={mappings[cluster.index] || ""}
                onNameChange={(v) =>
                  setMappings((prev) => ({ ...prev, [cluster.index]: v }))
                }
                transactions={assignments[cluster.index] || []}
                clusterOptions={visibleClusters.map((c) => ({
                  index: c.index,
                  name:
                    mappings[c.index] ||
                    c.suggestedName ||
                    t("categoryDefaultName", { num: c.index + 1 }),
                }))}
                existingCategories={categories.map((c) => ({
                  id: c.id,
                  name: c.name,
                }))}
                onExcludeTransactions={(txIds) => {
                  setAssignments((prev) => {
                    const updated = { ...prev };
                    const txs = updated[cluster.index].filter((t) =>
                      txIds.includes(t.id),
                    );
                    if (txs.length === 0) return prev;
                    updated[cluster.index] = updated[cluster.index].filter(
                      (t) => !txIds.includes(t.id),
                    );
                    updated[-1] = [...(updated[-1] || []), ...txs];
                    return updated;
                  });
                  toast.success(t("excludeToast", { count: txIds.length }));
                }}
                onMoveTransactions={(txIds, targetIndex) => {
                  setAssignments((prev) => {
                    const updated = { ...prev };
                    const txs = updated[cluster.index].filter((t) =>
                      txIds.includes(t.id),
                    );
                    if (txs.length === 0) return prev;
                    updated[cluster.index] = updated[cluster.index].filter(
                      (t) => !txIds.includes(t.id),
                    );
                    updated[targetIndex] = [
                      ...(updated[targetIndex] || []),
                      ...txs,
                    ];
                    return updated;
                  });
                  const targetName =
                    mappings[targetIndex] ||
                    visibleClusters.find((c) => c.index === targetIndex)
                      ?.suggestedName ||
                    `Grup baru`;
                  toast.success(
                    t("moveToast", { count: txIds.length, target: targetName }),
                  );
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fixed CTA – REVIEWING only */}
      {uiState === "REVIEWING" && (
        <div className="fixed bottom-0 left-0 max-w-2xl mx-auto right-0 px-4 pb-6 pt-8 bg-linear-to-t from-background via-background/95 to-transparent z-40 pointer-events-none">
          <Button
            onClick={handleConfirm}
            disabled={isConfirming}
            size="lg"
            className="w-full h-13 gradient-primary rounded-2xl shadow-lg shadow-primary/25 font-semibold text-white text-sm border-0 pointer-events-auto"
          >
            {isConfirming ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            {t("apply")}
          </Button>
        </div>
      )}

      {/* ── FORECAST REVEAL ── */}
      {uiState === "FORECAST_REVEAL" && (
        <div className="flex flex-col items-center pt-10 space-y-6 animate-fade-in px-1">
          {/* Success badge */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <div className="relative w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 -rotate-3">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-tight">
              {t("analysisComplete")}
            </h2>
            <p className="text-xs text-muted-foreground">{t("appliedDesc")}</p>
          </div>

          {/* Forecast card */}
          {forecastData?.length > 0 ? (
            <div className="w-full gradient-primary rounded-3xl shadow-xl shadow-primary/25 overflow-hidden">
              <div className="p-5 relative">
                {/* BG decoration */}
                <div className="absolute -bottom-6 -right-6 opacity-[0.06]">
                  <TrendingUp className="w-36 h-36 text-white" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-5">
                    <Sparkles className="w-3 h-3 text-white/70" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                      {t("topForecasts")}
                    </p>
                  </div>

                  <div className="space-y-0">
                    {forecastData.map((f: any, idx: number) => (
                      <div
                        key={f.categoryName}
                        className="flex items-center justify-between py-3.5 border-b border-white/10 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                            {f.rank}
                          </span>
                          <p className="text-sm font-semibold text-white">
                            {f.categoryName}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-white/90 tabular-nums">
                          {formatCurrency(Number(f.predictedAmount || 0))}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full p-5 rounded-3xl bg-muted/50 border border-border/50 text-center">
              <p className="text-sm font-semibold text-foreground">
                {t("categoryCreated")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("needMoreData")}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="w-full space-y-2.5">
            <Button
              onClick={() => setUiState("IDLE")}
              className="w-full h-12 rounded-2xl gradient-primary text-white font-semibold text-sm border-0 shadow-md shadow-primary/20"
            >
              <Sparkles className="w-4 h-4 mr-2" /> {t("reAnalyze")}
            </Button>
            <Button
              onClick={() => (window.location.href = "/transactions")}
              variant="ghost"
              className="w-full h-12 rounded-2xl font-semibold text-sm text-muted-foreground hover:text-foreground"
            >
              {t("viewTx")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
