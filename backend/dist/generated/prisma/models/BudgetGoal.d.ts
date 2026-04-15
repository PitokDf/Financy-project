import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type BudgetGoalModel = runtime.Types.Result.DefaultSelection<Prisma.$BudgetGoalPayload>;
export type AggregateBudgetGoal = {
    _count: BudgetGoalCountAggregateOutputType | null;
    _avg: BudgetGoalAvgAggregateOutputType | null;
    _sum: BudgetGoalSumAggregateOutputType | null;
    _min: BudgetGoalMinAggregateOutputType | null;
    _max: BudgetGoalMaxAggregateOutputType | null;
};
export type BudgetGoalAvgAggregateOutputType = {
    amount: number | null;
    alertThreshold: number | null;
};
export type BudgetGoalSumAggregateOutputType = {
    amount: number | null;
    alertThreshold: number | null;
};
export type BudgetGoalMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    amount: number | null;
    period: $Enums.BudgetPeriod | null;
    alertThreshold: number | null;
    alertSent80: boolean | null;
    alertSent100: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BudgetGoalMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    amount: number | null;
    period: $Enums.BudgetPeriod | null;
    alertThreshold: number | null;
    alertSent80: boolean | null;
    alertSent100: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BudgetGoalCountAggregateOutputType = {
    id: number;
    userId: number;
    categoryId: number;
    amount: number;
    period: number;
    alertThreshold: number;
    alertSent80: number;
    alertSent100: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BudgetGoalAvgAggregateInputType = {
    amount?: true;
    alertThreshold?: true;
};
export type BudgetGoalSumAggregateInputType = {
    amount?: true;
    alertThreshold?: true;
};
export type BudgetGoalMinAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    amount?: true;
    period?: true;
    alertThreshold?: true;
    alertSent80?: true;
    alertSent100?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BudgetGoalMaxAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    amount?: true;
    period?: true;
    alertThreshold?: true;
    alertSent80?: true;
    alertSent100?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BudgetGoalCountAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    amount?: true;
    period?: true;
    alertThreshold?: true;
    alertSent80?: true;
    alertSent100?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BudgetGoalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetGoalWhereInput;
    orderBy?: Prisma.BudgetGoalOrderByWithRelationInput | Prisma.BudgetGoalOrderByWithRelationInput[];
    cursor?: Prisma.BudgetGoalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BudgetGoalCountAggregateInputType;
    _avg?: BudgetGoalAvgAggregateInputType;
    _sum?: BudgetGoalSumAggregateInputType;
    _min?: BudgetGoalMinAggregateInputType;
    _max?: BudgetGoalMaxAggregateInputType;
};
export type GetBudgetGoalAggregateType<T extends BudgetGoalAggregateArgs> = {
    [P in keyof T & keyof AggregateBudgetGoal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBudgetGoal[P]> : Prisma.GetScalarType<T[P], AggregateBudgetGoal[P]>;
};
export type BudgetGoalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetGoalWhereInput;
    orderBy?: Prisma.BudgetGoalOrderByWithAggregationInput | Prisma.BudgetGoalOrderByWithAggregationInput[];
    by: Prisma.BudgetGoalScalarFieldEnum[] | Prisma.BudgetGoalScalarFieldEnum;
    having?: Prisma.BudgetGoalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BudgetGoalCountAggregateInputType | true;
    _avg?: BudgetGoalAvgAggregateInputType;
    _sum?: BudgetGoalSumAggregateInputType;
    _min?: BudgetGoalMinAggregateInputType;
    _max?: BudgetGoalMaxAggregateInputType;
};
export type BudgetGoalGroupByOutputType = {
    id: string;
    userId: string;
    categoryId: string;
    amount: number;
    period: $Enums.BudgetPeriod;
    alertThreshold: number;
    alertSent80: boolean;
    alertSent100: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: BudgetGoalCountAggregateOutputType | null;
    _avg: BudgetGoalAvgAggregateOutputType | null;
    _sum: BudgetGoalSumAggregateOutputType | null;
    _min: BudgetGoalMinAggregateOutputType | null;
    _max: BudgetGoalMaxAggregateOutputType | null;
};
export type GetBudgetGoalGroupByPayload<T extends BudgetGoalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BudgetGoalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BudgetGoalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BudgetGoalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BudgetGoalGroupByOutputType[P]>;
}>>;
export type BudgetGoalWhereInput = {
    AND?: Prisma.BudgetGoalWhereInput | Prisma.BudgetGoalWhereInput[];
    OR?: Prisma.BudgetGoalWhereInput[];
    NOT?: Prisma.BudgetGoalWhereInput | Prisma.BudgetGoalWhereInput[];
    id?: Prisma.StringFilter<"BudgetGoal"> | string;
    userId?: Prisma.StringFilter<"BudgetGoal"> | string;
    categoryId?: Prisma.StringFilter<"BudgetGoal"> | string;
    amount?: Prisma.IntFilter<"BudgetGoal"> | number;
    period?: Prisma.EnumBudgetPeriodFilter<"BudgetGoal"> | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFilter<"BudgetGoal"> | number;
    alertSent80?: Prisma.BoolFilter<"BudgetGoal"> | boolean;
    alertSent100?: Prisma.BoolFilter<"BudgetGoal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"BudgetGoal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BudgetGoal"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
};
export type BudgetGoalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
    alertSent80?: Prisma.SortOrder;
    alertSent100?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
};
export type BudgetGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_categoryId?: Prisma.BudgetGoalUserIdCategoryIdCompoundUniqueInput;
    AND?: Prisma.BudgetGoalWhereInput | Prisma.BudgetGoalWhereInput[];
    OR?: Prisma.BudgetGoalWhereInput[];
    NOT?: Prisma.BudgetGoalWhereInput | Prisma.BudgetGoalWhereInput[];
    userId?: Prisma.StringFilter<"BudgetGoal"> | string;
    categoryId?: Prisma.StringFilter<"BudgetGoal"> | string;
    amount?: Prisma.IntFilter<"BudgetGoal"> | number;
    period?: Prisma.EnumBudgetPeriodFilter<"BudgetGoal"> | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFilter<"BudgetGoal"> | number;
    alertSent80?: Prisma.BoolFilter<"BudgetGoal"> | boolean;
    alertSent100?: Prisma.BoolFilter<"BudgetGoal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"BudgetGoal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BudgetGoal"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
}, "id" | "userId_categoryId">;
export type BudgetGoalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
    alertSent80?: Prisma.SortOrder;
    alertSent100?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BudgetGoalCountOrderByAggregateInput;
    _avg?: Prisma.BudgetGoalAvgOrderByAggregateInput;
    _max?: Prisma.BudgetGoalMaxOrderByAggregateInput;
    _min?: Prisma.BudgetGoalMinOrderByAggregateInput;
    _sum?: Prisma.BudgetGoalSumOrderByAggregateInput;
};
export type BudgetGoalScalarWhereWithAggregatesInput = {
    AND?: Prisma.BudgetGoalScalarWhereWithAggregatesInput | Prisma.BudgetGoalScalarWhereWithAggregatesInput[];
    OR?: Prisma.BudgetGoalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BudgetGoalScalarWhereWithAggregatesInput | Prisma.BudgetGoalScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BudgetGoal"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"BudgetGoal"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"BudgetGoal"> | string;
    amount?: Prisma.IntWithAggregatesFilter<"BudgetGoal"> | number;
    period?: Prisma.EnumBudgetPeriodWithAggregatesFilter<"BudgetGoal"> | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntWithAggregatesFilter<"BudgetGoal"> | number;
    alertSent80?: Prisma.BoolWithAggregatesFilter<"BudgetGoal"> | boolean;
    alertSent100?: Prisma.BoolWithAggregatesFilter<"BudgetGoal"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BudgetGoal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BudgetGoal"> | Date | string;
};
export type BudgetGoalCreateInput = {
    id?: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBudgetGoalsInput;
    category: Prisma.CategoryCreateNestedOneWithoutBudgetGoalsInput;
};
export type BudgetGoalUncheckedCreateInput = {
    id?: string;
    userId: string;
    categoryId: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetGoalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBudgetGoalsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutBudgetGoalsNestedInput;
};
export type BudgetGoalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalCreateManyInput = {
    id?: string;
    userId: string;
    categoryId: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetGoalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalListRelationFilter = {
    every?: Prisma.BudgetGoalWhereInput;
    some?: Prisma.BudgetGoalWhereInput;
    none?: Prisma.BudgetGoalWhereInput;
};
export type BudgetGoalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BudgetGoalUserIdCategoryIdCompoundUniqueInput = {
    userId: string;
    categoryId: string;
};
export type BudgetGoalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
    alertSent80?: Prisma.SortOrder;
    alertSent100?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BudgetGoalAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
};
export type BudgetGoalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
    alertSent80?: Prisma.SortOrder;
    alertSent100?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BudgetGoalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
    alertSent80?: Prisma.SortOrder;
    alertSent100?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BudgetGoalSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    alertThreshold?: Prisma.SortOrder;
};
export type BudgetGoalCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutUserInput, Prisma.BudgetGoalUncheckedCreateWithoutUserInput> | Prisma.BudgetGoalCreateWithoutUserInput[] | Prisma.BudgetGoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutUserInput | Prisma.BudgetGoalCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BudgetGoalCreateManyUserInputEnvelope;
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
};
export type BudgetGoalUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutUserInput, Prisma.BudgetGoalUncheckedCreateWithoutUserInput> | Prisma.BudgetGoalCreateWithoutUserInput[] | Prisma.BudgetGoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutUserInput | Prisma.BudgetGoalCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BudgetGoalCreateManyUserInputEnvelope;
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
};
export type BudgetGoalUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutUserInput, Prisma.BudgetGoalUncheckedCreateWithoutUserInput> | Prisma.BudgetGoalCreateWithoutUserInput[] | Prisma.BudgetGoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutUserInput | Prisma.BudgetGoalCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BudgetGoalUpsertWithWhereUniqueWithoutUserInput | Prisma.BudgetGoalUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BudgetGoalCreateManyUserInputEnvelope;
    set?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    disconnect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    delete?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    update?: Prisma.BudgetGoalUpdateWithWhereUniqueWithoutUserInput | Prisma.BudgetGoalUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BudgetGoalUpdateManyWithWhereWithoutUserInput | Prisma.BudgetGoalUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BudgetGoalScalarWhereInput | Prisma.BudgetGoalScalarWhereInput[];
};
export type BudgetGoalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutUserInput, Prisma.BudgetGoalUncheckedCreateWithoutUserInput> | Prisma.BudgetGoalCreateWithoutUserInput[] | Prisma.BudgetGoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutUserInput | Prisma.BudgetGoalCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BudgetGoalUpsertWithWhereUniqueWithoutUserInput | Prisma.BudgetGoalUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BudgetGoalCreateManyUserInputEnvelope;
    set?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    disconnect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    delete?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    update?: Prisma.BudgetGoalUpdateWithWhereUniqueWithoutUserInput | Prisma.BudgetGoalUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BudgetGoalUpdateManyWithWhereWithoutUserInput | Prisma.BudgetGoalUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BudgetGoalScalarWhereInput | Prisma.BudgetGoalScalarWhereInput[];
};
export type BudgetGoalCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutCategoryInput, Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput> | Prisma.BudgetGoalCreateWithoutCategoryInput[] | Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput | Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.BudgetGoalCreateManyCategoryInputEnvelope;
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
};
export type BudgetGoalUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutCategoryInput, Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput> | Prisma.BudgetGoalCreateWithoutCategoryInput[] | Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput | Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.BudgetGoalCreateManyCategoryInputEnvelope;
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
};
export type BudgetGoalUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutCategoryInput, Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput> | Prisma.BudgetGoalCreateWithoutCategoryInput[] | Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput | Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.BudgetGoalUpsertWithWhereUniqueWithoutCategoryInput | Prisma.BudgetGoalUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.BudgetGoalCreateManyCategoryInputEnvelope;
    set?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    disconnect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    delete?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    update?: Prisma.BudgetGoalUpdateWithWhereUniqueWithoutCategoryInput | Prisma.BudgetGoalUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.BudgetGoalUpdateManyWithWhereWithoutCategoryInput | Prisma.BudgetGoalUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.BudgetGoalScalarWhereInput | Prisma.BudgetGoalScalarWhereInput[];
};
export type BudgetGoalUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BudgetGoalCreateWithoutCategoryInput, Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput> | Prisma.BudgetGoalCreateWithoutCategoryInput[] | Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput | Prisma.BudgetGoalCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.BudgetGoalUpsertWithWhereUniqueWithoutCategoryInput | Prisma.BudgetGoalUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.BudgetGoalCreateManyCategoryInputEnvelope;
    set?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    disconnect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    delete?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    connect?: Prisma.BudgetGoalWhereUniqueInput | Prisma.BudgetGoalWhereUniqueInput[];
    update?: Prisma.BudgetGoalUpdateWithWhereUniqueWithoutCategoryInput | Prisma.BudgetGoalUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.BudgetGoalUpdateManyWithWhereWithoutCategoryInput | Prisma.BudgetGoalUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.BudgetGoalScalarWhereInput | Prisma.BudgetGoalScalarWhereInput[];
};
export type EnumBudgetPeriodFieldUpdateOperationsInput = {
    set?: $Enums.BudgetPeriod;
};
export type BudgetGoalCreateWithoutUserInput = {
    id?: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutBudgetGoalsInput;
};
export type BudgetGoalUncheckedCreateWithoutUserInput = {
    id?: string;
    categoryId: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetGoalCreateOrConnectWithoutUserInput = {
    where: Prisma.BudgetGoalWhereUniqueInput;
    create: Prisma.XOR<Prisma.BudgetGoalCreateWithoutUserInput, Prisma.BudgetGoalUncheckedCreateWithoutUserInput>;
};
export type BudgetGoalCreateManyUserInputEnvelope = {
    data: Prisma.BudgetGoalCreateManyUserInput | Prisma.BudgetGoalCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BudgetGoalUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BudgetGoalWhereUniqueInput;
    update: Prisma.XOR<Prisma.BudgetGoalUpdateWithoutUserInput, Prisma.BudgetGoalUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BudgetGoalCreateWithoutUserInput, Prisma.BudgetGoalUncheckedCreateWithoutUserInput>;
};
export type BudgetGoalUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BudgetGoalWhereUniqueInput;
    data: Prisma.XOR<Prisma.BudgetGoalUpdateWithoutUserInput, Prisma.BudgetGoalUncheckedUpdateWithoutUserInput>;
};
export type BudgetGoalUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BudgetGoalScalarWhereInput;
    data: Prisma.XOR<Prisma.BudgetGoalUpdateManyMutationInput, Prisma.BudgetGoalUncheckedUpdateManyWithoutUserInput>;
};
export type BudgetGoalScalarWhereInput = {
    AND?: Prisma.BudgetGoalScalarWhereInput | Prisma.BudgetGoalScalarWhereInput[];
    OR?: Prisma.BudgetGoalScalarWhereInput[];
    NOT?: Prisma.BudgetGoalScalarWhereInput | Prisma.BudgetGoalScalarWhereInput[];
    id?: Prisma.StringFilter<"BudgetGoal"> | string;
    userId?: Prisma.StringFilter<"BudgetGoal"> | string;
    categoryId?: Prisma.StringFilter<"BudgetGoal"> | string;
    amount?: Prisma.IntFilter<"BudgetGoal"> | number;
    period?: Prisma.EnumBudgetPeriodFilter<"BudgetGoal"> | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFilter<"BudgetGoal"> | number;
    alertSent80?: Prisma.BoolFilter<"BudgetGoal"> | boolean;
    alertSent100?: Prisma.BoolFilter<"BudgetGoal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"BudgetGoal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BudgetGoal"> | Date | string;
};
export type BudgetGoalCreateWithoutCategoryInput = {
    id?: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBudgetGoalsInput;
};
export type BudgetGoalUncheckedCreateWithoutCategoryInput = {
    id?: string;
    userId: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetGoalCreateOrConnectWithoutCategoryInput = {
    where: Prisma.BudgetGoalWhereUniqueInput;
    create: Prisma.XOR<Prisma.BudgetGoalCreateWithoutCategoryInput, Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput>;
};
export type BudgetGoalCreateManyCategoryInputEnvelope = {
    data: Prisma.BudgetGoalCreateManyCategoryInput | Prisma.BudgetGoalCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type BudgetGoalUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.BudgetGoalWhereUniqueInput;
    update: Prisma.XOR<Prisma.BudgetGoalUpdateWithoutCategoryInput, Prisma.BudgetGoalUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.BudgetGoalCreateWithoutCategoryInput, Prisma.BudgetGoalUncheckedCreateWithoutCategoryInput>;
};
export type BudgetGoalUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.BudgetGoalWhereUniqueInput;
    data: Prisma.XOR<Prisma.BudgetGoalUpdateWithoutCategoryInput, Prisma.BudgetGoalUncheckedUpdateWithoutCategoryInput>;
};
export type BudgetGoalUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.BudgetGoalScalarWhereInput;
    data: Prisma.XOR<Prisma.BudgetGoalUpdateManyMutationInput, Prisma.BudgetGoalUncheckedUpdateManyWithoutCategoryInput>;
};
export type BudgetGoalCreateManyUserInput = {
    id?: string;
    categoryId: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetGoalUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutBudgetGoalsNestedInput;
};
export type BudgetGoalUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalCreateManyCategoryInput = {
    id?: string;
    userId: string;
    amount: number;
    period?: $Enums.BudgetPeriod;
    alertThreshold?: number;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetGoalUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBudgetGoalsNestedInput;
};
export type BudgetGoalUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    period?: Prisma.EnumBudgetPeriodFieldUpdateOperationsInput | $Enums.BudgetPeriod;
    alertThreshold?: Prisma.IntFieldUpdateOperationsInput | number;
    alertSent80?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alertSent100?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetGoalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    amount?: boolean;
    period?: boolean;
    alertThreshold?: boolean;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgetGoal"]>;
