import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CsvImportModel = runtime.Types.Result.DefaultSelection<Prisma.$CsvImportPayload>;
export type AggregateCsvImport = {
    _count: CsvImportCountAggregateOutputType | null;
    _avg: CsvImportAvgAggregateOutputType | null;
    _sum: CsvImportSumAggregateOutputType | null;
    _min: CsvImportMinAggregateOutputType | null;
    _max: CsvImportMaxAggregateOutputType | null;
};
export type CsvImportAvgAggregateOutputType = {
    rowCount: number | null;
    successCount: number | null;
    errorCount: number | null;
};
export type CsvImportSumAggregateOutputType = {
    rowCount: number | null;
    successCount: number | null;
    errorCount: number | null;
};
export type CsvImportMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    filename: string | null;
    rowCount: number | null;
    successCount: number | null;
    errorCount: number | null;
    createdAt: Date | null;
};
export type CsvImportMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    filename: string | null;
    rowCount: number | null;
    successCount: number | null;
    errorCount: number | null;
    createdAt: Date | null;
};
export type CsvImportCountAggregateOutputType = {
    id: number;
    userId: number;
    filename: number;
    rowCount: number;
    successCount: number;
    errorCount: number;
    createdAt: number;
    _all: number;
};
export type CsvImportAvgAggregateInputType = {
    rowCount?: true;
    successCount?: true;
    errorCount?: true;
};
export type CsvImportSumAggregateInputType = {
    rowCount?: true;
    successCount?: true;
    errorCount?: true;
};
export type CsvImportMinAggregateInputType = {
    id?: true;
    userId?: true;
    filename?: true;
    rowCount?: true;
    successCount?: true;
    errorCount?: true;
    createdAt?: true;
};
export type CsvImportMaxAggregateInputType = {
    id?: true;
    userId?: true;
    filename?: true;
    rowCount?: true;
    successCount?: true;
    errorCount?: true;
    createdAt?: true;
};
export type CsvImportCountAggregateInputType = {
    id?: true;
    userId?: true;
    filename?: true;
    rowCount?: true;
    successCount?: true;
    errorCount?: true;
    createdAt?: true;
    _all?: true;
};
export type CsvImportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CsvImportWhereInput;
    orderBy?: Prisma.CsvImportOrderByWithRelationInput | Prisma.CsvImportOrderByWithRelationInput[];
    cursor?: Prisma.CsvImportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CsvImportCountAggregateInputType;
    _avg?: CsvImportAvgAggregateInputType;
    _sum?: CsvImportSumAggregateInputType;
    _min?: CsvImportMinAggregateInputType;
    _max?: CsvImportMaxAggregateInputType;
};
export type GetCsvImportAggregateType<T extends CsvImportAggregateArgs> = {
    [P in keyof T & keyof AggregateCsvImport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCsvImport[P]> : Prisma.GetScalarType<T[P], AggregateCsvImport[P]>;
};
export type CsvImportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CsvImportWhereInput;
    orderBy?: Prisma.CsvImportOrderByWithAggregationInput | Prisma.CsvImportOrderByWithAggregationInput[];
    by: Prisma.CsvImportScalarFieldEnum[] | Prisma.CsvImportScalarFieldEnum;
    having?: Prisma.CsvImportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CsvImportCountAggregateInputType | true;
    _avg?: CsvImportAvgAggregateInputType;
    _sum?: CsvImportSumAggregateInputType;
    _min?: CsvImportMinAggregateInputType;
    _max?: CsvImportMaxAggregateInputType;
};
export type CsvImportGroupByOutputType = {
    id: string;
    userId: string;
    filename: string;
    rowCount: number;
    successCount: number;
    errorCount: number;
    createdAt: Date;
    _count: CsvImportCountAggregateOutputType | null;
    _avg: CsvImportAvgAggregateOutputType | null;
    _sum: CsvImportSumAggregateOutputType | null;
    _min: CsvImportMinAggregateOutputType | null;
    _max: CsvImportMaxAggregateOutputType | null;
};
export type GetCsvImportGroupByPayload<T extends CsvImportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CsvImportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CsvImportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CsvImportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CsvImportGroupByOutputType[P]>;
}>>;
export type CsvImportWhereInput = {
    AND?: Prisma.CsvImportWhereInput | Prisma.CsvImportWhereInput[];
    OR?: Prisma.CsvImportWhereInput[];
    NOT?: Prisma.CsvImportWhereInput | Prisma.CsvImportWhereInput[];
    id?: Prisma.StringFilter<"CsvImport"> | string;
    userId?: Prisma.StringFilter<"CsvImport"> | string;
    filename?: Prisma.StringFilter<"CsvImport"> | string;
    rowCount?: Prisma.IntFilter<"CsvImport"> | number;
    successCount?: Prisma.IntFilter<"CsvImport"> | number;
    errorCount?: Prisma.IntFilter<"CsvImport"> | number;
    createdAt?: Prisma.DateTimeFilter<"CsvImport"> | Date | string;
};
export type CsvImportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CsvImportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CsvImportWhereInput | Prisma.CsvImportWhereInput[];
    OR?: Prisma.CsvImportWhereInput[];
    NOT?: Prisma.CsvImportWhereInput | Prisma.CsvImportWhereInput[];
    userId?: Prisma.StringFilter<"CsvImport"> | string;
    filename?: Prisma.StringFilter<"CsvImport"> | string;
    rowCount?: Prisma.IntFilter<"CsvImport"> | number;
    successCount?: Prisma.IntFilter<"CsvImport"> | number;
    errorCount?: Prisma.IntFilter<"CsvImport"> | number;
    createdAt?: Prisma.DateTimeFilter<"CsvImport"> | Date | string;
}, "id">;
export type CsvImportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CsvImportCountOrderByAggregateInput;
    _avg?: Prisma.CsvImportAvgOrderByAggregateInput;
    _max?: Prisma.CsvImportMaxOrderByAggregateInput;
    _min?: Prisma.CsvImportMinOrderByAggregateInput;
    _sum?: Prisma.CsvImportSumOrderByAggregateInput;
};
export type CsvImportScalarWhereWithAggregatesInput = {
    AND?: Prisma.CsvImportScalarWhereWithAggregatesInput | Prisma.CsvImportScalarWhereWithAggregatesInput[];
    OR?: Prisma.CsvImportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CsvImportScalarWhereWithAggregatesInput | Prisma.CsvImportScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CsvImport"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"CsvImport"> | string;
    filename?: Prisma.StringWithAggregatesFilter<"CsvImport"> | string;
    rowCount?: Prisma.IntWithAggregatesFilter<"CsvImport"> | number;
    successCount?: Prisma.IntWithAggregatesFilter<"CsvImport"> | number;
    errorCount?: Prisma.IntWithAggregatesFilter<"CsvImport"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CsvImport"> | Date | string;
};
export type CsvImportCreateInput = {
    id?: string;
    userId: string;
    filename: string;
    rowCount: number;
    successCount?: number;
    errorCount?: number;
    createdAt?: Date | string;
};
export type CsvImportUncheckedCreateInput = {
    id?: string;
    userId: string;
    filename: string;
    rowCount: number;
    successCount?: number;
    errorCount?: number;
    createdAt?: Date | string;
};
export type CsvImportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    rowCount?: Prisma.IntFieldUpdateOperationsInput | number;
    successCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CsvImportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    rowCount?: Prisma.IntFieldUpdateOperationsInput | number;
    successCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CsvImportCreateManyInput = {
    id?: string;
    userId: string;
    filename: string;
    rowCount: number;
    successCount?: number;
    errorCount?: number;
    createdAt?: Date | string;
};
export type CsvImportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    rowCount?: Prisma.IntFieldUpdateOperationsInput | number;
    successCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CsvImportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    rowCount?: Prisma.IntFieldUpdateOperationsInput | number;
    successCount?: Prisma.IntFieldUpdateOperationsInput | number;
    errorCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CsvImportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CsvImportAvgOrderByAggregateInput = {
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
};
export type CsvImportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CsvImportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CsvImportSumOrderByAggregateInput = {
    rowCount?: Prisma.SortOrder;
    successCount?: Prisma.SortOrder;
    errorCount?: Prisma.SortOrder;
};
export type CsvImportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    filename?: boolean;
    rowCount?: boolean;
    successCount?: boolean;
    errorCount?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["csvImport"]>;
