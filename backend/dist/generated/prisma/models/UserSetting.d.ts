import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type UserSettingModel = runtime.Types.Result.DefaultSelection<Prisma.$UserSettingPayload>;
export type AggregateUserSetting = {
    _count: UserSettingCountAggregateOutputType | null;
    _min: UserSettingMinAggregateOutputType | null;
    _max: UserSettingMaxAggregateOutputType | null;
};
export type UserSettingMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    pushNotifications: boolean | null;
    budgetAlerts: boolean | null;
    dailyReminder: boolean | null;
    reminderTime: string | null;
    currency: string | null;
    language: string | null;
    showGamification: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserSettingMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    pushNotifications: boolean | null;
    budgetAlerts: boolean | null;
    dailyReminder: boolean | null;
    reminderTime: string | null;
    currency: string | null;
    language: string | null;
    showGamification: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserSettingCountAggregateOutputType = {
    id: number;
    userId: number;
    pushNotifications: number;
    budgetAlerts: number;
    dailyReminder: number;
    reminderTime: number;
    currency: number;
    language: number;
    showGamification: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserSettingMinAggregateInputType = {
    id?: true;
    userId?: true;
    pushNotifications?: true;
    budgetAlerts?: true;
    dailyReminder?: true;
    reminderTime?: true;
    currency?: true;
    language?: true;
    showGamification?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserSettingMaxAggregateInputType = {
    id?: true;
    userId?: true;
    pushNotifications?: true;
    budgetAlerts?: true;
    dailyReminder?: true;
    reminderTime?: true;
    currency?: true;
    language?: true;
    showGamification?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserSettingCountAggregateInputType = {
    id?: true;
    userId?: true;
    pushNotifications?: true;
    budgetAlerts?: true;
    dailyReminder?: true;
    reminderTime?: true;
    currency?: true;
    language?: true;
    showGamification?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserSettingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSettingWhereInput;
    orderBy?: Prisma.UserSettingOrderByWithRelationInput | Prisma.UserSettingOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserSettingCountAggregateInputType;
    _min?: UserSettingMinAggregateInputType;
    _max?: UserSettingMaxAggregateInputType;
};
export type GetUserSettingAggregateType<T extends UserSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateUserSetting]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserSetting[P]> : Prisma.GetScalarType<T[P], AggregateUserSetting[P]>;
};
export type UserSettingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSettingWhereInput;
    orderBy?: Prisma.UserSettingOrderByWithAggregationInput | Prisma.UserSettingOrderByWithAggregationInput[];
    by: Prisma.UserSettingScalarFieldEnum[] | Prisma.UserSettingScalarFieldEnum;
    having?: Prisma.UserSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserSettingCountAggregateInputType | true;
    _min?: UserSettingMinAggregateInputType;
    _max?: UserSettingMaxAggregateInputType;
};
export type UserSettingGroupByOutputType = {
    id: string;
    userId: string;
    pushNotifications: boolean;
    budgetAlerts: boolean;
    dailyReminder: boolean;
    reminderTime: string;
    currency: string;
    language: string;
    showGamification: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: UserSettingCountAggregateOutputType | null;
    _min: UserSettingMinAggregateOutputType | null;
    _max: UserSettingMaxAggregateOutputType | null;
};
export type GetUserSettingGroupByPayload<T extends UserSettingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserSettingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserSettingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserSettingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserSettingGroupByOutputType[P]>;
}>>;
export type UserSettingWhereInput = {
    AND?: Prisma.UserSettingWhereInput | Prisma.UserSettingWhereInput[];
    OR?: Prisma.UserSettingWhereInput[];
    NOT?: Prisma.UserSettingWhereInput | Prisma.UserSettingWhereInput[];
    id?: Prisma.StringFilter<"UserSetting"> | string;
    userId?: Prisma.StringFilter<"UserSetting"> | string;
    pushNotifications?: Prisma.BoolFilter<"UserSetting"> | boolean;
    budgetAlerts?: Prisma.BoolFilter<"UserSetting"> | boolean;
    dailyReminder?: Prisma.BoolFilter<"UserSetting"> | boolean;
    reminderTime?: Prisma.StringFilter<"UserSetting"> | string;
    currency?: Prisma.StringFilter<"UserSetting"> | string;
    language?: Prisma.StringFilter<"UserSetting"> | string;
    showGamification?: Prisma.BoolFilter<"UserSetting"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"UserSetting"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserSetting"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserSettingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pushNotifications?: Prisma.SortOrder;
    budgetAlerts?: Prisma.SortOrder;
    dailyReminder?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    showGamification?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.UserSettingWhereInput | Prisma.UserSettingWhereInput[];
    OR?: Prisma.UserSettingWhereInput[];
    NOT?: Prisma.UserSettingWhereInput | Prisma.UserSettingWhereInput[];
    pushNotifications?: Prisma.BoolFilter<"UserSetting"> | boolean;
    budgetAlerts?: Prisma.BoolFilter<"UserSetting"> | boolean;
    dailyReminder?: Prisma.BoolFilter<"UserSetting"> | boolean;
    reminderTime?: Prisma.StringFilter<"UserSetting"> | string;
    currency?: Prisma.StringFilter<"UserSetting"> | string;
    language?: Prisma.StringFilter<"UserSetting"> | string;
    showGamification?: Prisma.BoolFilter<"UserSetting"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"UserSetting"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserSetting"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserSettingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pushNotifications?: Prisma.SortOrder;
    budgetAlerts?: Prisma.SortOrder;
    dailyReminder?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    showGamification?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserSettingCountOrderByAggregateInput;
    _max?: Prisma.UserSettingMaxOrderByAggregateInput;
    _min?: Prisma.UserSettingMinOrderByAggregateInput;
};
export type UserSettingScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserSettingScalarWhereWithAggregatesInput | Prisma.UserSettingScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserSettingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserSettingScalarWhereWithAggregatesInput | Prisma.UserSettingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserSetting"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserSetting"> | string;
    pushNotifications?: Prisma.BoolWithAggregatesFilter<"UserSetting"> | boolean;
    budgetAlerts?: Prisma.BoolWithAggregatesFilter<"UserSetting"> | boolean;
    dailyReminder?: Prisma.BoolWithAggregatesFilter<"UserSetting"> | boolean;
    reminderTime?: Prisma.StringWithAggregatesFilter<"UserSetting"> | string;
    currency?: Prisma.StringWithAggregatesFilter<"UserSetting"> | string;
    language?: Prisma.StringWithAggregatesFilter<"UserSetting"> | string;
    showGamification?: Prisma.BoolWithAggregatesFilter<"UserSetting"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserSetting"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserSetting"> | Date | string;
};
export type UserSettingCreateInput = {
    id?: string;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: string;
    currency?: string;
    language?: string;
    showGamification?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserSettingInput;
};
export type UserSettingUncheckedCreateInput = {
    id?: string;
    userId: string;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: string;
    currency?: string;
    language?: string;
    showGamification?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSettingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pushNotifications?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    budgetAlerts?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dailyReminder?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    showGamification?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserSettingNestedInput;
};
export type UserSettingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pushNotifications?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    budgetAlerts?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dailyReminder?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    showGamification?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingCreateManyInput = {
    id?: string;
    userId: string;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: string;
    currency?: string;
    language?: string;
    showGamification?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSettingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pushNotifications?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    budgetAlerts?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dailyReminder?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    showGamification?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    pushNotifications?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    budgetAlerts?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dailyReminder?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    showGamification?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingNullableScalarRelationFilter = {
    is?: Prisma.UserSettingWhereInput | null;
    isNot?: Prisma.UserSettingWhereInput | null;
};
export type UserSettingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pushNotifications?: Prisma.SortOrder;
    budgetAlerts?: Prisma.SortOrder;
    dailyReminder?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    showGamification?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSettingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pushNotifications?: Prisma.SortOrder;
    budgetAlerts?: Prisma.SortOrder;
    dailyReminder?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    showGamification?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSettingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    pushNotifications?: Prisma.SortOrder;
    budgetAlerts?: Prisma.SortOrder;
    dailyReminder?: Prisma.SortOrder;
    reminderTime?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    showGamification?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSettingCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserSettingCreateWithoutUserInput, Prisma.UserSettingUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserSettingWhereUniqueInput;
};
export type UserSettingUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserSettingCreateWithoutUserInput, Prisma.UserSettingUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserSettingWhereUniqueInput;
};
export type UserSettingUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSettingCreateWithoutUserInput, Prisma.UserSettingUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserSettingUpsertWithoutUserInput;
    disconnect?: Prisma.UserSettingWhereInput | boolean;
    delete?: Prisma.UserSettingWhereInput | boolean;
    connect?: Prisma.UserSettingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserSettingUpdateToOneWithWhereWithoutUserInput, Prisma.UserSettingUpdateWithoutUserInput>, Prisma.UserSettingUncheckedUpdateWithoutUserInput>;
};
export type UserSettingUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserSettingCreateWithoutUserInput, Prisma.UserSettingUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserSettingCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserSettingUpsertWithoutUserInput;
    disconnect?: Prisma.UserSettingWhereInput | boolean;
    delete?: Prisma.UserSettingWhereInput | boolean;
    connect?: Prisma.UserSettingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserSettingUpdateToOneWithWhereWithoutUserInput, Prisma.UserSettingUpdateWithoutUserInput>, Prisma.UserSettingUncheckedUpdateWithoutUserInput>;
};
export type UserSettingCreateWithoutUserInput = {
    id?: string;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: string;
    currency?: string;
    language?: string;
    showGamification?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSettingUncheckedCreateWithoutUserInput = {
    id?: string;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: string;
    currency?: string;
    language?: string;
    showGamification?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserSettingCreateOrConnectWithoutUserInput = {
    where: Prisma.UserSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSettingCreateWithoutUserInput, Prisma.UserSettingUncheckedCreateWithoutUserInput>;
};
export type UserSettingUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserSettingUpdateWithoutUserInput, Prisma.UserSettingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserSettingCreateWithoutUserInput, Prisma.UserSettingUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserSettingWhereInput;
};
export type UserSettingUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserSettingWhereInput;
    data: Prisma.XOR<Prisma.UserSettingUpdateWithoutUserInput, Prisma.UserSettingUncheckedUpdateWithoutUserInput>;
};
export type UserSettingUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pushNotifications?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    budgetAlerts?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dailyReminder?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    showGamification?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pushNotifications?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    budgetAlerts?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    dailyReminder?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTime?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    language?: Prisma.StringFieldUpdateOperationsInput | string;
    showGamification?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserSettingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: boolean;
    currency?: boolean;
    language?: boolean;
    showGamification?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSetting"]>;
