import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AnalysisRunModel = runtime.Types.Result.DefaultSelection<Prisma.$AnalysisRunPayload>;
export type AggregateAnalysisRun = {
    _count: AnalysisRunCountAggregateOutputType | null;
    _avg: AnalysisRunAvgAggregateOutputType | null;
    _sum: AnalysisRunSumAggregateOutputType | null;
    _min: AnalysisRunMinAggregateOutputType | null;
    _max: AnalysisRunMaxAggregateOutputType | null;
};
export type AnalysisRunAvgAggregateOutputType = {
    totalTransactions: number | null;
    kOptimal: number | null;
    silhouetteScore: number | null;
    durationMs: number | null;
};
export type AnalysisRunSumAggregateOutputType = {
    totalTransactions: number | null;
    kOptimal: number | null;
    silhouetteScore: number | null;
    durationMs: number | null;
};
export type AnalysisRunMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    status: string | null;
    totalTransactions: number | null;
    kOptimal: number | null;
    silhouetteScore: number | null;
    durationMs: number | null;
    errorMessage: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
};
export type AnalysisRunMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    status: string | null;
    totalTransactions: number | null;
    kOptimal: number | null;
    silhouetteScore: number | null;
    durationMs: number | null;
    errorMessage: string | null;
    createdAt: Date | null;
    completedAt: Date | null;
};
export type AnalysisRunCountAggregateOutputType = {
    id: number;
    userId: number;
    status: number;
    totalTransactions: number;
    kOptimal: number;
    silhouetteScore: number;
    wcssValues: number;
    durationMs: number;
    errorMessage: number;
    createdAt: number;
    completedAt: number;
    _all: number;
};
export type AnalysisRunAvgAggregateInputType = {
    totalTransactions?: true;
    kOptimal?: true;
    silhouetteScore?: true;
    durationMs?: true;
};
export type AnalysisRunSumAggregateInputType = {
    totalTransactions?: true;
    kOptimal?: true;
    silhouetteScore?: true;
    durationMs?: true;
};
export type AnalysisRunMinAggregateInputType = {
    id?: true;
    userId?: true;
    status?: true;
    totalTransactions?: true;
    kOptimal?: true;
    silhouetteScore?: true;
    durationMs?: true;
    errorMessage?: true;
    createdAt?: true;
    completedAt?: true;
};
export type AnalysisRunMaxAggregateInputType = {
    id?: true;
    userId?: true;
    status?: true;
    totalTransactions?: true;
    kOptimal?: true;
    silhouetteScore?: true;
    durationMs?: true;
    errorMessage?: true;
    createdAt?: true;
    completedAt?: true;
};
export type AnalysisRunCountAggregateInputType = {
    id?: true;
    userId?: true;
    status?: true;
    totalTransactions?: true;
    kOptimal?: true;
    silhouetteScore?: true;
    wcssValues?: true;
    durationMs?: true;
    errorMessage?: true;
    createdAt?: true;
    completedAt?: true;
    _all?: true;
};
export type AnalysisRunAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisRunWhereInput;
    orderBy?: Prisma.AnalysisRunOrderByWithRelationInput | Prisma.AnalysisRunOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisRunWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AnalysisRunCountAggregateInputType;
    _avg?: AnalysisRunAvgAggregateInputType;
    _sum?: AnalysisRunSumAggregateInputType;
    _min?: AnalysisRunMinAggregateInputType;
    _max?: AnalysisRunMaxAggregateInputType;
};
export type GetAnalysisRunAggregateType<T extends AnalysisRunAggregateArgs> = {
    [P in keyof T & keyof AggregateAnalysisRun]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAnalysisRun[P]> : Prisma.GetScalarType<T[P], AggregateAnalysisRun[P]>;
};
export type AnalysisRunGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisRunWhereInput;
    orderBy?: Prisma.AnalysisRunOrderByWithAggregationInput | Prisma.AnalysisRunOrderByWithAggregationInput[];
    by: Prisma.AnalysisRunScalarFieldEnum[] | Prisma.AnalysisRunScalarFieldEnum;
    having?: Prisma.AnalysisRunScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AnalysisRunCountAggregateInputType | true;
    _avg?: AnalysisRunAvgAggregateInputType;
    _sum?: AnalysisRunSumAggregateInputType;
    _min?: AnalysisRunMinAggregateInputType;
    _max?: AnalysisRunMaxAggregateInputType;
};
export type AnalysisRunGroupByOutputType = {
    id: string;
    userId: string;
    status: string;
    totalTransactions: number;
    kOptimal: number | null;
    silhouetteScore: number | null;
    wcssValues: runtime.JsonValue | null;
    durationMs: number | null;
    errorMessage: string | null;
    createdAt: Date;
    completedAt: Date | null;
    _count: AnalysisRunCountAggregateOutputType | null;
    _avg: AnalysisRunAvgAggregateOutputType | null;
    _sum: AnalysisRunSumAggregateOutputType | null;
    _min: AnalysisRunMinAggregateOutputType | null;
    _max: AnalysisRunMaxAggregateOutputType | null;
};
export type GetAnalysisRunGroupByPayload<T extends AnalysisRunGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AnalysisRunGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AnalysisRunGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AnalysisRunGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AnalysisRunGroupByOutputType[P]>;
}>>;
export type AnalysisRunWhereInput = {
    AND?: Prisma.AnalysisRunWhereInput | Prisma.AnalysisRunWhereInput[];
    OR?: Prisma.AnalysisRunWhereInput[];
    NOT?: Prisma.AnalysisRunWhereInput | Prisma.AnalysisRunWhereInput[];
    id?: Prisma.StringFilter<"AnalysisRun"> | string;
    userId?: Prisma.StringFilter<"AnalysisRun"> | string;
    status?: Prisma.StringFilter<"AnalysisRun"> | string;
    totalTransactions?: Prisma.IntFilter<"AnalysisRun"> | number;
    kOptimal?: Prisma.IntNullableFilter<"AnalysisRun"> | number | null;
    silhouetteScore?: Prisma.FloatNullableFilter<"AnalysisRun"> | number | null;
    wcssValues?: Prisma.JsonNullableFilter<"AnalysisRun">;
    durationMs?: Prisma.IntNullableFilter<"AnalysisRun"> | number | null;
    errorMessage?: Prisma.StringNullableFilter<"AnalysisRun"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AnalysisRun"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"AnalysisRun"> | Date | string | null;
    clusters?: Prisma.ClusterListRelationFilter;
};
export type AnalysisRunOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrderInput | Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    wcssValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    clusters?: Prisma.ClusterOrderByRelationAggregateInput;
};
export type AnalysisRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AnalysisRunWhereInput | Prisma.AnalysisRunWhereInput[];
    OR?: Prisma.AnalysisRunWhereInput[];
    NOT?: Prisma.AnalysisRunWhereInput | Prisma.AnalysisRunWhereInput[];
    userId?: Prisma.StringFilter<"AnalysisRun"> | string;
    status?: Prisma.StringFilter<"AnalysisRun"> | string;
    totalTransactions?: Prisma.IntFilter<"AnalysisRun"> | number;
    kOptimal?: Prisma.IntNullableFilter<"AnalysisRun"> | number | null;
    silhouetteScore?: Prisma.FloatNullableFilter<"AnalysisRun"> | number | null;
    wcssValues?: Prisma.JsonNullableFilter<"AnalysisRun">;
    durationMs?: Prisma.IntNullableFilter<"AnalysisRun"> | number | null;
    errorMessage?: Prisma.StringNullableFilter<"AnalysisRun"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AnalysisRun"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"AnalysisRun"> | Date | string | null;
    clusters?: Prisma.ClusterListRelationFilter;
}, "id">;
export type AnalysisRunOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrderInput | Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    wcssValues?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AnalysisRunCountOrderByAggregateInput;
    _avg?: Prisma.AnalysisRunAvgOrderByAggregateInput;
    _max?: Prisma.AnalysisRunMaxOrderByAggregateInput;
    _min?: Prisma.AnalysisRunMinOrderByAggregateInput;
    _sum?: Prisma.AnalysisRunSumOrderByAggregateInput;
};
export type AnalysisRunScalarWhereWithAggregatesInput = {
    AND?: Prisma.AnalysisRunScalarWhereWithAggregatesInput | Prisma.AnalysisRunScalarWhereWithAggregatesInput[];
    OR?: Prisma.AnalysisRunScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AnalysisRunScalarWhereWithAggregatesInput | Prisma.AnalysisRunScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AnalysisRun"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"AnalysisRun"> | string;
    status?: Prisma.StringWithAggregatesFilter<"AnalysisRun"> | string;
    totalTransactions?: Prisma.IntWithAggregatesFilter<"AnalysisRun"> | number;
    kOptimal?: Prisma.IntNullableWithAggregatesFilter<"AnalysisRun"> | number | null;
    silhouetteScore?: Prisma.FloatNullableWithAggregatesFilter<"AnalysisRun"> | number | null;
    wcssValues?: Prisma.JsonNullableWithAggregatesFilter<"AnalysisRun">;
    durationMs?: Prisma.IntNullableWithAggregatesFilter<"AnalysisRun"> | number | null;
    errorMessage?: Prisma.StringNullableWithAggregatesFilter<"AnalysisRun"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AnalysisRun"> | Date | string;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AnalysisRun"> | Date | string | null;
};
export type AnalysisRunCreateInput = {
    id?: string;
    userId: string;
    status?: string;
    totalTransactions: number;
    kOptimal?: number | null;
    silhouetteScore?: number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: number | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    clusters?: Prisma.ClusterCreateNestedManyWithoutAnalysisRunInput;
};
export type AnalysisRunUncheckedCreateInput = {
    id?: string;
    userId: string;
    status?: string;
    totalTransactions: number;
    kOptimal?: number | null;
    silhouetteScore?: number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: number | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    clusters?: Prisma.ClusterUncheckedCreateNestedManyWithoutAnalysisRunInput;
};
export type AnalysisRunUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    kOptimal?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clusters?: Prisma.ClusterUpdateManyWithoutAnalysisRunNestedInput;
};
export type AnalysisRunUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    kOptimal?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    clusters?: Prisma.ClusterUncheckedUpdateManyWithoutAnalysisRunNestedInput;
};
export type AnalysisRunCreateManyInput = {
    id?: string;
    userId: string;
    status?: string;
    totalTransactions: number;
    kOptimal?: number | null;
    silhouetteScore?: number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: number | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type AnalysisRunUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    kOptimal?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AnalysisRunUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    kOptimal?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AnalysisRunScalarRelationFilter = {
    is?: Prisma.AnalysisRunWhereInput;
    isNot?: Prisma.AnalysisRunWhereInput;
};
export type AnalysisRunCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    wcssValues?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type AnalysisRunAvgOrderByAggregateInput = {
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
};
export type AnalysisRunMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type AnalysisRunMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type AnalysisRunSumOrderByAggregateInput = {
    totalTransactions?: Prisma.SortOrder;
    kOptimal?: Prisma.SortOrder;
    silhouetteScore?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
};
export type AnalysisRunCreateNestedOneWithoutClustersInput = {
    create?: Prisma.XOR<Prisma.AnalysisRunCreateWithoutClustersInput, Prisma.AnalysisRunUncheckedCreateWithoutClustersInput>;
    connectOrCreate?: Prisma.AnalysisRunCreateOrConnectWithoutClustersInput;
    connect?: Prisma.AnalysisRunWhereUniqueInput;
};
export type AnalysisRunUpdateOneRequiredWithoutClustersNestedInput = {
    create?: Prisma.XOR<Prisma.AnalysisRunCreateWithoutClustersInput, Prisma.AnalysisRunUncheckedCreateWithoutClustersInput>;
    connectOrCreate?: Prisma.AnalysisRunCreateOrConnectWithoutClustersInput;
    upsert?: Prisma.AnalysisRunUpsertWithoutClustersInput;
    connect?: Prisma.AnalysisRunWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AnalysisRunUpdateToOneWithWhereWithoutClustersInput, Prisma.AnalysisRunUpdateWithoutClustersInput>, Prisma.AnalysisRunUncheckedUpdateWithoutClustersInput>;
};
export type AnalysisRunCreateWithoutClustersInput = {
    id?: string;
    userId: string;
    status?: string;
    totalTransactions: number;
    kOptimal?: number | null;
    silhouetteScore?: number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: number | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type AnalysisRunUncheckedCreateWithoutClustersInput = {
    id?: string;
    userId: string;
    status?: string;
    totalTransactions: number;
    kOptimal?: number | null;
    silhouetteScore?: number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: number | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type AnalysisRunCreateOrConnectWithoutClustersInput = {
    where: Prisma.AnalysisRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisRunCreateWithoutClustersInput, Prisma.AnalysisRunUncheckedCreateWithoutClustersInput>;
};
export type AnalysisRunUpsertWithoutClustersInput = {
    update: Prisma.XOR<Prisma.AnalysisRunUpdateWithoutClustersInput, Prisma.AnalysisRunUncheckedUpdateWithoutClustersInput>;
    create: Prisma.XOR<Prisma.AnalysisRunCreateWithoutClustersInput, Prisma.AnalysisRunUncheckedCreateWithoutClustersInput>;
    where?: Prisma.AnalysisRunWhereInput;
};
export type AnalysisRunUpdateToOneWithWhereWithoutClustersInput = {
    where?: Prisma.AnalysisRunWhereInput;
    data: Prisma.XOR<Prisma.AnalysisRunUpdateWithoutClustersInput, Prisma.AnalysisRunUncheckedUpdateWithoutClustersInput>;
};
export type AnalysisRunUpdateWithoutClustersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    kOptimal?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AnalysisRunUncheckedUpdateWithoutClustersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    kOptimal?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    silhouetteScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    wcssValues?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AnalysisRunCountOutputType = {
    clusters: number;
};
export type AnalysisRunCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    clusters?: boolean | AnalysisRunCountOutputTypeCountClustersArgs;
};
export type AnalysisRunCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunCountOutputTypeSelect<ExtArgs> | null;
};
export type AnalysisRunCountOutputTypeCountClustersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClusterWhereInput;
};
export type AnalysisRunSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    totalTransactions?: boolean;
    kOptimal?: boolean;
    silhouetteScore?: boolean;
    wcssValues?: boolean;
    durationMs?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    clusters?: boolean | Prisma.AnalysisRun$clustersArgs<ExtArgs>;
    _count?: boolean | Prisma.AnalysisRunCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["analysisRun"]>;