export type CsvImportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    filename?: boolean;
    rowCount?: boolean;
    successCount?: boolean;
    errorCount?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["csvImport"]>;
export type CsvImportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    filename?: boolean;
    rowCount?: boolean;
    successCount?: boolean;
    errorCount?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["csvImport"]>;
export type CsvImportSelectScalar = {
    id?: boolean;
    userId?: boolean;
    filename?: boolean;
    rowCount?: boolean;
    successCount?: boolean;
    errorCount?: boolean;
    createdAt?: boolean;
};
export type CsvImportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "filename" | "rowCount" | "successCount" | "errorCount" | "createdAt", ExtArgs["result"]["csvImport"]>;
export type $CsvImportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CsvImport";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        filename: string;
        rowCount: number;
        successCount: number;
        errorCount: number;
        createdAt: Date;
    }, ExtArgs["result"]["csvImport"]>;
    composites: {};
};
export type CsvImportGetPayload<S extends boolean | null | undefined | CsvImportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CsvImportPayload, S>;
export type CsvImportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CsvImportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CsvImportCountAggregateInputType | true;
};
export interface CsvImportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CsvImport'];
        meta: {
            name: 'CsvImport';
        };
    };
    findUnique<T extends CsvImportFindUniqueArgs>(args: Prisma.SelectSubset<T, CsvImportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CsvImportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CsvImportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CsvImportFindFirstArgs>(args?: Prisma.SelectSubset<T, CsvImportFindFirstArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CsvImportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CsvImportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CsvImportFindManyArgs>(args?: Prisma.SelectSubset<T, CsvImportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CsvImportCreateArgs>(args: Prisma.SelectSubset<T, CsvImportCreateArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CsvImportCreateManyArgs>(args?: Prisma.SelectSubset<T, CsvImportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CsvImportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CsvImportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CsvImportDeleteArgs>(args: Prisma.SelectSubset<T, CsvImportDeleteArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CsvImportUpdateArgs>(args: Prisma.SelectSubset<T, CsvImportUpdateArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CsvImportDeleteManyArgs>(args?: Prisma.SelectSubset<T, CsvImportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CsvImportUpdateManyArgs>(args: Prisma.SelectSubset<T, CsvImportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CsvImportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CsvImportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CsvImportUpsertArgs>(args: Prisma.SelectSubset<T, CsvImportUpsertArgs<ExtArgs>>): Prisma.Prisma__CsvImportClient<runtime.Types.Result.GetResult<Prisma.$CsvImportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CsvImportCountArgs>(args?: Prisma.Subset<T, CsvImportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CsvImportCountAggregateOutputType> : number>;
    aggregate<T extends CsvImportAggregateArgs>(args: Prisma.Subset<T, CsvImportAggregateArgs>): Prisma.PrismaPromise<GetCsvImportAggregateType<T>>;
    groupBy<T extends CsvImportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CsvImportGroupByArgs['orderBy'];
    } : {
        orderBy?: CsvImportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CsvImportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCsvImportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CsvImportFieldRefs;
}
export interface Prisma__CsvImportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CsvImportFieldRefs {
    readonly id: Prisma.FieldRef<"CsvImport", 'String'>;
    readonly userId: Prisma.FieldRef<"CsvImport", 'String'>;
    readonly filename: Prisma.FieldRef<"CsvImport", 'String'>;
    readonly rowCount: Prisma.FieldRef<"CsvImport", 'Int'>;
    readonly successCount: Prisma.FieldRef<"CsvImport", 'Int'>;
    readonly errorCount: Prisma.FieldRef<"CsvImport", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"CsvImport", 'DateTime'>;
}
export type CsvImportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where: Prisma.CsvImportWhereUniqueInput;
};
export type CsvImportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where: Prisma.CsvImportWhereUniqueInput;
};
export type CsvImportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where?: Prisma.CsvImportWhereInput;
    orderBy?: Prisma.CsvImportOrderByWithRelationInput | Prisma.CsvImportOrderByWithRelationInput[];
    cursor?: Prisma.CsvImportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CsvImportScalarFieldEnum | Prisma.CsvImportScalarFieldEnum[];
};
export type CsvImportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where?: Prisma.CsvImportWhereInput;
    orderBy?: Prisma.CsvImportOrderByWithRelationInput | Prisma.CsvImportOrderByWithRelationInput[];
    cursor?: Prisma.CsvImportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CsvImportScalarFieldEnum | Prisma.CsvImportScalarFieldEnum[];
};
export type CsvImportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where?: Prisma.CsvImportWhereInput;
    orderBy?: Prisma.CsvImportOrderByWithRelationInput | Prisma.CsvImportOrderByWithRelationInput[];
    cursor?: Prisma.CsvImportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CsvImportScalarFieldEnum | Prisma.CsvImportScalarFieldEnum[];
};
export type CsvImportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CsvImportCreateInput, Prisma.CsvImportUncheckedCreateInput>;
};
export type CsvImportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CsvImportCreateManyInput | Prisma.CsvImportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CsvImportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    data: Prisma.CsvImportCreateManyInput | Prisma.CsvImportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CsvImportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CsvImportUpdateInput, Prisma.CsvImportUncheckedUpdateInput>;
    where: Prisma.CsvImportWhereUniqueInput;
};
export type CsvImportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CsvImportUpdateManyMutationInput, Prisma.CsvImportUncheckedUpdateManyInput>;
    where?: Prisma.CsvImportWhereInput;
    limit?: number;
};
export type CsvImportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CsvImportUpdateManyMutationInput, Prisma.CsvImportUncheckedUpdateManyInput>;
    where?: Prisma.CsvImportWhereInput;
    limit?: number;
};
export type CsvImportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where: Prisma.CsvImportWhereUniqueInput;
    create: Prisma.XOR<Prisma.CsvImportCreateInput, Prisma.CsvImportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CsvImportUpdateInput, Prisma.CsvImportUncheckedUpdateInput>;
};
export type CsvImportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
    where: Prisma.CsvImportWhereUniqueInput;
};
export type CsvImportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CsvImportWhereInput;
    limit?: number;
};
export type CsvImportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CsvImportSelect<ExtArgs> | null;
    omit?: Prisma.CsvImportOmit<ExtArgs> | null;
};
//# sourceMappingURL=CsvImport.d.ts.map