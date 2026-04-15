import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ClusterModel = runtime.Types.Result.DefaultSelection<Prisma.$ClusterPayload>;
export type AggregateCluster = {
    _count: ClusterCountAggregateOutputType | null;
    _avg: ClusterAvgAggregateOutputType | null;
    _sum: ClusterSumAggregateOutputType | null;
    _min: ClusterMinAggregateOutputType | null;
    _max: ClusterMaxAggregateOutputType | null;
};
export type ClusterAvgAggregateOutputType = {
    index: number | null;
    silhouetteScore: number | null;
    wcss: number | null;
};
export type ClusterSumAggregateOutputType = {
    index: number | null;
    silhouetteScore: number | null;
    wcss: number | null;
};
export type ClusterMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    analysisRunId: string | null;
    name: string | null;
    suggestedName: string | null;
    color: string | null;
    index: number | null;
    silhouetteScore: number | null;
    wcss: number | null;
    createdAt: Date | null;
};
export type ClusterMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    analysisRunId: string | null;
    name: string | null;
    suggestedName: string | null;
    color: string | null;
    index: number | null;
    silhouetteScore: number | null;
    wcss: number | null;
    createdAt: Date | null;
};
export type ClusterCountAggregateOutputType = {
    id: number;
    userId: number;
    analysisRunId: number;
    name: number;
    suggestedName: number;
    color: number;
    index: number;
    silhouetteScore: number;
    wcss: number;
    createdAt: number;
    _all: number;
};
export type ClusterAvgAggregateInputType = {
    index?: true;
    silhouetteScore?: true;
    wcss?: true;
};
export type ClusterSumAggregateInputType = {
    index?: true;
    silhouetteScore?: true;
    wcss?: true;
};
export type ClusterMinAggregateInputType = {
    id?: true;
    userId?: true;
    analysisRunId?: true;
    name?: true;
    suggestedName?: true;
    color?: true;
    index?: true;
    silhouetteScore?: true;
    wcss?: true;
    createdAt?: true;
};
export type ClusterMaxAggregateInputType = {
    id?: true;
    userId?: true;
    analysisRunId?: true;
    name?: true;
    suggestedName?: true;
    color?: true;
    index?: true;
    silhouetteScore?: true;
    wcss?: true;
    createdAt?: true;
};
export type ClusterCountAggregateInputType = {
    id?: true;
    userId?: true;
    analysisRunId?: true;
    name?: true;
    suggestedName?: true;
    color?: true;
    index?: true;
    silhouetteScore?: true;
    wcss?: true;
    createdAt?: true;
    _all?: true;
};
export type ClusterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClusterWhereInput;
    orderBy?: Prisma.ClusterOrderByWithRelationInput | Prisma.ClusterOrderByWithRelationInput[];
    cursor?: Prisma.ClusterWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClusterCountAggregateInputType;
    _avg?: ClusterAvgAggregateInputType;
    _sum?: ClusterSumAggregateInputType;
    _min?: ClusterMinAggregateInputType;
    _max?: ClusterMaxAggregateInputType;
};
export type GetClusterAggregateType<T extends ClusterAggregateArgs> = {
    [P in keyof T & keyof AggregateCluster]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCluster[P]> : Prisma.GetScalarType<T[P], AggregateCluster[P]>;
};
export type ClusterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClusterWhereInput;
    orderBy?: Prisma.ClusterOrderByWithAggregationInput | Prisma.ClusterOrderByWithAggregationInput[];
    by: Prisma.ClusterScalarFieldEnum[] | Prisma.ClusterScalarFieldEnum;
    having?: Prisma.ClusterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClusterCountAggregateInputType | true;
    _avg?: ClusterAvgAggregateInputType;
    _sum?: ClusterSumAggregateInputType;
    _min?: ClusterMinAggregateInputType;
    _max?: ClusterMaxAggregateInputType;
};
export type ClusterGroupByOutputType = {
    id: string;
    userId: string;
    analysisRunId: string;
    name: string;
    suggestedName: string | null;
    color: string;
    index: number;
    silhouetteScore: number | null;
    wcss: number | null;
    createdAt: Date;
    _count: ClusterCountAggregateOutputType | null;
    _avg: ClusterAvgAggregateOutputType | null;
    _sum: ClusterSumAggregateOutputType | null;
    _min: ClusterMinAggregateOutputType | null;
    _max: ClusterMaxAggregateOutputType | null;
};
export type GetClusterGroupByPayload<T extends ClusterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClusterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClusterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClusterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClusterGroupByOutputType[P]>;
}>>;
export type ClusterWhereInput = {
    AND?: Prisma.ClusterWhereInput | Prisma.ClusterWhereInput[];
    OR?: Prisma.ClusterWhereInput[];
    NOT?: Prisma.ClusterWhereInput | Prisma.ClusterWhereInput[];
    id?: Prisma.StringFilter<"Cluster"> | string;
    userId?: Prisma.StringFilter<"Cluster"> | string;
    analysisRunId?: Prisma.StringFilter<"Cluster"> | string;
    name?: Prisma.StringFilter<"Cluster"> | string;
    suggestedName?: Prisma.StringNullableFilter<"Cluster"> | string | null;
    color?: Prisma.StringFilter<"Cluster"> | string;
    index?: Prisma.IntFilter<"Cluster"> | number;
    silhouetteScore?: Prisma.FloatNullableFilter<"Cluster"> | number | null;
    wcss?: Prisma.FloatNullableFilter<"Cluster"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Cluster"> | Date | string;
    analysisRun?: Prisma.XOR<Prisma.AnalysisRunScalarRelationFilter, Prisma.AnalysisRunWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
};
export type ClusterOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    analysisRunId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    suggestedName?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    wcss?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    analysisRun?: Prisma.AnalysisRunOrderByWithRelationInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
};
export type ClusterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ClusterWhereInput | Prisma.ClusterWhereInput[];
    OR?: Prisma.ClusterWhereInput[];
    NOT?: Prisma.ClusterWhereInput | Prisma.ClusterWhereInput[];
    userId?: Prisma.StringFilter<"Cluster"> | string;
    analysisRunId?: Prisma.StringFilter<"Cluster"> | string;
    name?: Prisma.StringFilter<"Cluster"> | string;
    suggestedName?: Prisma.StringNullableFilter<"Cluster"> | string | null;
    color?: Prisma.StringFilter<"Cluster"> | string;
    index?: Prisma.IntFilter<"Cluster"> | number;
    silhouetteScore?: Prisma.FloatNullableFilter<"Cluster"> | number | null;
    wcss?: Prisma.FloatNullableFilter<"Cluster"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Cluster"> | Date | string;
    analysisRun?: Prisma.XOR<Prisma.AnalysisRunScalarRelationFilter, Prisma.AnalysisRunWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
}, "id">;
export type ClusterOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    analysisRunId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    suggestedName?: Prisma.SortOrderInput | Prisma.SortOrder;
    color?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    wcss?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ClusterCountOrderByAggregateInput;
    _avg?: Prisma.ClusterAvgOrderByAggregateInput;
    _max?: Prisma.ClusterMaxOrderByAggregateInput;
    _min?: Prisma.ClusterMinOrderByAggregateInput;
    _sum?: Prisma.ClusterSumOrderByAggregateInput;
};
export type ClusterScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClusterScalarWhereWithAggregatesInput | Prisma.ClusterScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClusterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClusterScalarWhereWithAggregatesInput | Prisma.ClusterScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Cluster"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Cluster"> | string;
    analysisRunId?: Prisma.StringWithAggregatesFilter<"Cluster"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Cluster"> | string;
    suggestedName?: Prisma.StringNullableWithAggregatesFilter<"Cluster"> | string | null;
    color?: Prisma.StringWithAggregatesFilter<"Cluster"> | string;
    index?: Prisma.IntWithAggregatesFilter<"Cluster"> | number;
    silhouetteScore?: Prisma.FloatNullableWithAggregatesFilter<"Cluster"> | number | null;
    wcss?: Prisma.FloatNullableWithAggregatesFilter<"Cluster"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Cluster"> | Date | string;
};
export type ClusterCreateInput = {
    id?: string;
    userId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
    analysisRun: Prisma.AnalysisRunCreateNestedOneWithoutClustersInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutClusterInput;
};
export type ClusterUncheckedCreateInput = {
    id?: string;
    userId: string;
    analysisRunId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutClusterInput;
};
export type ClusterUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analysisRun?: Prisma.AnalysisRunUpdateOneRequiredWithoutClustersNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutClusterNestedInput;
};
export type ClusterUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisRunId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutClusterNestedInput;
};
export type ClusterCreateManyInput = {
    id?: string;
    userId: string;
    analysisRunId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
};
export type ClusterUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClusterUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisRunId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClusterNullableScalarRelationFilter = {
    is?: Prisma.ClusterWhereInput | null;
    isNot?: Prisma.ClusterWhereInput | null;
};
export type ClusterCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    analysisRunId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    suggestedName?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    wcss?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClusterAvgOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    wcss?: Prisma.SortOrder;
};
export type ClusterMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    analysisRunId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    suggestedName?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    wcss?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClusterMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    analysisRunId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    suggestedName?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    wcss?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClusterSumOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    wcss?: Prisma.SortOrder;
};
export type ClusterListRelationFilter = {
    every?: Prisma.ClusterWhereInput;
    some?: Prisma.ClusterWhereInput;
    none?: Prisma.ClusterWhereInput;
};
export type ClusterOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ClusterCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.ClusterCreateWithoutTransactionsInput, Prisma.ClusterUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.ClusterCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.ClusterWhereUniqueInput;
};
export type ClusterUpdateOneWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.ClusterCreateWithoutTransactionsInput, Prisma.ClusterUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.ClusterCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.ClusterUpsertWithoutTransactionsInput;
    disconnect?: Prisma.ClusterWhereInput | boolean;
    delete?: Prisma.ClusterWhereInput | boolean;
    connect?: Prisma.ClusterWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClusterUpdateToOneWithWhereWithoutTransactionsInput, Prisma.ClusterUpdateWithoutTransactionsInput>, Prisma.ClusterUncheckedUpdateWithoutTransactionsInput>;
};
export type ClusterCreateNestedManyWithoutAnalysisRunInput = {
    create?: Prisma.XOR<Prisma.ClusterCreateWithoutAnalysisRunInput, Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput> | Prisma.ClusterCreateWithoutAnalysisRunInput[] | Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput[];
    connectOrCreate?: Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput | Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput[];
    createMany?: Prisma.ClusterCreateManyAnalysisRunInputEnvelope;
    connect?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
};
export type ClusterUncheckedCreateNestedManyWithoutAnalysisRunInput = {
    create?: Prisma.XOR<Prisma.ClusterCreateWithoutAnalysisRunInput, Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput> | Prisma.ClusterCreateWithoutAnalysisRunInput[] | Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput[];
    connectOrCreate?: Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput | Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput[];
    createMany?: Prisma.ClusterCreateManyAnalysisRunInputEnvelope;
    connect?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
};
export type ClusterUpdateManyWithoutAnalysisRunNestedInput = {
    create?: Prisma.XOR<Prisma.ClusterCreateWithoutAnalysisRunInput, Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput> | Prisma.ClusterCreateWithoutAnalysisRunInput[] | Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput[];
    connectOrCreate?: Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput | Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput[];
    upsert?: Prisma.ClusterUpsertWithWhereUniqueWithoutAnalysisRunInput | Prisma.ClusterUpsertWithWhereUniqueWithoutAnalysisRunInput[];
    createMany?: Prisma.ClusterCreateManyAnalysisRunInputEnvelope;
    set?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    disconnect?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    delete?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    connect?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    update?: Prisma.ClusterUpdateWithWhereUniqueWithoutAnalysisRunInput | Prisma.ClusterUpdateWithWhereUniqueWithoutAnalysisRunInput[];
    updateMany?: Prisma.ClusterUpdateManyWithWhereWithoutAnalysisRunInput | Prisma.ClusterUpdateManyWithWhereWithoutAnalysisRunInput[];
    deleteMany?: Prisma.ClusterScalarWhereInput | Prisma.ClusterScalarWhereInput[];
};
export type ClusterUncheckedUpdateManyWithoutAnalysisRunNestedInput = {
    create?: Prisma.XOR<Prisma.ClusterCreateWithoutAnalysisRunInput, Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput> | Prisma.ClusterCreateWithoutAnalysisRunInput[] | Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput[];
    connectOrCreate?: Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput | Prisma.ClusterCreateOrConnectWithoutAnalysisRunInput[];
    upsert?: Prisma.ClusterUpsertWithWhereUniqueWithoutAnalysisRunInput | Prisma.ClusterUpsertWithWhereUniqueWithoutAnalysisRunInput[];
    createMany?: Prisma.ClusterCreateManyAnalysisRunInputEnvelope;
    set?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    disconnect?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    delete?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    connect?: Prisma.ClusterWhereUniqueInput | Prisma.ClusterWhereUniqueInput[];
    update?: Prisma.ClusterUpdateWithWhereUniqueWithoutAnalysisRunInput | Prisma.ClusterUpdateWithWhereUniqueWithoutAnalysisRunInput[];
    updateMany?: Prisma.ClusterUpdateManyWithWhereWithoutAnalysisRunInput | Prisma.ClusterUpdateManyWithWhereWithoutAnalysisRunInput[];
    deleteMany?: Prisma.ClusterScalarWhereInput | Prisma.ClusterScalarWhereInput[];
};
export type ClusterCreateWithoutTransactionsInput = {
    id?: string;
    userId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
    analysisRun: Prisma.AnalysisRunCreateNestedOneWithoutClustersInput;
};
export type ClusterUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    userId: string;
    analysisRunId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
};
export type ClusterCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.ClusterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClusterCreateWithoutTransactionsInput, Prisma.ClusterUncheckedCreateWithoutTransactionsInput>;
};
export type ClusterUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.ClusterUpdateWithoutTransactionsInput, Prisma.ClusterUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.ClusterCreateWithoutTransactionsInput, Prisma.ClusterUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.ClusterWhereInput;
};
export type ClusterUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.ClusterWhereInput;
    data: Prisma.XOR<Prisma.ClusterUpdateWithoutTransactionsInput, Prisma.ClusterUncheckedUpdateWithoutTransactionsInput>;
};
export type ClusterUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analysisRun?: Prisma.AnalysisRunUpdateOneRequiredWithoutClustersNestedInput;
};
export type ClusterUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisRunId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClusterCreateWithoutAnalysisRunInput = {
    id?: string;
    userId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
    transactions?: Prisma.TransactionCreateNestedManyWithoutClusterInput;
};
export type ClusterUncheckedCreateWithoutAnalysisRunInput = {
    id?: string;
    userId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutClusterInput;
};
export type ClusterCreateOrConnectWithoutAnalysisRunInput = {
    where: Prisma.ClusterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClusterCreateWithoutAnalysisRunInput, Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput>;
};
export type ClusterCreateManyAnalysisRunInputEnvelope = {
    data: Prisma.ClusterCreateManyAnalysisRunInput | Prisma.ClusterCreateManyAnalysisRunInput[];
    skipDuplicates?: boolean;
};
export type ClusterUpsertWithWhereUniqueWithoutAnalysisRunInput = {
    where: Prisma.ClusterWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClusterUpdateWithoutAnalysisRunInput, Prisma.ClusterUncheckedUpdateWithoutAnalysisRunInput>;
    create: Prisma.XOR<Prisma.ClusterCreateWithoutAnalysisRunInput, Prisma.ClusterUncheckedCreateWithoutAnalysisRunInput>;
};
export type ClusterUpdateWithWhereUniqueWithoutAnalysisRunInput = {
    where: Prisma.ClusterWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClusterUpdateWithoutAnalysisRunInput, Prisma.ClusterUncheckedUpdateWithoutAnalysisRunInput>;
};
export type ClusterUpdateManyWithWhereWithoutAnalysisRunInput = {
    where: Prisma.ClusterScalarWhereInput;
    data: Prisma.XOR<Prisma.ClusterUpdateManyMutationInput, Prisma.ClusterUncheckedUpdateManyWithoutAnalysisRunInput>;
};
export type ClusterScalarWhereInput = {
    AND?: Prisma.ClusterScalarWhereInput | Prisma.ClusterScalarWhereInput[];
    OR?: Prisma.ClusterScalarWhereInput[];
    NOT?: Prisma.ClusterScalarWhereInput | Prisma.ClusterScalarWhereInput[];
    id?: Prisma.StringFilter<"Cluster"> | string;
    userId?: Prisma.StringFilter<"Cluster"> | string;
    analysisRunId?: Prisma.StringFilter<"Cluster"> | string;
    name?: Prisma.StringFilter<"Cluster"> | string;
    suggestedName?: Prisma.StringNullableFilter<"Cluster"> | string | null;
    color?: Prisma.StringFilter<"Cluster"> | string;
    index?: Prisma.IntFilter<"Cluster"> | number;
    silhouetteScore?: Prisma.FloatNullableFilter<"Cluster"> | number | null;
    wcss?: Prisma.FloatNullableFilter<"Cluster"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Cluster"> | Date | string;
};
export type ClusterCreateManyAnalysisRunInput = {
    id?: string;
    userId: string;
    name: string;
    suggestedName?: string | null;
    color?: string;
    index?: number;
    silhouetteScore?: number | null;
    wcss?: number | null;
    createdAt?: Date | string;
};
export type ClusterUpdateWithoutAnalysisRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUpdateManyWithoutClusterNestedInput;
};
export type ClusterUncheckedUpdateWithoutAnalysisRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutClusterNestedInput;
};
export type ClusterUncheckedUpdateManyWithoutAnalysisRunInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    suggestedName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcss?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClusterCountOutputType = {
    transactions: number;
};
export type ClusterCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | ClusterCountOutputTypeCountTransactionsArgs;
};
export type ClusterCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterCountOutputTypeSelect<ExtArgs> | null;
};
export type ClusterCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type ClusterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    analysisRunId?: boolean;
    name?: boolean;
    suggestedName?: boolean;
    color?: boolean;
    index?: boolean;
    silhouetteScore?: boolean;
    wcss?: boolean;
    createdAt?: boolean;
    analysisRun?: boolean | Prisma.AnalysisRunDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Cluster$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClusterCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cluster"]>;