export type BudgetGoalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    amount?: boolean;
    period?: boolean;
    alertThreshold?: boolean;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgetGoal"]>;
export type BudgetGoalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    amount?: boolean;
    period?: boolean;
    alertThreshold?: boolean;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgetGoal"]>;
export type BudgetGoalSelectScalar = {
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    amount?: boolean;
    period?: boolean;
    alertThreshold?: boolean;
    alertSent80?: boolean;
    alertSent100?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BudgetGoalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "categoryId" | "amount" | "period" | "alertThreshold" | "alertSent80" | "alertSent100" | "createdAt" | "updatedAt", ExtArgs["result"]["budgetGoal"]>;
export type BudgetGoalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type BudgetGoalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type BudgetGoalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $BudgetGoalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BudgetGoal";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        categoryId: string;
        amount: number;
        period: $Enums.BudgetPeriod;
        alertThreshold: number;
        alertSent80: boolean;
        alertSent100: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["budgetGoal"]>;
    composites: {};
};
export type BudgetGoalGetPayload<S extends boolean | null | undefined | BudgetGoalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload, S>;
export type BudgetGoalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BudgetGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BudgetGoalCountAggregateInputType | true;
};
export interface BudgetGoalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BudgetGoal'];
        meta: {
            name: 'BudgetGoal';
        };
    };
    findUnique<T extends BudgetGoalFindUniqueArgs>(args: Prisma.SelectSubset<T, BudgetGoalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BudgetGoalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BudgetGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BudgetGoalFindFirstArgs>(args?: Prisma.SelectSubset<T, BudgetGoalFindFirstArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BudgetGoalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BudgetGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BudgetGoalFindManyArgs>(args?: Prisma.SelectSubset<T, BudgetGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BudgetGoalCreateArgs>(args: Prisma.SelectSubset<T, BudgetGoalCreateArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BudgetGoalCreateManyArgs>(args?: Prisma.SelectSubset<T, BudgetGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BudgetGoalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BudgetGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BudgetGoalDeleteArgs>(args: Prisma.SelectSubset<T, BudgetGoalDeleteArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BudgetGoalUpdateArgs>(args: Prisma.SelectSubset<T, BudgetGoalUpdateArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BudgetGoalDeleteManyArgs>(args?: Prisma.SelectSubset<T, BudgetGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BudgetGoalUpdateManyArgs>(args: Prisma.SelectSubset<T, BudgetGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BudgetGoalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BudgetGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BudgetGoalUpsertArgs>(args: Prisma.SelectSubset<T, BudgetGoalUpsertArgs<ExtArgs>>): Prisma.Prisma__BudgetGoalClient<runtime.Types.Result.GetResult<Prisma.$BudgetGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BudgetGoalCountArgs>(args?: Prisma.Subset<T, BudgetGoalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BudgetGoalCountAggregateOutputType> : number>;
    aggregate<T extends BudgetGoalAggregateArgs>(args: Prisma.Subset<T, BudgetGoalAggregateArgs>): Prisma.PrismaPromise<GetBudgetGoalAggregateType<T>>;
    groupBy<T extends BudgetGoalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BudgetGoalGroupByArgs['orderBy'];
    } : {
        orderBy?: BudgetGoalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BudgetGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BudgetGoalFieldRefs;
}
export interface Prisma__BudgetGoalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BudgetGoalFieldRefs {
    readonly id: Prisma.FieldRef<"BudgetGoal", 'String'>;
    readonly userId: Prisma.FieldRef<"BudgetGoal", 'String'>;
    readonly categoryId: Prisma.FieldRef<"BudgetGoal", 'String'>;
    readonly amount: Prisma.FieldRef<"BudgetGoal", 'Int'>;
    readonly period: Prisma.FieldRef<"BudgetGoal", 'BudgetPeriod'>;
    readonly alertThreshold: Prisma.FieldRef<"BudgetGoal", 'Int'>;
    readonly alertSent80: Prisma.FieldRef<"BudgetGoal", 'Boolean'>;
    readonly alertSent100: Prisma.FieldRef<"BudgetGoal", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"BudgetGoal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BudgetGoal", 'DateTime'>;
}
export type BudgetGoalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where: Prisma.BudgetGoalWhereUniqueInput;
};
export type BudgetGoalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where: Prisma.BudgetGoalWhereUniqueInput;
};
export type BudgetGoalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where?: Prisma.BudgetGoalWhereInput;
    orderBy?: Prisma.BudgetGoalOrderByWithRelationInput | Prisma.BudgetGoalOrderByWithRelationInput[];
    cursor?: Prisma.BudgetGoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetGoalScalarFieldEnum | Prisma.BudgetGoalScalarFieldEnum[];
};
export type BudgetGoalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where?: Prisma.BudgetGoalWhereInput;
    orderBy?: Prisma.BudgetGoalOrderByWithRelationInput | Prisma.BudgetGoalOrderByWithRelationInput[];
    cursor?: Prisma.BudgetGoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetGoalScalarFieldEnum | Prisma.BudgetGoalScalarFieldEnum[];
};
export type BudgetGoalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where?: Prisma.BudgetGoalWhereInput;
    orderBy?: Prisma.BudgetGoalOrderByWithRelationInput | Prisma.BudgetGoalOrderByWithRelationInput[];
    cursor?: Prisma.BudgetGoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetGoalScalarFieldEnum | Prisma.BudgetGoalScalarFieldEnum[];
};
export type BudgetGoalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BudgetGoalCreateInput, Prisma.BudgetGoalUncheckedCreateInput>;
};
export type BudgetGoalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BudgetGoalCreateManyInput | Prisma.BudgetGoalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BudgetGoalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    data: Prisma.BudgetGoalCreateManyInput | Prisma.BudgetGoalCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BudgetGoalIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BudgetGoalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BudgetGoalUpdateInput, Prisma.BudgetGoalUncheckedUpdateInput>;
    where: Prisma.BudgetGoalWhereUniqueInput;
};
export type BudgetGoalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BudgetGoalUpdateManyMutationInput, Prisma.BudgetGoalUncheckedUpdateManyInput>;
    where?: Prisma.BudgetGoalWhereInput;
    limit?: number;
};
export type BudgetGoalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BudgetGoalUpdateManyMutationInput, Prisma.BudgetGoalUncheckedUpdateManyInput>;
    where?: Prisma.BudgetGoalWhereInput;
    limit?: number;
    include?: Prisma.BudgetGoalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BudgetGoalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where: Prisma.BudgetGoalWhereUniqueInput;
    create: Prisma.XOR<Prisma.BudgetGoalCreateInput, Prisma.BudgetGoalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BudgetGoalUpdateInput, Prisma.BudgetGoalUncheckedUpdateInput>;
};
export type BudgetGoalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
    where: Prisma.BudgetGoalWhereUniqueInput;
};
export type BudgetGoalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetGoalWhereInput;
    limit?: number;
};
export type BudgetGoalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetGoalSelect<ExtArgs> | null;
    omit?: Prisma.BudgetGoalOmit<ExtArgs> | null;
    include?: Prisma.BudgetGoalInclude<ExtArgs> | null;
};
//# sourceMappingURL=BudgetGoal.d.ts.map