export type AnalysisRunSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    totalTransactions?: boolean;
    kOptimal?: boolean;
    silhouetteScore?: boolean;
    wcssValues?: boolean;
    durationMs?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
}, ExtArgs["result"]["analysisRun"]>;
export type AnalysisRunSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    totalTransactions?: boolean;
    kOptimal?: boolean;
    silhouetteScore?: boolean;
    wcssValues?: boolean;
    durationMs?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
}, ExtArgs["result"]["analysisRun"]>;
export type AnalysisRunSelectScalar = {
    id?: boolean;
    userId?: boolean;
    status?: boolean;
    totalTransactions?: boolean;
    kOptimal?: boolean;
    silhouetteScore?: boolean;
    wcssValues?: boolean;
    durationMs?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
};
export type AnalysisRunOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "status" | "totalTransactions" | "kOptimal" | "silhouetteScore" | "wcssValues" | "durationMs" | "errorMessage" | "createdAt" | "completedAt", ExtArgs["result"]["analysisRun"]>;
export type AnalysisRunInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    clusters?: boolean | Prisma.AnalysisRun$clustersArgs<ExtArgs>;
    _count?: boolean | Prisma.AnalysisRunCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AnalysisRunIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AnalysisRunIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AnalysisRunPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AnalysisRun";
    objects: {
        clusters: Prisma.$ClusterPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        status: string;
        totalTransactions: number;
        kOptimal: number | null;
        silhouetteScore: number | null;
        wcssValues: runtime.JsonValue | null;
        durationMs: number | null;
        errorMessage: string | null;
        createdAt: Date;
        completedAt: Date | null;
    }, ExtArgs["result"]["analysisRun"]>;
    composites: {};
};
export type AnalysisRunGetPayload<S extends boolean | null | undefined | AnalysisRunDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload, S>;
export type AnalysisRunCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AnalysisRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AnalysisRunCountAggregateInputType | true;
};
export interface AnalysisRunDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AnalysisRun'];
        meta: {
            name: 'AnalysisRun';
        };
    };
    findUnique<T extends AnalysisRunFindUniqueArgs>(args: Prisma.SelectSubset<T, AnalysisRunFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AnalysisRunFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AnalysisRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AnalysisRunFindFirstArgs>(args?: Prisma.SelectSubset<T, AnalysisRunFindFirstArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AnalysisRunFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AnalysisRunFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AnalysisRunFindManyArgs>(args?: Prisma.SelectSubset<T, AnalysisRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AnalysisRunCreateArgs>(args: Prisma.SelectSubset<T, AnalysisRunCreateArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AnalysisRunCreateManyArgs>(args?: Prisma.SelectSubset<T, AnalysisRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AnalysisRunCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AnalysisRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AnalysisRunDeleteArgs>(args: Prisma.SelectSubset<T, AnalysisRunDeleteArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AnalysisRunUpdateArgs>(args: Prisma.SelectSubset<T, AnalysisRunUpdateArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AnalysisRunDeleteManyArgs>(args?: Prisma.SelectSubset<T, AnalysisRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AnalysisRunUpdateManyArgs>(args: Prisma.SelectSubset<T, AnalysisRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AnalysisRunUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AnalysisRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AnalysisRunUpsertArgs>(args: Prisma.SelectSubset<T, AnalysisRunUpsertArgs<ExtArgs>>): Prisma.Prisma__AnalysisRunClient<runtime.Types.Result.GetResult<Prisma.$AnalysisRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AnalysisRunCountArgs>(args?: Prisma.Subset<T, AnalysisRunCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AnalysisRunCountAggregateOutputType> : number>;
    aggregate<T extends AnalysisRunAggregateArgs>(args: Prisma.Subset<T, AnalysisRunAggregateArgs>): Prisma.PrismaPromise<GetAnalysisRunAggregateType<T>>;
    groupBy<T extends AnalysisRunGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AnalysisRunGroupByArgs['orderBy'];
    } : {
        orderBy?: AnalysisRunGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AnalysisRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AnalysisRunFieldRefs;
}
export interface Prisma__AnalysisRunClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    clusters<T extends Prisma.AnalysisRun$clustersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AnalysisRun$clustersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClusterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AnalysisRunFieldRefs {
    readonly id: Prisma.FieldRef<"AnalysisRun", 'String'>;
    readonly userId: Prisma.FieldRef<"AnalysisRun", 'String'>;
    readonly status: Prisma.FieldRef<"AnalysisRun", 'String'>;
    readonly totalTransactions: Prisma.FieldRef<"AnalysisRun", 'Int'>;
    readonly kOptimal: Prisma.FieldRef<"AnalysisRun", 'Int'>;
    readonly silhouetteScore: Prisma.FieldRef<"AnalysisRun", 'Float'>;
    readonly wcssValues: Prisma.FieldRef<"AnalysisRun", 'Json'>;
    readonly durationMs: Prisma.FieldRef<"AnalysisRun", 'Int'>;
    readonly errorMessage: Prisma.FieldRef<"AnalysisRun", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AnalysisRun", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"AnalysisRun", 'DateTime'>;
}
export type AnalysisRunFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where: Prisma.AnalysisRunWhereUniqueInput;
};
export type AnalysisRunFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where: Prisma.AnalysisRunWhereUniqueInput;
};
export type AnalysisRunFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where?: Prisma.AnalysisRunWhereInput;
    orderBy?: Prisma.AnalysisRunOrderByWithRelationInput | Prisma.AnalysisRunOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisRunScalarFieldEnum | Prisma.AnalysisRunScalarFieldEnum[];
};
export type AnalysisRunFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where?: Prisma.AnalysisRunWhereInput;
    orderBy?: Prisma.AnalysisRunOrderByWithRelationInput | Prisma.AnalysisRunOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisRunScalarFieldEnum | Prisma.AnalysisRunScalarFieldEnum[];
};
export type AnalysisRunFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where?: Prisma.AnalysisRunWhereInput;
    orderBy?: Prisma.AnalysisRunOrderByWithRelationInput | Prisma.AnalysisRunOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisRunScalarFieldEnum | Prisma.AnalysisRunScalarFieldEnum[];
};
export type AnalysisRunCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisRunCreateInput, Prisma.AnalysisRunUncheckedCreateInput>;
};
export type AnalysisRunCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AnalysisRunCreateManyInput | Prisma.AnalysisRunCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AnalysisRunCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    data: Prisma.AnalysisRunCreateManyInput | Prisma.AnalysisRunCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AnalysisRunUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisRunUpdateInput, Prisma.AnalysisRunUncheckedUpdateInput>;
    where: Prisma.AnalysisRunWhereUniqueInput;
};
export type AnalysisRunUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AnalysisRunUpdateManyMutationInput, Prisma.AnalysisRunUncheckedUpdateManyInput>;
    where?: Prisma.AnalysisRunWhereInput;
    limit?: number;
};
export type AnalysisRunUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisRunUpdateManyMutationInput, Prisma.AnalysisRunUncheckedUpdateManyInput>;
    where?: Prisma.AnalysisRunWhereInput;
    limit?: number;
};
export type AnalysisRunUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where: Prisma.AnalysisRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisRunCreateInput, Prisma.AnalysisRunUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AnalysisRunUpdateInput, Prisma.AnalysisRunUncheckedUpdateInput>;
};
export type AnalysisRunDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
    where: Prisma.AnalysisRunWhereUniqueInput;
};
export type AnalysisRunDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisRunWhereInput;
    limit?: number;
};
export type AnalysisRun$clustersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AnalysisRunDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisRunSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisRunOmit<ExtArgs> | null;
    include?: Prisma.AnalysisRunInclude<ExtArgs> | null;
};
//# sourceMappingURL=AnalysisRun.d.ts.map