import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ReminderConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$ReminderConfigPayload>;
export type AggregateReminderConfig = {
    _count: ReminderConfigCountAggregateOutputType | null;
    _min: ReminderConfigMinAggregateOutputType | null;
    _max: ReminderConfigMaxAggregateOutputType | null;
};
export type ReminderConfigMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    isEnabled: boolean | null;
    reminderTime: string | null;
    lastReminderAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReminderConfigMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    isEnabled: boolean | null;
    reminderTime: string | null;
    lastReminderAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReminderConfigCountAggregateOutputType = {
    id: number;
    userId: number;
    isEnabled: number;
    reminderTime: number;
    reminderDays: number;
    lastReminderAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ReminderConfigMinAggregateInputType = {
    id?: true;
    userId?: true;
    isEnabled?: true;
    reminderTime?: true;
    lastReminderAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReminderConfigMaxAggregateInputType = {
    id?: true;
    userId?: true;
    isEnabled?: true;
    reminderTime?: true;
    lastReminderAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReminderConfigCountAggregateInputType = {
    id?: true;
    userId?: true;
    isEnabled?: true;
    reminderTime?: true;
    reminderDays?: true;
    lastReminderAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReminderConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderConfigWhereInput;
    orderBy?: Prisma.ReminderConfigOrderByWithRelationInput | Prisma.ReminderConfigOrderByWithRelationInput[];
    cursor?: Prisma.ReminderConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReminderConfigCountAggregateInputType;
    _min?: ReminderConfigMinAggregateInputType;
    _max?: ReminderConfigMaxAggregateInputType;
};
export type GetReminderConfigAggregateType<T extends ReminderConfigAggregateArgs> = {
    [P in keyof T & keyof AggregateReminderConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReminderConfig[P]> : Prisma.GetScalarType<T[P], AggregateReminderConfig[P]>;
};
export type ReminderConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderConfigWhereInput;
    orderBy?: Prisma.ReminderConfigOrderByWithAggregationInput | Prisma.ReminderConfigOrderByWithAggregationInput[];
    by: Prisma.ReminderConfigScalarFieldEnum[] | Prisma.ReminderConfigScalarFieldEnum;
    having?: Prisma.ReminderConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReminderConfigCountAggregateInputType | true;
    _min?: ReminderConfigMinAggregateInputType;
    _max?: ReminderConfigMaxAggregateInputType;
};
export type ReminderConfigGroupByOutputType = {
    id: string;
    userId: string;
    isEnabled: boolean;
    reminderTime: string;
    reminderDays: string[];
    lastReminderAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ReminderConfigCountAggregateOutputType | null;
    _min: ReminderConfigMinAggregateOutputType | null;
    _max: ReminderConfigMaxAggregateOutputType | null;
};
export type GetReminderConfigGroupByPayload<T extends ReminderConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReminderConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReminderConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReminderConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReminderConfigGroupByOutputType[P]>;
}>>;
export type ReminderConfigWhereInput = {
    AND?: Prisma.ReminderConfigWhereInput | Prisma.ReminderConfigWhereInput[];
    OR?: Prisma.ReminderConfigWhereInput[];
    NOT?: Prisma.ReminderConfigWhereInput | Prisma.ReminderConfigWhereInput[];
    id?: Prisma.StringFilter<"ReminderConfig"> | string;
    userId?: Prisma.StringFilter<"ReminderConfig"> | string;
    isEnabled?: Prisma.BoolFilter<"ReminderConfig"> | boolean;
    reminderTime?: Prisma.StringFilter<"ReminderConfig"> | string;
    reminderDays?: Prisma.StringNullableListFilter<"ReminderConfig">;
    lastReminderAt?: Prisma.DateTimeNullableFilter<"ReminderConfig"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ReminderConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReminderConfig"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ReminderConfigOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    reminderDays?: Prisma.SortOrder;
    lastReminderAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ReminderConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.ReminderConfigWhereInput | Prisma.ReminderConfigWhereInput[];
    OR?: Prisma.ReminderConfigWhereInput[];
    NOT?: Prisma.ReminderConfigWhereInput | Prisma.ReminderConfigWhereInput[];
    isEnabled?: Prisma.BoolFilter<"ReminderConfig"> | boolean;
    reminderTime?: Prisma.StringFilter<"ReminderConfig"> | string;
    reminderDays?: Prisma.StringNullableListFilter<"ReminderConfig">;
    lastReminderAt?: Prisma.DateTimeNullableFilter<"ReminderConfig"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ReminderConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReminderConfig"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type ReminderConfigOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    reminderDays?: Prisma.SortOrder;
    lastReminderAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReminderConfigCountOrderByAggregateInput;
    _max?: Prisma.ReminderConfigMaxOrderByAggregateInput;
    _min?: Prisma.ReminderConfigMinOrderByAggregateInput;
};
export type ReminderConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReminderConfigScalarWhereWithAggregatesInput | Prisma.ReminderConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReminderConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReminderConfigScalarWhereWithAggregatesInput | Prisma.ReminderConfigScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ReminderConfig"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ReminderConfig"> | string;
    isEnabled?: Prisma.BoolWithAggregatesFilter<"ReminderConfig"> | boolean;
    reminderTime?: Prisma.StringWithAggregatesFilter<"ReminderConfig"> | string;
    reminderDays?: Prisma.StringNullableListFilter<"ReminderConfig">;
    lastReminderAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ReminderConfig"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ReminderConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ReminderConfig"> | Date | string;
};
export type ReminderConfigCreateInput = {
    id?: string;
    isEnabled?: boolean;
    reminderTime?: string;
    reminderDays?: Prisma.ReminderConfigCreatereminderDaysInput | string[];
    lastReminderAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutReminderConfigInput;
};
export type ReminderConfigUncheckedCreateInput = {
    id?: string;
    userId: string;
    isEnabled?: boolean;
    reminderTime?: string;
    reminderDays?: Prisma.ReminderConfigCreatereminderDaysInput | string[];
    lastReminderAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReminderConfigUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    reminderDays?: Prisma.ReminderConfigUpdatereminderDaysInput | string[];
    lastReminderAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutReminderConfigNestedInput;
};
export type ReminderConfigUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    reminderDays?: Prisma.ReminderConfigUpdatereminderDaysInput | string[];
    lastReminderAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderConfigCreateManyInput = {
    id?: string;
    userId: string;
    isEnabled?: boolean;
    reminderTime?: string;
    reminderDays?: Prisma.ReminderConfigCreatereminderDaysInput | string[];
    lastReminderAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReminderConfigUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    reminderDays?: Prisma.ReminderConfigUpdatereminderDaysInput | string[];
    lastReminderAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderConfigUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    reminderDays?: Prisma.ReminderConfigUpdatereminderDaysInput | string[];
    lastReminderAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderConfigNullableScalarRelationFilter = {
    is?: Prisma.ReminderConfigWhereInput | null;
    isNot?: Prisma.ReminderConfigWhereInput | null;
};
export type ReminderConfigCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    reminderDays?: Prisma.SortOrder;
    lastReminderAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReminderConfigMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    lastReminderAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReminderConfigMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    lastReminderAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReminderConfigCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReminderConfigCreateWithoutUserInput, Prisma.ReminderConfigUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ReminderConfigCreateOrConnectWithoutUserInput;
    connect?: Prisma.ReminderConfigWhereUniqueInput;
};
export type ReminderConfigUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ReminderConfigCreateWithoutUserInput, Prisma.ReminderConfigUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ReminderConfigCreateOrConnectWithoutUserInput;
    connect?: Prisma.ReminderConfigWhereUniqueInput;
};
export type ReminderConfigUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReminderConfigCreateWithoutUserInput, Prisma.ReminderConfigUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ReminderConfigCreateOrConnectWithoutUserInput;
    upsert?: Prisma.ReminderConfigUpsertWithoutUserInput;
    disconnect?: Prisma.ReminderConfigWhereInput | boolean;
    delete?: Prisma.ReminderConfigWhereInput | boolean;
    connect?: Prisma.ReminderConfigWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReminderConfigUpdateToOneWithWhereWithoutUserInput, Prisma.ReminderConfigUpdateWithoutUserInput>, Prisma.ReminderConfigUncheckedUpdateWithoutUserInput>;
};
export type ReminderConfigUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReminderConfigCreateWithoutUserInput, Prisma.ReminderConfigUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ReminderConfigCreateOrConnectWithoutUserInput;
    upsert?: Prisma.ReminderConfigUpsertWithoutUserInput;
    disconnect?: Prisma.ReminderConfigWhereInput | boolean;
    delete?: Prisma.ReminderConfigWhereInput | boolean;
    connect?: Prisma.ReminderConfigWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReminderConfigUpdateToOneWithWhereWithoutUserInput, Prisma.ReminderConfigUpdateWithoutUserInput>, Prisma.ReminderConfigUncheckedUpdateWithoutUserInput>;
};
export type ReminderConfigCreatereminderDaysInput = {
    set: string[];
};
export type ReminderConfigUpdatereminderDaysInput = {
    set?: string[];
    push?: string | string[];
};
export type ReminderConfigCreateWithoutUserInput = {
    id?: string;
    isEnabled?: boolean;
    reminderTime?: string;
    reminderDays?: Prisma.ReminderConfigCreatereminderDaysInput | string[];
    lastReminderAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReminderConfigUncheckedCreateWithoutUserInput = {
    id?: string;
    isEnabled?: boolean;
    reminderTime?: string;
    reminderDays?: Prisma.ReminderConfigCreatereminderDaysInput | string[];
    lastReminderAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReminderConfigCreateOrConnectWithoutUserInput = {
    where: Prisma.ReminderConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReminderConfigCreateWithoutUserInput, Prisma.ReminderConfigUncheckedCreateWithoutUserInput>;
};
export type ReminderConfigUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.ReminderConfigUpdateWithoutUserInput, Prisma.ReminderConfigUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ReminderConfigCreateWithoutUserInput, Prisma.ReminderConfigUncheckedCreateWithoutUserInput>;
    where?: Prisma.ReminderConfigWhereInput;
};
export type ReminderConfigUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.ReminderConfigWhereInput;
    data: Prisma.XOR<Prisma.ReminderConfigUpdateWithoutUserInput, Prisma.ReminderConfigUncheckedUpdateWithoutUserInput>;
};
export type ReminderConfigUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    reminderDays?: Prisma.ReminderConfigUpdatereminderDaysInput | string[];
    lastReminderAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderConfigUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    reminderDays?: Prisma.ReminderConfigUpdatereminderDaysInput | string[];
    lastReminderAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    isEnabled?: boolean;
    reminderTime?: boolean;
    reminderDays?: boolean;
    lastReminderAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reminderConfig"]>;