export type ClusterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    analysisRunId?: boolean;
    name?: boolean;
    suggestedName?: boolean;
    color?: boolean;
    index?: boolean;
    silhouetteScore?: boolean;
    wcss?: boolean;
    createdAt?: boolean;
    analysisRun?: boolean | Prisma.AnalysisRunDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cluster"]>;
export type ClusterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    analysisRunId?: boolean;
    name?: boolean;
    suggestedName?: boolean;
    color?: boolean;
    index?: boolean;
    silhouetteScore?: boolean;
    wcss?: boolean;
    createdAt?: boolean;
    analysisRun?: boolean | Prisma.AnalysisRunDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cluster"]>;
export type ClusterSelectScalar = {
    id?: boolean;
    userId?: boolean;
    analysisRunId?: boolean;
    name?: boolean;
    suggestedName?: boolean;
    color?: boolean;
    index?: boolean;
    silhouetteScore?: boolean;
    wcss?: boolean;
    createdAt?: boolean;
};
export type ClusterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "analysisRunId" | "name" | "suggestedName" | "color" | "index" | "silhouetteScore" | "wcss" | "createdAt", ExtArgs["result"]["cluster"]>;
export type ClusterInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analysisRun?: boolean | Prisma.AnalysisRunDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Cluster$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClusterCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ClusterIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analysisRun?: boolean | Prisma.AnalysisRunDefaultArgs<ExtArgs>;
};
export type ClusterIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analysisRun?: boolean | Prisma.AnalysisRunDefaultArgs<ExtArgs>;
};
export type $ClusterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Cluster";
    objects: {
        analysisRun: Prisma.$AnalysisRunPayload<ExtArgs>;
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        analysisRunId: string;
        name: string;
        suggestedName: string | null;
        color: string;
        index: number;
        silhouetteScore: number | null;
        wcss: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["cluster"]>;
    composites: {};
};
export type ClusterGetPayload<S extends boolean | null | undefined | ClusterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClusterPayload, S>;
export type ClusterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClusterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClusterCountAggregateInputType | true;
};
export interface ClusterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Cluster'];
        meta: {
            name: 'Cluster';
        };
    };
    findUnique<T extends ClusterFindUniqueArgs>(args: Prisma.SelectSubset<T, ClusterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClusterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClusterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClusterFindFirstArgs>(args?: Prisma.SelectSubset<T, ClusterFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClusterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClusterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClusterFindManyArgs>(args?: Prisma.SelectSubset<T, ClusterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClusterCreateArgs>(args: Prisma.SelectSubset<T, ClusterCreateArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClusterCreateManyArgs>(args?: Prisma.SelectSubset<T, ClusterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClusterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClusterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClusterDeleteArgs>(args: Prisma.SelectSubset<T, ClusterDeleteArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClusterUpdateArgs>(args: Prisma.SelectSubset<T, ClusterUpdateArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClusterDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClusterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClusterUpdateManyArgs>(args: Prisma.SelectSubset<T, ClusterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClusterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClusterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClusterUpsertArgs>(args: Prisma.SelectSubset<T, ClusterUpsertArgs<ExtArgs>>): Prisma.Prisma__ClusterClient<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClusterCountArgs>(args?: Prisma.Subset<T, ClusterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClusterCountAggregateOutputType> : number>;
    aggregate<T extends ClusterAggregateArgs>(args: Prisma.Subset<T, ClusterAggregateArgs>): Prisma.PrismaPromise<GetClusterAggregateType<T>>;
    groupBy<T extends ClusterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClusterGroupByArgs['orderBy'];
    } : {
        orderBy?: ClusterGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClusterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClusterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClusterFieldRefs;
}
export interface Prisma__ClusterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    analysisRun<T extends Prisma.AnalysisRunDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AnalysisRunDefaultArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Cluster$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Cluster$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClusterFieldRefs {
    readonly id: Prisma.FieldRef<"Cluster", 'String'>;
    readonly userId: Prisma.FieldRef<"Cluster", 'String'>;
    readonly analysisRunId: Prisma.FieldRef<"Cluster", 'String'>;
    readonly name: Prisma.FieldRef<"Cluster", 'String'>;
    readonly suggestedName: Prisma.FieldRef<"Cluster", 'String'>;
    readonly color: Prisma.FieldRef<"Cluster", 'String'>;
    readonly index: Prisma.FieldRef<"Cluster", 'Int'>;
    readonly silhouetteScore: Prisma.FieldRef<"Cluster", 'Float'>;
    readonly wcss: Prisma.FieldRef<"Cluster", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Cluster", 'DateTime'>;
}
export type ClusterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where: Prisma.ClusterWhereUniqueInput;
};
export type ClusterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where: Prisma.ClusterWhereUniqueInput;
};
export type ClusterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where?: Prisma.ClusterWhereInput;
    orderBy?: Prisma.ClusterOrderByWithRelationInput | Prisma.ClusterOrderByWithRelationInput[];
    cursor?: Prisma.ClusterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClusterScalarFieldEnum | Prisma.ClusterScalarFieldEnum[];
};
export type ClusterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where?: Prisma.ClusterWhereInput;
    orderBy?: Prisma.ClusterOrderByWithRelationInput | Prisma.ClusterOrderByWithRelationInput[];
    cursor?: Prisma.ClusterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClusterScalarFieldEnum | Prisma.ClusterScalarFieldEnum[];
};
export type ClusterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where?: Prisma.ClusterWhereInput;
    orderBy?: Prisma.ClusterOrderByWithRelationInput | Prisma.ClusterOrderByWithRelationInput[];
    cursor?: Prisma.ClusterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClusterScalarFieldEnum | Prisma.ClusterScalarFieldEnum[];
};
export type ClusterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClusterCreateInput, Prisma.ClusterUncheckedCreateInput>;
};
export type ClusterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClusterCreateManyInput | Prisma.ClusterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClusterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    data: Prisma.ClusterCreateManyInput | Prisma.ClusterCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ClusterIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ClusterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClusterUpdateInput, Prisma.ClusterUncheckedUpdateInput>;
    where: Prisma.ClusterWhereUniqueInput;
};
export type ClusterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClusterUpdateManyMutationInput, Prisma.ClusterUncheckedUpdateManyInput>;
    where?: Prisma.ClusterWhereInput;
    limit?: number;
};
export type ClusterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClusterUpdateManyMutationInput, Prisma.ClusterUncheckedUpdateManyInput>;
    where?: Prisma.ClusterWhereInput;
    limit?: number;
    include?: Prisma.ClusterIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ClusterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where: Prisma.ClusterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClusterCreateInput, Prisma.ClusterUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClusterUpdateInput, Prisma.ClusterUncheckedUpdateInput>;
};
export type ClusterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
    where: Prisma.ClusterWhereUniqueInput;
};
export type ClusterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClusterWhereInput;
    limit?: number;
};
export type Cluster$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type ClusterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClusterSelect<ExtArgs> | null;
    omit?: Prisma.ClusterOmit<ExtArgs> | null;
    include?: Prisma.ClusterInclude<ExtArgs> | null;
};
//# sourceMappingURL=Cluster.d.ts.map