import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ForecastCacheModel = runtime.Types.Result.DefaultSelection<Prisma.$ForecastCachePayload>;
export type AggregateForecastCache = {
    _count: ForecastCacheCountAggregateOutputType | null;
    _avg: ForecastCacheAvgAggregateOutputType | null;
    _sum: ForecastCacheSumAggregateOutputType | null;
    _min: ForecastCacheMinAggregateOutputType | null;
    _max: ForecastCacheMaxAggregateOutputType | null;
};
export type ForecastCacheAvgAggregateOutputType = {
    period: number | null;
};
export type ForecastCacheSumAggregateOutputType = {
    period: number | null;
};
export type ForecastCacheMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    method: string | null;
    period: number | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ForecastCacheMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    method: string | null;
    period: number | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ForecastCacheCountAggregateOutputType = {
    id: number;
    userId: number;
    categoryId: number;
    method: number;
    period: number;
    forecast: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ForecastCacheAvgAggregateInputType = {
    period?: true;
};
export type ForecastCacheSumAggregateInputType = {
    period?: true;
};
export type ForecastCacheMinAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    method?: true;
    period?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ForecastCacheMaxAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    method?: true;
    period?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ForecastCacheCountAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    method?: true;
    period?: true;
    forecast?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ForecastCacheAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForecastCacheWhereInput;
    orderBy?: Prisma.ForecastCacheOrderByWithRelationInput | Prisma.ForecastCacheOrderByWithRelationInput[];
    cursor?: Prisma.ForecastCacheWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ForecastCacheCountAggregateInputType;
    _avg?: ForecastCacheAvgAggregateInputType;
    _sum?: ForecastCacheSumAggregateInputType;
    _min?: ForecastCacheMinAggregateInputType;
    _max?: ForecastCacheMaxAggregateInputType;
};
export type GetForecastCacheAggregateType<T extends ForecastCacheAggregateArgs> = {
    [P in keyof T & keyof AggregateForecastCache]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateForecastCache[P]> : Prisma.GetScalarType<T[P], AggregateForecastCache[P]>;
};
export type ForecastCacheGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForecastCacheWhereInput;
    orderBy?: Prisma.ForecastCacheOrderByWithAggregationInput | Prisma.ForecastCacheOrderByWithAggregationInput[];
    by: Prisma.ForecastCacheScalarFieldEnum[] | Prisma.ForecastCacheScalarFieldEnum;
    having?: Prisma.ForecastCacheScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ForecastCacheCountAggregateInputType | true;
    _avg?: ForecastCacheAvgAggregateInputType;
    _sum?: ForecastCacheSumAggregateInputType;
    _min?: ForecastCacheMinAggregateInputType;
    _max?: ForecastCacheMaxAggregateInputType;
};
export type ForecastCacheGroupByOutputType = {
    id: string;
    userId: string;
    categoryId: string | null;
    method: string;
    period: number;
    forecast: runtime.JsonValue;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: ForecastCacheCountAggregateOutputType | null;
    _avg: ForecastCacheAvgAggregateOutputType | null;
    _sum: ForecastCacheSumAggregateOutputType | null;
    _min: ForecastCacheMinAggregateOutputType | null;
    _max: ForecastCacheMaxAggregateOutputType | null;
};
export type GetForecastCacheGroupByPayload<T extends ForecastCacheGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ForecastCacheGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ForecastCacheGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ForecastCacheGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ForecastCacheGroupByOutputType[P]>;
}>>;
export type ForecastCacheWhereInput = {
    AND?: Prisma.ForecastCacheWhereInput | Prisma.ForecastCacheWhereInput[];
    OR?: Prisma.ForecastCacheWhereInput[];
    NOT?: Prisma.ForecastCacheWhereInput | Prisma.ForecastCacheWhereInput[];
    id?: Prisma.StringFilter<"ForecastCache"> | string;
    userId?: Prisma.StringFilter<"ForecastCache"> | string;
    categoryId?: Prisma.StringNullableFilter<"ForecastCache"> | string | null;
    method?: Prisma.StringFilter<"ForecastCache"> | string;
    period?: Prisma.IntFilter<"ForecastCache"> | number;
    forecast?: Prisma.JsonFilter<"ForecastCache">;
    expiresAt?: Prisma.DateTimeFilter<"ForecastCache"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ForecastCache"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ForecastCache"> | Date | string;
};
export type ForecastCacheOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    method?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    forecast?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForecastCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_categoryId?: Prisma.ForecastCacheUserIdCategoryIdCompoundUniqueInput;
    AND?: Prisma.ForecastCacheWhereInput | Prisma.ForecastCacheWhereInput[];
    OR?: Prisma.ForecastCacheWhereInput[];
    NOT?: Prisma.ForecastCacheWhereInput | Prisma.ForecastCacheWhereInput[];
    userId?: Prisma.StringFilter<"ForecastCache"> | string;
    categoryId?: Prisma.StringNullableFilter<"ForecastCache"> | string | null;
    method?: Prisma.StringFilter<"ForecastCache"> | string;
    period?: Prisma.IntFilter<"ForecastCache"> | number;
    forecast?: Prisma.JsonFilter<"ForecastCache">;
    expiresAt?: Prisma.DateTimeFilter<"ForecastCache"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ForecastCache"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ForecastCache"> | Date | string;
}, "id" | "userId_categoryId">;
export type ForecastCacheOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    method?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    forecast?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ForecastCacheCountOrderByAggregateInput;
    _avg?: Prisma.ForecastCacheAvgOrderByAggregateInput;
    _max?: Prisma.ForecastCacheMaxOrderByAggregateInput;
    _min?: Prisma.ForecastCacheMinOrderByAggregateInput;
    _sum?: Prisma.ForecastCacheSumOrderByAggregateInput;
};
export type ForecastCacheScalarWhereWithAggregatesInput = {
    AND?: Prisma.ForecastCacheScalarWhereWithAggregatesInput | Prisma.ForecastCacheScalarWhereWithAggregatesInput[];
    OR?: Prisma.ForecastCacheScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ForecastCacheScalarWhereWithAggregatesInput | Prisma.ForecastCacheScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ForecastCache"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ForecastCache"> | string;
    categoryId?: Prisma.StringNullableWithAggregatesFilter<"ForecastCache"> | string | null;
    method?: Prisma.StringWithAggregatesFilter<"ForecastCache"> | string;
    period?: Prisma.IntWithAggregatesFilter<"ForecastCache"> | number;
    forecast?: Prisma.JsonWithAggregatesFilter<"ForecastCache">;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"ForecastCache"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ForecastCache"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ForecastCache"> | Date | string;
};
export type ForecastCacheCreateInput = {
    id?: string;
    userId: string;
    categoryId?: string | null;
    method?: string;
    period?: number;
    forecast: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForecastCacheUncheckedCreateInput = {
    id?: string;
    userId: string;
    categoryId?: string | null;
    method?: string;
    period?: number;
    forecast: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForecastCacheUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.IntFieldUpdateOperationsInput | number;
    forecast?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastCacheUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.IntFieldUpdateOperationsInput | number;
    forecast?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastCacheCreateManyInput = {
    id?: string;
    userId: string;
    categoryId?: string | null;
    method?: string;
    period?: number;
    forecast: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForecastCacheUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.IntFieldUpdateOperationsInput | number;
    forecast?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastCacheUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.IntFieldUpdateOperationsInput | number;
    forecast?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastCacheUserIdCategoryIdCompoundUniqueInput = {
    userId: string;
    categoryId: string;
};
export type ForecastCacheCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    forecast?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForecastCacheAvgOrderByAggregateInput = {
    period?: Prisma.SortOrder;
};
export type ForecastCacheMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForecastCacheMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForecastCacheSumOrderByAggregateInput = {
    period?: Prisma.SortOrder;
};
export type ForecastCacheSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    method?: boolean;
    period?: boolean;
    forecast?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["forecastCache"]>;
export type ForecastCacheSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    method?: boolean;
    period?: boolean;
    forecast?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["forecastCache"]>;
export type ForecastCacheSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    method?: boolean;
    period?: boolean;
    forecast?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["forecastCache"]>;
export type ForecastCacheSelectScalar = {
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    method?: boolean;
    period?: boolean;
    forecast?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ForecastCacheOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "categoryId" | "method" | "period" | "forecast" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["forecastCache"]>;
export type $ForecastCachePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ForecastCache";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        categoryId: string | null;
        method: string;
        period: number;
        forecast: runtime.JsonValue;
        expiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["forecastCache"]>;
    composites: {};
};
export type ForecastCacheGetPayload<S extends boolean | null | undefined | ForecastCacheDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload, S>;
export type ForecastCacheCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ForecastCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ForecastCacheCountAggregateInputType | true;
};
export interface ForecastCacheDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ForecastCache'];
        meta: {
            name: 'ForecastCache';
        };
    };
    findUnique<T extends ForecastCacheFindUniqueArgs>(args: Prisma.SelectSubset<T, ForecastCacheFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ForecastCacheFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ForecastCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ForecastCacheFindFirstArgs>(args?: Prisma.SelectSubset<T, ForecastCacheFindFirstArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ForecastCacheFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ForecastCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ForecastCacheFindManyArgs>(args?: Prisma.SelectSubset<T, ForecastCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ForecastCacheCreateArgs>(args: Prisma.SelectSubset<T, ForecastCacheCreateArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ForecastCacheCreateManyArgs>(args?: Prisma.SelectSubset<T, ForecastCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ForecastCacheCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ForecastCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ForecastCacheDeleteArgs>(args: Prisma.SelectSubset<T, ForecastCacheDeleteArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ForecastCacheUpdateArgs>(args: Prisma.SelectSubset<T, ForecastCacheUpdateArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ForecastCacheDeleteManyArgs>(args?: Prisma.SelectSubset<T, ForecastCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ForecastCacheUpdateManyArgs>(args: Prisma.SelectSubset<T, ForecastCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ForecastCacheUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ForecastCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ForecastCacheUpsertArgs>(args: Prisma.SelectSubset<T, ForecastCacheUpsertArgs<ExtArgs>>): Prisma.Prisma__ForecastCacheClient<runtime.Types.Result.GetResult<Prisma.$ForecastCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ForecastCacheCountArgs>(args?: Prisma.Subset<T, ForecastCacheCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ForecastCacheCountAggregateOutputType> : number>;
    aggregate<T extends ForecastCacheAggregateArgs>(args: Prisma.Subset<T, ForecastCacheAggregateArgs>): Prisma.PrismaPromise<GetForecastCacheAggregateType<T>>;
    groupBy<T extends ForecastCacheGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ForecastCacheGroupByArgs['orderBy'];
    } : {
        orderBy?: ForecastCacheGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ForecastCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForecastCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ForecastCacheFieldRefs;
}
export interface Prisma__ForecastCacheClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ForecastCacheFieldRefs {
    readonly id: Prisma.FieldRef<"ForecastCache", 'String'>;
    readonly userId: Prisma.FieldRef<"ForecastCache", 'String'>;
    readonly categoryId: Prisma.FieldRef<"ForecastCache", 'String'>;
    readonly method: Prisma.FieldRef<"ForecastCache", 'String'>;
    readonly period: Prisma.FieldRef<"ForecastCache", 'Int'>;
    readonly forecast: Prisma.FieldRef<"ForecastCache", 'Json'>;
    readonly expiresAt: Prisma.FieldRef<"ForecastCache", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ForecastCache", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ForecastCache", 'DateTime'>;
}
export type ForecastCacheFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where: Prisma.ForecastCacheWhereUniqueInput;
};
export type ForecastCacheFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where: Prisma.ForecastCacheWhereUniqueInput;
};
export type ForecastCacheFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where?: Prisma.ForecastCacheWhereInput;
    orderBy?: Prisma.ForecastCacheOrderByWithRelationInput | Prisma.ForecastCacheOrderByWithRelationInput[];
    cursor?: Prisma.ForecastCacheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForecastCacheScalarFieldEnum | Prisma.ForecastCacheScalarFieldEnum[];
};
export type ForecastCacheFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where?: Prisma.ForecastCacheWhereInput;
    orderBy?: Prisma.ForecastCacheOrderByWithRelationInput | Prisma.ForecastCacheOrderByWithRelationInput[];
    cursor?: Prisma.ForecastCacheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForecastCacheScalarFieldEnum | Prisma.ForecastCacheScalarFieldEnum[];
};
export type ForecastCacheFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where?: Prisma.ForecastCacheWhereInput;
    orderBy?: Prisma.ForecastCacheOrderByWithRelationInput | Prisma.ForecastCacheOrderByWithRelationInput[];
    cursor?: Prisma.ForecastCacheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForecastCacheScalarFieldEnum | Prisma.ForecastCacheScalarFieldEnum[];
};
export type ForecastCacheCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForecastCacheCreateInput, Prisma.ForecastCacheUncheckedCreateInput>;
};
export type ForecastCacheCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ForecastCacheCreateManyInput | Prisma.ForecastCacheCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ForecastCacheCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    data: Prisma.ForecastCacheCreateManyInput | Prisma.ForecastCacheCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ForecastCacheUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForecastCacheUpdateInput, Prisma.ForecastCacheUncheckedUpdateInput>;
    where: Prisma.ForecastCacheWhereUniqueInput;
};
export type ForecastCacheUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ForecastCacheUpdateManyMutationInput, Prisma.ForecastCacheUncheckedUpdateManyInput>;
    where?: Prisma.ForecastCacheWhereInput;
    limit?: number;
};
export type ForecastCacheUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForecastCacheUpdateManyMutationInput, Prisma.ForecastCacheUncheckedUpdateManyInput>;
    where?: Prisma.ForecastCacheWhereInput;
    limit?: number;
};
export type ForecastCacheUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where: Prisma.ForecastCacheWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForecastCacheCreateInput, Prisma.ForecastCacheUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ForecastCacheUpdateInput, Prisma.ForecastCacheUncheckedUpdateInput>;
};
export type ForecastCacheDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
    where: Prisma.ForecastCacheWhereUniqueInput;
};
export type ForecastCacheDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForecastCacheWhereInput;
    limit?: number;
};
export type ForecastCacheDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastCacheSelect<ExtArgs> | null;
    omit?: Prisma.ForecastCacheOmit<ExtArgs> | null;
};
//# sourceMappingURL=ForecastCache.d.ts.map