export type ReminderConfigSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    isEnabled?: boolean;
    reminderTime?: boolean;
    reminderDays?: boolean;
    lastReminderAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reminderConfig"]>;
export type ReminderConfigSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    isEnabled?: boolean;
    reminderTime?: boolean;
    reminderDays?: boolean;
    lastReminderAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reminderConfig"]>;
export type ReminderConfigSelectScalar = {
    id?: boolean;
    userId?: boolean;
    isEnabled?: boolean;
    reminderTime?: boolean;
    reminderDays?: boolean;
    lastReminderAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ReminderConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "isEnabled" | "reminderTime" | "reminderDays" | "lastReminderAt" | "createdAt" | "updatedAt", ExtArgs["result"]["reminderConfig"]>;
export type ReminderConfigInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReminderConfigIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReminderConfigIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ReminderConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReminderConfig";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        isEnabled: boolean;
        reminderTime: string;
        reminderDays: string[];
        lastReminderAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["reminderConfig"]>;
    composites: {};
};
export type ReminderConfigGetPayload<S extends boolean | null | undefined | ReminderConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload, S>;
export type ReminderConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReminderConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReminderConfigCountAggregateInputType | true;
};
export interface ReminderConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReminderConfig'];
        meta: {
            name: 'ReminderConfig';
        };
    };
    findUnique<T extends ReminderConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, ReminderConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReminderConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReminderConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReminderConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, ReminderConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReminderConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReminderConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReminderConfigFindManyArgs>(args?: Prisma.SelectSubset<T, ReminderConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReminderConfigCreateArgs>(args: Prisma.SelectSubset<T, ReminderConfigCreateArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReminderConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, ReminderConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReminderConfigCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReminderConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReminderConfigDeleteArgs>(args: Prisma.SelectSubset<T, ReminderConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReminderConfigUpdateArgs>(args: Prisma.SelectSubset<T, ReminderConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReminderConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReminderConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReminderConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, ReminderConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReminderConfigUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReminderConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReminderConfigUpsertArgs>(args: Prisma.SelectSubset<T, ReminderConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__ReminderConfigClient<runtime.Types.Result.GetResult<Prisma.$ReminderConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReminderConfigCountArgs>(args?: Prisma.Subset<T, ReminderConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReminderConfigCountAggregateOutputType> : number>;
    aggregate<T extends ReminderConfigAggregateArgs>(args: Prisma.Subset<T, ReminderConfigAggregateArgs>): Prisma.PrismaPromise<GetReminderConfigAggregateType<T>>;
    groupBy<T extends ReminderConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReminderConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: ReminderConfigGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReminderConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReminderConfigFieldRefs;
}
export interface Prisma__ReminderConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReminderConfigFieldRefs {
    readonly id: Prisma.FieldRef<"ReminderConfig", 'String'>;
    readonly userId: Prisma.FieldRef<"ReminderConfig", 'String'>;
    readonly isEnabled: Prisma.FieldRef<"ReminderConfig", 'Boolean'>;
    readonly reminderTime: Prisma.FieldRef<"ReminderConfig", 'String'>;
    readonly reminderDays: Prisma.FieldRef<"ReminderConfig", 'String[]'>;
    readonly lastReminderAt: Prisma.FieldRef<"ReminderConfig", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ReminderConfig", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ReminderConfig", 'DateTime'>;
}
export type ReminderConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where: Prisma.ReminderConfigWhereUniqueInput;
};
export type ReminderConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where: Prisma.ReminderConfigWhereUniqueInput;
};
export type ReminderConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where?: Prisma.ReminderConfigWhereInput;
    orderBy?: Prisma.ReminderConfigOrderByWithRelationInput | Prisma.ReminderConfigOrderByWithRelationInput[];
    cursor?: Prisma.ReminderConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderConfigScalarFieldEnum | Prisma.ReminderConfigScalarFieldEnum[];
};
export type ReminderConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where?: Prisma.ReminderConfigWhereInput;
    orderBy?: Prisma.ReminderConfigOrderByWithRelationInput | Prisma.ReminderConfigOrderByWithRelationInput[];
    cursor?: Prisma.ReminderConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderConfigScalarFieldEnum | Prisma.ReminderConfigScalarFieldEnum[];
};
export type ReminderConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where?: Prisma.ReminderConfigWhereInput;
    orderBy?: Prisma.ReminderConfigOrderByWithRelationInput | Prisma.ReminderConfigOrderByWithRelationInput[];
    cursor?: Prisma.ReminderConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderConfigScalarFieldEnum | Prisma.ReminderConfigScalarFieldEnum[];
};
export type ReminderConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReminderConfigCreateInput, Prisma.ReminderConfigUncheckedCreateInput>;
};
export type ReminderConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReminderConfigCreateManyInput | Prisma.ReminderConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReminderConfigCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    data: Prisma.ReminderConfigCreateManyInput | Prisma.ReminderConfigCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReminderConfigIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReminderConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReminderConfigUpdateInput, Prisma.ReminderConfigUncheckedUpdateInput>;
    where: Prisma.ReminderConfigWhereUniqueInput;
};
export type ReminderConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReminderConfigUpdateManyMutationInput, Prisma.ReminderConfigUncheckedUpdateManyInput>;
    where?: Prisma.ReminderConfigWhereInput;
    limit?: number;
};
export type ReminderConfigUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReminderConfigUpdateManyMutationInput, Prisma.ReminderConfigUncheckedUpdateManyInput>;
    where?: Prisma.ReminderConfigWhereInput;
    limit?: number;
    include?: Prisma.ReminderConfigIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReminderConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where: Prisma.ReminderConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReminderConfigCreateInput, Prisma.ReminderConfigUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReminderConfigUpdateInput, Prisma.ReminderConfigUncheckedUpdateInput>;
};
export type ReminderConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
    where: Prisma.ReminderConfigWhereUniqueInput;
};
export type ReminderConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderConfigWhereInput;
    limit?: number;
};
export type ReminderConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderConfigSelect<ExtArgs> | null;
    omit?: Prisma.ReminderConfigOmit<ExtArgs> | null;
    include?: Prisma.ReminderConfigInclude<ExtArgs> | null;
};
//# sourceMappingURL=ReminderConfig.d.ts.map