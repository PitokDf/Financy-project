import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CategoryFeedbackEventModel = runtime.Types.Result.DefaultSelection<Prisma.$CategoryFeedbackEventPayload>;
export type AggregateCategoryFeedbackEvent = {
    _count: CategoryFeedbackEventCountAggregateOutputType | null;
    _min: CategoryFeedbackEventMinAggregateOutputType | null;
    _max: CategoryFeedbackEventMaxAggregateOutputType | null;
};
export type CategoryFeedbackEventMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    action: string | null;
    createdAt: Date | null;
};
export type CategoryFeedbackEventMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    action: string | null;
    createdAt: Date | null;
};
export type CategoryFeedbackEventCountAggregateOutputType = {
    id: number;
    userId: number;
    categoryId: number;
    action: number;
    createdAt: number;
    _all: number;
};
export type CategoryFeedbackEventMinAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    action?: true;
    createdAt?: true;
};
export type CategoryFeedbackEventMaxAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    action?: true;
    createdAt?: true;
};
export type CategoryFeedbackEventCountAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    action?: true;
    createdAt?: true;
    _all?: true;
};
export type CategoryFeedbackEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryFeedbackEventWhereInput;
    orderBy?: Prisma.CategoryFeedbackEventOrderByWithRelationInput | Prisma.CategoryFeedbackEventOrderByWithRelationInput[];
    cursor?: Prisma.CategoryFeedbackEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CategoryFeedbackEventCountAggregateInputType;
    _min?: CategoryFeedbackEventMinAggregateInputType;
    _max?: CategoryFeedbackEventMaxAggregateInputType;
};
export type GetCategoryFeedbackEventAggregateType<T extends CategoryFeedbackEventAggregateArgs> = {
    [P in keyof T & keyof AggregateCategoryFeedbackEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategoryFeedbackEvent[P]> : Prisma.GetScalarType<T[P], AggregateCategoryFeedbackEvent[P]>;
};
export type CategoryFeedbackEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryFeedbackEventWhereInput;
    orderBy?: Prisma.CategoryFeedbackEventOrderByWithAggregationInput | Prisma.CategoryFeedbackEventOrderByWithAggregationInput[];
    by: Prisma.CategoryFeedbackEventScalarFieldEnum[] | Prisma.CategoryFeedbackEventScalarFieldEnum;
    having?: Prisma.CategoryFeedbackEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryFeedbackEventCountAggregateInputType | true;
    _min?: CategoryFeedbackEventMinAggregateInputType;
    _max?: CategoryFeedbackEventMaxAggregateInputType;
};
export type CategoryFeedbackEventGroupByOutputType = {
    id: string;
    userId: string;
    categoryId: string;
    action: string;
    createdAt: Date;
    _count: CategoryFeedbackEventCountAggregateOutputType | null;
    _min: CategoryFeedbackEventMinAggregateOutputType | null;
    _max: CategoryFeedbackEventMaxAggregateOutputType | null;
};
export type GetCategoryFeedbackEventGroupByPayload<T extends CategoryFeedbackEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoryFeedbackEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoryFeedbackEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoryFeedbackEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoryFeedbackEventGroupByOutputType[P]>;
}>>;
export type CategoryFeedbackEventWhereInput = {
    AND?: Prisma.CategoryFeedbackEventWhereInput | Prisma.CategoryFeedbackEventWhereInput[];
    OR?: Prisma.CategoryFeedbackEventWhereInput[];
    NOT?: Prisma.CategoryFeedbackEventWhereInput | Prisma.CategoryFeedbackEventWhereInput[];
    id?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    userId?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    categoryId?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    action?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    createdAt?: Prisma.DateTimeFilter<"CategoryFeedbackEvent"> | Date | string;
};
export type CategoryFeedbackEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategoryFeedbackEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CategoryFeedbackEventWhereInput | Prisma.CategoryFeedbackEventWhereInput[];
    OR?: Prisma.CategoryFeedbackEventWhereInput[];
    NOT?: Prisma.CategoryFeedbackEventWhereInput | Prisma.CategoryFeedbackEventWhereInput[];
    userId?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    categoryId?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    action?: Prisma.StringFilter<"CategoryFeedbackEvent"> | string;
    createdAt?: Prisma.DateTimeFilter<"CategoryFeedbackEvent"> | Date | string;
}, "id">;
export type CategoryFeedbackEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CategoryFeedbackEventCountOrderByAggregateInput;
    _max?: Prisma.CategoryFeedbackEventMaxOrderByAggregateInput;
    _min?: Prisma.CategoryFeedbackEventMinOrderByAggregateInput;
};
export type CategoryFeedbackEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.CategoryFeedbackEventScalarWhereWithAggregatesInput | Prisma.CategoryFeedbackEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.CategoryFeedbackEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CategoryFeedbackEventScalarWhereWithAggregatesInput | Prisma.CategoryFeedbackEventScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CategoryFeedbackEvent"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"CategoryFeedbackEvent"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"CategoryFeedbackEvent"> | string;
    action?: Prisma.StringWithAggregatesFilter<"CategoryFeedbackEvent"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CategoryFeedbackEvent"> | Date | string;
};
export type CategoryFeedbackEventCreateInput = {
    id?: string;
    userId: string;
    categoryId: string;
    action: string;
    createdAt?: Date | string;
};
export type CategoryFeedbackEventUncheckedCreateInput = {
    id?: string;
    userId: string;
    categoryId: string;
    action: string;
    createdAt?: Date | string;
};
export type CategoryFeedbackEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryFeedbackEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryFeedbackEventCreateManyInput = {
    id?: string;
    userId: string;
    categoryId: string;
    action: string;
    createdAt?: Date | string;
};
export type CategoryFeedbackEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryFeedbackEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryFeedbackEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategoryFeedbackEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategoryFeedbackEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategoryFeedbackEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    action?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["categoryFeedbackEvent"]>;
export type CategoryFeedbackEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    action?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["categoryFeedbackEvent"]>;
export type CategoryFeedbackEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    action?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["categoryFeedbackEvent"]>;
export type CategoryFeedbackEventSelectScalar = {
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    action?: boolean;
    createdAt?: boolean;
};
export type CategoryFeedbackEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "categoryId" | "action" | "createdAt", ExtArgs["result"]["categoryFeedbackEvent"]>;
export type $CategoryFeedbackEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CategoryFeedbackEvent";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        categoryId: string;
        action: string;
        createdAt: Date;
    }, ExtArgs["result"]["categoryFeedbackEvent"]>;
    composites: {};
};
export type CategoryFeedbackEventGetPayload<S extends boolean | null | undefined | CategoryFeedbackEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload, S>;
export type CategoryFeedbackEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CategoryFeedbackEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoryFeedbackEventCountAggregateInputType | true;
};
export interface CategoryFeedbackEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CategoryFeedbackEvent'];
        meta: {
            name: 'CategoryFeedbackEvent';
        };
    };
    findUnique<T extends CategoryFeedbackEventFindUniqueArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CategoryFeedbackEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CategoryFeedbackEventFindFirstArgs>(args?: Prisma.SelectSubset<T, CategoryFeedbackEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CategoryFeedbackEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CategoryFeedbackEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CategoryFeedbackEventFindManyArgs>(args?: Prisma.SelectSubset<T, CategoryFeedbackEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CategoryFeedbackEventCreateArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventCreateArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CategoryFeedbackEventCreateManyArgs>(args?: Prisma.SelectSubset<T, CategoryFeedbackEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CategoryFeedbackEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CategoryFeedbackEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CategoryFeedbackEventDeleteArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventDeleteArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CategoryFeedbackEventUpdateArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventUpdateArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CategoryFeedbackEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, CategoryFeedbackEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CategoryFeedbackEventUpdateManyArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CategoryFeedbackEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CategoryFeedbackEventUpsertArgs>(args: Prisma.SelectSubset<T, CategoryFeedbackEventUpsertArgs<ExtArgs>>): Prisma.Prisma__CategoryFeedbackEventClient<runtime.Types.Result.GetResult<Prisma.$CategoryFeedbackEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CategoryFeedbackEventCountArgs>(args?: Prisma.Subset<T, CategoryFeedbackEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoryFeedbackEventCountAggregateOutputType> : number>;
    aggregate<T extends CategoryFeedbackEventAggregateArgs>(args: Prisma.Subset<T, CategoryFeedbackEventAggregateArgs>): Prisma.PrismaPromise<GetCategoryFeedbackEventAggregateType<T>>;
    groupBy<T extends CategoryFeedbackEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CategoryFeedbackEventGroupByArgs['orderBy'];
    } : {
        orderBy?: CategoryFeedbackEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CategoryFeedbackEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryFeedbackEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CategoryFeedbackEventFieldRefs;
}
export interface Prisma__CategoryFeedbackEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CategoryFeedbackEventFieldRefs {
    readonly id: Prisma.FieldRef<"CategoryFeedbackEvent", 'String'>;
    readonly userId: Prisma.FieldRef<"CategoryFeedbackEvent", 'String'>;
    readonly categoryId: Prisma.FieldRef<"CategoryFeedbackEvent", 'String'>;
    readonly action: Prisma.FieldRef<"CategoryFeedbackEvent", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CategoryFeedbackEvent", 'DateTime'>;
}
export type CategoryFeedbackEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where: Prisma.CategoryFeedbackEventWhereUniqueInput;
};
export type CategoryFeedbackEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where: Prisma.CategoryFeedbackEventWhereUniqueInput;
};
export type CategoryFeedbackEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where?: Prisma.CategoryFeedbackEventWhereInput;
    orderBy?: Prisma.CategoryFeedbackEventOrderByWithRelationInput | Prisma.CategoryFeedbackEventOrderByWithRelationInput[];
    cursor?: Prisma.CategoryFeedbackEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryFeedbackEventScalarFieldEnum | Prisma.CategoryFeedbackEventScalarFieldEnum[];
};
export type CategoryFeedbackEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where?: Prisma.CategoryFeedbackEventWhereInput;
    orderBy?: Prisma.CategoryFeedbackEventOrderByWithRelationInput | Prisma.CategoryFeedbackEventOrderByWithRelationInput[];
    cursor?: Prisma.CategoryFeedbackEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryFeedbackEventScalarFieldEnum | Prisma.CategoryFeedbackEventScalarFieldEnum[];
};
export type CategoryFeedbackEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where?: Prisma.CategoryFeedbackEventWhereInput;
    orderBy?: Prisma.CategoryFeedbackEventOrderByWithRelationInput | Prisma.CategoryFeedbackEventOrderByWithRelationInput[];
    cursor?: Prisma.CategoryFeedbackEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryFeedbackEventScalarFieldEnum | Prisma.CategoryFeedbackEventScalarFieldEnum[];
};
export type CategoryFeedbackEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryFeedbackEventCreateInput, Prisma.CategoryFeedbackEventUncheckedCreateInput>;
};
export type CategoryFeedbackEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CategoryFeedbackEventCreateManyInput | Prisma.CategoryFeedbackEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CategoryFeedbackEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    data: Prisma.CategoryFeedbackEventCreateManyInput | Prisma.CategoryFeedbackEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CategoryFeedbackEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryFeedbackEventUpdateInput, Prisma.CategoryFeedbackEventUncheckedUpdateInput>;
    where: Prisma.CategoryFeedbackEventWhereUniqueInput;
};
export type CategoryFeedbackEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CategoryFeedbackEventUpdateManyMutationInput, Prisma.CategoryFeedbackEventUncheckedUpdateManyInput>;
    where?: Prisma.CategoryFeedbackEventWhereInput;
    limit?: number;
};
export type CategoryFeedbackEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryFeedbackEventUpdateManyMutationInput, Prisma.CategoryFeedbackEventUncheckedUpdateManyInput>;
    where?: Prisma.CategoryFeedbackEventWhereInput;
    limit?: number;
};
export type CategoryFeedbackEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where: Prisma.CategoryFeedbackEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryFeedbackEventCreateInput, Prisma.CategoryFeedbackEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CategoryFeedbackEventUpdateInput, Prisma.CategoryFeedbackEventUncheckedUpdateInput>;
};
export type CategoryFeedbackEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
    where: Prisma.CategoryFeedbackEventWhereUniqueInput;
};
export type CategoryFeedbackEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryFeedbackEventWhereInput;
    limit?: number;
};
export type CategoryFeedbackEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryFeedbackEventSelect<ExtArgs> | null;
    omit?: Prisma.CategoryFeedbackEventOmit<ExtArgs> | null;
};
//# sourceMappingURL=CategoryFeedbackEvent.d.ts.map