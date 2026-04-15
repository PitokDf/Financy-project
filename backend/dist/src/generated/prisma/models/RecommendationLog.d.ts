import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RecommendationLogModel = runtime.Types.Result.DefaultSelection<Prisma.$RecommendationLogPayload>;
export type AggregateRecommendationLog = {
    _count: RecommendationLogCountAggregateOutputType | null;
    _avg: RecommendationLogAvgAggregateOutputType | null;
    _sum: RecommendationLogSumAggregateOutputType | null;
    _min: RecommendationLogMinAggregateOutputType | null;
    _max: RecommendationLogMaxAggregateOutputType | null;
};
export type RecommendationLogAvgAggregateOutputType = {
    inputLatencyMs: number | null;
};
export type RecommendationLogSumAggregateOutputType = {
    inputLatencyMs: number | null;
};
export type RecommendationLogMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    modelVariant: string | null;
    top1Correct: boolean | null;
    inTop3: boolean | null;
    inputLatencyMs: number | null;
    createdAt: Date | null;
};
export type RecommendationLogMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    modelVariant: string | null;
    top1Correct: boolean | null;
    inTop3: boolean | null;
    inputLatencyMs: number | null;
    createdAt: Date | null;
};
export type RecommendationLogCountAggregateOutputType = {
    id: number;
    userId: number;
    modelVariant: number;
    top1Correct: number;
    inTop3: number;
    inputLatencyMs: number;
    createdAt: number;
    _all: number;
};
export type RecommendationLogAvgAggregateInputType = {
    inputLatencyMs?: true;
};
export type RecommendationLogSumAggregateInputType = {
    inputLatencyMs?: true;
};
export type RecommendationLogMinAggregateInputType = {
    id?: true;
    userId?: true;
    modelVariant?: true;
    top1Correct?: true;
    inTop3?: true;
    inputLatencyMs?: true;
    createdAt?: true;
};
export type RecommendationLogMaxAggregateInputType = {
    id?: true;
    userId?: true;
    modelVariant?: true;
    top1Correct?: true;
    inTop3?: true;
    inputLatencyMs?: true;
    createdAt?: true;
};
export type RecommendationLogCountAggregateInputType = {
    id?: true;
    userId?: true;
    modelVariant?: true;
    top1Correct?: true;
    inTop3?: true;
    inputLatencyMs?: true;
    createdAt?: true;
    _all?: true;
};
export type RecommendationLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationLogWhereInput;
    orderBy?: Prisma.RecommendationLogOrderByWithRelationInput | Prisma.RecommendationLogOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecommendationLogCountAggregateInputType;
    _avg?: RecommendationLogAvgAggregateInputType;
    _sum?: RecommendationLogSumAggregateInputType;
    _min?: RecommendationLogMinAggregateInputType;
    _max?: RecommendationLogMaxAggregateInputType;
};
export type GetRecommendationLogAggregateType<T extends RecommendationLogAggregateArgs> = {
    [P in keyof T & keyof AggregateRecommendationLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecommendationLog[P]> : Prisma.GetScalarType<T[P], AggregateRecommendationLog[P]>;
};
export type RecommendationLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationLogWhereInput;
    orderBy?: Prisma.RecommendationLogOrderByWithAggregationInput | Prisma.RecommendationLogOrderByWithAggregationInput[];
    by: Prisma.RecommendationLogScalarFieldEnum[] | Prisma.RecommendationLogScalarFieldEnum;
    having?: Prisma.RecommendationLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecommendationLogCountAggregateInputType | true;
    _avg?: RecommendationLogAvgAggregateInputType;
    _sum?: RecommendationLogSumAggregateInputType;
    _min?: RecommendationLogMinAggregateInputType;
    _max?: RecommendationLogMaxAggregateInputType;
};
export type RecommendationLogGroupByOutputType = {
    id: string;
    userId: string;
    modelVariant: string;
    top1Correct: boolean;
    inTop3: boolean;
    inputLatencyMs: number;
    createdAt: Date;
    _count: RecommendationLogCountAggregateOutputType | null;
    _avg: RecommendationLogAvgAggregateOutputType | null;
    _sum: RecommendationLogSumAggregateOutputType | null;
    _min: RecommendationLogMinAggregateOutputType | null;
    _max: RecommendationLogMaxAggregateOutputType | null;
};
export type GetRecommendationLogGroupByPayload<T extends RecommendationLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecommendationLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecommendationLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecommendationLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecommendationLogGroupByOutputType[P]>;
}>>;
export type RecommendationLogWhereInput = {
    AND?: Prisma.RecommendationLogWhereInput | Prisma.RecommendationLogWhereInput[];
    OR?: Prisma.RecommendationLogWhereInput[];
    NOT?: Prisma.RecommendationLogWhereInput | Prisma.RecommendationLogWhereInput[];
    id?: Prisma.StringFilter<"RecommendationLog"> | string;
    userId?: Prisma.StringFilter<"RecommendationLog"> | string;
    modelVariant?: Prisma.StringFilter<"RecommendationLog"> | string;
    top1Correct?: Prisma.BoolFilter<"RecommendationLog"> | boolean;
    inTop3?: Prisma.BoolFilter<"RecommendationLog"> | boolean;
    inputLatencyMs?: Prisma.IntFilter<"RecommendationLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"RecommendationLog"> | Date | string;
};
export type RecommendationLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    modelVariant?: Prisma.SortOrder;
    top1Correct?: Prisma.SortOrder;
    inTop3?: Prisma.SortOrder;
    inputLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RecommendationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RecommendationLogWhereInput | Prisma.RecommendationLogWhereInput[];
    OR?: Prisma.RecommendationLogWhereInput[];
    NOT?: Prisma.RecommendationLogWhereInput | Prisma.RecommendationLogWhereInput[];
    userId?: Prisma.StringFilter<"RecommendationLog"> | string;
    modelVariant?: Prisma.StringFilter<"RecommendationLog"> | string;
    top1Correct?: Prisma.BoolFilter<"RecommendationLog"> | boolean;
    inTop3?: Prisma.BoolFilter<"RecommendationLog"> | boolean;
    inputLatencyMs?: Prisma.IntFilter<"RecommendationLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"RecommendationLog"> | Date | string;
}, "id">;
export type RecommendationLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    modelVariant?: Prisma.SortOrder;
    top1Correct?: Prisma.SortOrder;
    inTop3?: Prisma.SortOrder;
    inputLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RecommendationLogCountOrderByAggregateInput;
    _avg?: Prisma.RecommendationLogAvgOrderByAggregateInput;
    _max?: Prisma.RecommendationLogMaxOrderByAggregateInput;
    _min?: Prisma.RecommendationLogMinOrderByAggregateInput;
    _sum?: Prisma.RecommendationLogSumOrderByAggregateInput;
};
export type RecommendationLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecommendationLogScalarWhereWithAggregatesInput | Prisma.RecommendationLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecommendationLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecommendationLogScalarWhereWithAggregatesInput | Prisma.RecommendationLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecommendationLog"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RecommendationLog"> | string;
    modelVariant?: Prisma.StringWithAggregatesFilter<"RecommendationLog"> | string;
    top1Correct?: Prisma.BoolWithAggregatesFilter<"RecommendationLog"> | boolean;
    inTop3?: Prisma.BoolWithAggregatesFilter<"RecommendationLog"> | boolean;
    inputLatencyMs?: Prisma.IntWithAggregatesFilter<"RecommendationLog"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RecommendationLog"> | Date | string;
};
export type RecommendationLogCreateInput = {
    id?: string;
    userId: string;
    modelVariant?: string;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs: number;
    createdAt?: Date | string;
};
export type RecommendationLogUncheckedCreateInput = {
    id?: string;
    userId: string;
    modelVariant?: string;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs: number;
    createdAt?: Date | string;
};
export type RecommendationLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    modelVariant?: Prisma.StringFieldUpdateOperationsInput | string;
    top1Correct?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inTop3?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inputLatencyMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    modelVariant?: Prisma.StringFieldUpdateOperationsInput | string;
    top1Correct?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inTop3?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inputLatencyMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationLogCreateManyInput = {
    id?: string;
    userId: string;
    modelVariant?: string;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs: number;
    createdAt?: Date | string;
};
export type RecommendationLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    modelVariant?: Prisma.StringFieldUpdateOperationsInput | string;
    top1Correct?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inTop3?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inputLatencyMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    modelVariant?: Prisma.StringFieldUpdateOperationsInput | string;
    top1Correct?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inTop3?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    inputLatencyMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    modelVariant?: Prisma.SortOrder;
    top1Correct?: Prisma.SortOrder;
    inTop3?: Prisma.SortOrder;
    inputLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RecommendationLogAvgOrderByAggregateInput = {
    inputLatencyMs?: Prisma.SortOrder;
};
export type RecommendationLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    modelVariant?: Prisma.SortOrder;
    top1Correct?: Prisma.SortOrder;
    inTop3?: Prisma.SortOrder;
    inputLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RecommendationLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    modelVariant?: Prisma.SortOrder;
    top1Correct?: Prisma.SortOrder;
    inTop3?: Prisma.SortOrder;
    inputLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RecommendationLogSumOrderByAggregateInput = {
    inputLatencyMs?: Prisma.SortOrder;
};
export type RecommendationLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    modelVariant?: boolean;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["recommendationLog"]>;
export type RecommendationLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    modelVariant?: boolean;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["recommendationLog"]>;
export type RecommendationLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    modelVariant?: boolean;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["recommendationLog"]>;
export type RecommendationLogSelectScalar = {
    id?: boolean;
    userId?: boolean;
    modelVariant?: boolean;
    top1Correct?: boolean;
    inTop3?: boolean;
    inputLatencyMs?: boolean;
    createdAt?: boolean;
};
export type RecommendationLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "modelVariant" | "top1Correct" | "inTop3" | "inputLatencyMs" | "createdAt", ExtArgs["result"]["recommendationLog"]>;
export type $RecommendationLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecommendationLog";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        modelVariant: string;
        top1Correct: boolean;
        inTop3: boolean;
        inputLatencyMs: number;
        createdAt: Date;
    }, ExtArgs["result"]["recommendationLog"]>;
    composites: {};
};
export type RecommendationLogGetPayload<S extends boolean | null | undefined | RecommendationLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload, S>;
export type RecommendationLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecommendationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecommendationLogCountAggregateInputType | true;
};
export interface RecommendationLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecommendationLog'];
        meta: {
            name: 'RecommendationLog';
        };
    };
    findUnique<T extends RecommendationLogFindUniqueArgs>(args: Prisma.SelectSubset<T, RecommendationLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecommendationLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecommendationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecommendationLogFindFirstArgs>(args?: Prisma.SelectSubset<T, RecommendationLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecommendationLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecommendationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecommendationLogFindManyArgs>(args?: Prisma.SelectSubset<T, RecommendationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecommendationLogCreateArgs>(args: Prisma.SelectSubset<T, RecommendationLogCreateArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecommendationLogCreateManyArgs>(args?: Prisma.SelectSubset<T, RecommendationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecommendationLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecommendationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecommendationLogDeleteArgs>(args: Prisma.SelectSubset<T, RecommendationLogDeleteArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecommendationLogUpdateArgs>(args: Prisma.SelectSubset<T, RecommendationLogUpdateArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecommendationLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecommendationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecommendationLogUpdateManyArgs>(args: Prisma.SelectSubset<T, RecommendationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecommendationLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecommendationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecommendationLogUpsertArgs>(args: Prisma.SelectSubset<T, RecommendationLogUpsertArgs<ExtArgs>>): Prisma.Prisma__RecommendationLogClient<runtime.Types.Result.GetResult<Prisma.$RecommendationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecommendationLogCountArgs>(args?: Prisma.Subset<T, RecommendationLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecommendationLogCountAggregateOutputType> : number>;
    aggregate<T extends RecommendationLogAggregateArgs>(args: Prisma.Subset<T, RecommendationLogAggregateArgs>): Prisma.PrismaPromise<GetRecommendationLogAggregateType<T>>;
    groupBy<T extends RecommendationLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecommendationLogGroupByArgs['orderBy'];
    } : {
        orderBy?: RecommendationLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecommendationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecommendationLogFieldRefs;
}
export interface Prisma__RecommendationLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecommendationLogFieldRefs {
    readonly id: Prisma.FieldRef<"RecommendationLog", 'String'>;
    readonly userId: Prisma.FieldRef<"RecommendationLog", 'String'>;
    readonly modelVariant: Prisma.FieldRef<"RecommendationLog", 'String'>;
    readonly top1Correct: Prisma.FieldRef<"RecommendationLog", 'Boolean'>;
    readonly inTop3: Prisma.FieldRef<"RecommendationLog", 'Boolean'>;
    readonly inputLatencyMs: Prisma.FieldRef<"RecommendationLog", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"RecommendationLog", 'DateTime'>;
}
export type RecommendationLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where: Prisma.RecommendationLogWhereUniqueInput;
};
export type RecommendationLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where: Prisma.RecommendationLogWhereUniqueInput;
};
export type RecommendationLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where?: Prisma.RecommendationLogWhereInput;
    orderBy?: Prisma.RecommendationLogOrderByWithRelationInput | Prisma.RecommendationLogOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationLogScalarFieldEnum | Prisma.RecommendationLogScalarFieldEnum[];
};
export type RecommendationLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where?: Prisma.RecommendationLogWhereInput;
    orderBy?: Prisma.RecommendationLogOrderByWithRelationInput | Prisma.RecommendationLogOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationLogScalarFieldEnum | Prisma.RecommendationLogScalarFieldEnum[];
};
export type RecommendationLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where?: Prisma.RecommendationLogWhereInput;
    orderBy?: Prisma.RecommendationLogOrderByWithRelationInput | Prisma.RecommendationLogOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationLogScalarFieldEnum | Prisma.RecommendationLogScalarFieldEnum[];
};
export type RecommendationLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationLogCreateInput, Prisma.RecommendationLogUncheckedCreateInput>;
};
export type RecommendationLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecommendationLogCreateManyInput | Prisma.RecommendationLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecommendationLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    data: Prisma.RecommendationLogCreateManyInput | Prisma.RecommendationLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecommendationLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationLogUpdateInput, Prisma.RecommendationLogUncheckedUpdateInput>;
    where: Prisma.RecommendationLogWhereUniqueInput;
};
export type RecommendationLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecommendationLogUpdateManyMutationInput, Prisma.RecommendationLogUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationLogWhereInput;
    limit?: number;
};
export type RecommendationLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationLogUpdateManyMutationInput, Prisma.RecommendationLogUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationLogWhereInput;
    limit?: number;
};
export type RecommendationLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where: Prisma.RecommendationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationLogCreateInput, Prisma.RecommendationLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecommendationLogUpdateInput, Prisma.RecommendationLogUncheckedUpdateInput>;
};
export type RecommendationLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
    where: Prisma.RecommendationLogWhereUniqueInput;
};
export type RecommendationLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationLogWhereInput;
    limit?: number;
};
export type RecommendationLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationLogSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationLogOmit<ExtArgs> | null;
};
//# sourceMappingURL=RecommendationLog.d.ts.map