export type UserSettingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: boolean;
    currency?: boolean;
    language?: boolean;
    showGamification?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSetting"]>;
export type UserSettingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: boolean;
    currency?: boolean;
    language?: boolean;
    showGamification?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userSetting"]>;
export type UserSettingSelectScalar = {
    id?: boolean;
    userId?: boolean;
    pushNotifications?: boolean;
    budgetAlerts?: boolean;
    dailyReminder?: boolean;
    reminderTime?: boolean;
    currency?: boolean;
    language?: boolean;
    showGamification?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserSettingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "pushNotifications" | "budgetAlerts" | "dailyReminder" | "reminderTime" | "currency" | "language" | "showGamification" | "createdAt" | "updatedAt", ExtArgs["result"]["userSetting"]>;
export type UserSettingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserSettingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserSettingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserSettingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserSetting";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        pushNotifications: boolean;
        budgetAlerts: boolean;
        dailyReminder: boolean;
        reminderTime: string;
        currency: string;
        language: string;
        showGamification: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userSetting"]>;
    composites: {};
};
export type UserSettingGetPayload<S extends boolean | null | undefined | UserSettingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserSettingPayload, S>;
export type UserSettingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserSettingCountAggregateInputType | true;
};
export interface UserSettingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserSetting'];
        meta: {
            name: 'UserSetting';
        };
    };
    findUnique<T extends UserSettingFindUniqueArgs>(args: Prisma.SelectSubset<T, UserSettingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserSettingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserSettingFindFirstArgs>(args?: Prisma.SelectSubset<T, UserSettingFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserSettingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserSettingFindManyArgs>(args?: Prisma.SelectSubset<T, UserSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserSettingCreateArgs>(args: Prisma.SelectSubset<T, UserSettingCreateArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserSettingCreateManyArgs>(args?: Prisma.SelectSubset<T, UserSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserSettingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserSettingDeleteArgs>(args: Prisma.SelectSubset<T, UserSettingDeleteArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserSettingUpdateArgs>(args: Prisma.SelectSubset<T, UserSettingUpdateArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserSettingDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserSettingUpdateManyArgs>(args: Prisma.SelectSubset<T, UserSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserSettingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserSettingUpsertArgs>(args: Prisma.SelectSubset<T, UserSettingUpsertArgs<ExtArgs>>): Prisma.Prisma__UserSettingClient<runtime.Types.Result.GetResult<Prisma.$UserSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserSettingCountArgs>(args?: Prisma.Subset<T, UserSettingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserSettingCountAggregateOutputType> : number>;
    aggregate<T extends UserSettingAggregateArgs>(args: Prisma.Subset<T, UserSettingAggregateArgs>): Prisma.PrismaPromise<GetUserSettingAggregateType<T>>;
    groupBy<T extends UserSettingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserSettingGroupByArgs['orderBy'];
    } : {
        orderBy?: UserSettingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserSettingFieldRefs;
}
export interface Prisma__UserSettingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserSettingFieldRefs {
    readonly id: Prisma.FieldRef<"UserSetting", 'String'>;
    readonly userId: Prisma.FieldRef<"UserSetting", 'String'>;
    readonly pushNotifications: Prisma.FieldRef<"UserSetting", 'Boolean'>;
    readonly budgetAlerts: Prisma.FieldRef<"UserSetting", 'Boolean'>;
    readonly dailyReminder: Prisma.FieldRef<"UserSetting", 'Boolean'>;
    readonly reminderTime: Prisma.FieldRef<"UserSetting", 'String'>;
    readonly currency: Prisma.FieldRef<"UserSetting", 'String'>;
    readonly language: Prisma.FieldRef<"UserSetting", 'String'>;
    readonly showGamification: Prisma.FieldRef<"UserSetting", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"UserSetting", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserSetting", 'DateTime'>;
}
export type UserSettingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where: Prisma.UserSettingWhereUniqueInput;
};
export type UserSettingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where: Prisma.UserSettingWhereUniqueInput;
};
export type UserSettingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where?: Prisma.UserSettingWhereInput;
    orderBy?: Prisma.UserSettingOrderByWithRelationInput | Prisma.UserSettingOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSettingScalarFieldEnum | Prisma.UserSettingScalarFieldEnum[];
};
export type UserSettingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where?: Prisma.UserSettingWhereInput;
    orderBy?: Prisma.UserSettingOrderByWithRelationInput | Prisma.UserSettingOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSettingScalarFieldEnum | Prisma.UserSettingScalarFieldEnum[];
};
export type UserSettingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where?: Prisma.UserSettingWhereInput;
    orderBy?: Prisma.UserSettingOrderByWithRelationInput | Prisma.UserSettingOrderByWithRelationInput[];
    cursor?: Prisma.UserSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserSettingScalarFieldEnum | Prisma.UserSettingScalarFieldEnum[];
};
export type UserSettingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSettingCreateInput, Prisma.UserSettingUncheckedCreateInput>;
};
export type UserSettingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserSettingCreateManyInput | Prisma.UserSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserSettingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    data: Prisma.UserSettingCreateManyInput | Prisma.UserSettingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserSettingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserSettingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSettingUpdateInput, Prisma.UserSettingUncheckedUpdateInput>;
    where: Prisma.UserSettingWhereUniqueInput;
};
export type UserSettingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserSettingUpdateManyMutationInput, Prisma.UserSettingUncheckedUpdateManyInput>;
    where?: Prisma.UserSettingWhereInput;
    limit?: number;
};
export type UserSettingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserSettingUpdateManyMutationInput, Prisma.UserSettingUncheckedUpdateManyInput>;
    where?: Prisma.UserSettingWhereInput;
    limit?: number;
    include?: Prisma.UserSettingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserSettingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where: Prisma.UserSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserSettingCreateInput, Prisma.UserSettingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserSettingUpdateInput, Prisma.UserSettingUncheckedUpdateInput>;
};
export type UserSettingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
    where: Prisma.UserSettingWhereUniqueInput;
};
export type UserSettingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserSettingWhereInput;
    limit?: number;
};
export type UserSettingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSettingSelect<ExtArgs> | null;
    omit?: Prisma.UserSettingOmit<ExtArgs> | null;
    include?: Prisma.UserSettingInclude<ExtArgs> | null;
};
//# sourceMappingURL=UserSetting.d.ts.map