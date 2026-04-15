import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ForecastModel = runtime.Types.Result.DefaultSelection<Prisma.$ForecastPayload>;
export type AggregateForecast = {
    _count: ForecastCountAggregateOutputType | null;
    _avg: ForecastAvgAggregateOutputType | null;
    _sum: ForecastSumAggregateOutputType | null;
    _min: ForecastMinAggregateOutputType | null;
    _max: ForecastMaxAggregateOutputType | null;
};
export type ForecastAvgAggregateOutputType = {
    targetMonth: number | null;
    targetYear: number | null;
    predictedAmount: runtime.Decimal | null;
};
export type ForecastSumAggregateOutputType = {
    targetMonth: number | null;
    targetYear: number | null;
    predictedAmount: runtime.Decimal | null;
};
export type ForecastMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    targetMonth: number | null;
    targetYear: number | null;
    predictedAmount: runtime.Decimal | null;
    createdAt: Date | null;
};
export type ForecastMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    categoryId: string | null;
    targetMonth: number | null;
    targetYear: number | null;
    predictedAmount: runtime.Decimal | null;
    createdAt: Date | null;
};
export type ForecastCountAggregateOutputType = {
    id: number;
    userId: number;
    categoryId: number;
    targetMonth: number;
    targetYear: number;
    predictedAmount: number;
    createdAt: number;
    _all: number;
};
export type ForecastAvgAggregateInputType = {
    targetMonth?: true;
    targetYear?: true;
    predictedAmount?: true;
};
export type ForecastSumAggregateInputType = {
    targetMonth?: true;
    targetYear?: true;
    predictedAmount?: true;
};
export type ForecastMinAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    targetMonth?: true;
    targetYear?: true;
    predictedAmount?: true;
    createdAt?: true;
};
export type ForecastMaxAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    targetMonth?: true;
    targetYear?: true;
    predictedAmount?: true;
    createdAt?: true;
};
export type ForecastCountAggregateInputType = {
    id?: true;
    userId?: true;
    categoryId?: true;
    targetMonth?: true;
    targetYear?: true;
    predictedAmount?: true;
    createdAt?: true;
    _all?: true;
};
export type ForecastAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForecastWhereInput;
    orderBy?: Prisma.ForecastOrderByWithRelationInput | Prisma.ForecastOrderByWithRelationInput[];
    cursor?: Prisma.ForecastWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ForecastCountAggregateInputType;
    _avg?: ForecastAvgAggregateInputType;
    _sum?: ForecastSumAggregateInputType;
    _min?: ForecastMinAggregateInputType;
    _max?: ForecastMaxAggregateInputType;
};
export type GetForecastAggregateType<T extends ForecastAggregateArgs> = {
    [P in keyof T & keyof AggregateForecast]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateForecast[P]> : Prisma.GetScalarType<T[P], AggregateForecast[P]>;
};
export type ForecastGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForecastWhereInput;
    orderBy?: Prisma.ForecastOrderByWithAggregationInput | Prisma.ForecastOrderByWithAggregationInput[];
    by: Prisma.ForecastScalarFieldEnum[] | Prisma.ForecastScalarFieldEnum;
    having?: Prisma.ForecastScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ForecastCountAggregateInputType | true;
    _avg?: ForecastAvgAggregateInputType;
    _sum?: ForecastSumAggregateInputType;
    _min?: ForecastMinAggregateInputType;
    _max?: ForecastMaxAggregateInputType;
};
export type ForecastGroupByOutputType = {
    id: string;
    userId: string;
    categoryId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal;
    createdAt: Date;
    _count: ForecastCountAggregateOutputType | null;
    _avg: ForecastAvgAggregateOutputType | null;
    _sum: ForecastSumAggregateOutputType | null;
    _min: ForecastMinAggregateOutputType | null;
    _max: ForecastMaxAggregateOutputType | null;
};
export type GetForecastGroupByPayload<T extends ForecastGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ForecastGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ForecastGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ForecastGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ForecastGroupByOutputType[P]>;
}>>;
export type ForecastWhereInput = {
    AND?: Prisma.ForecastWhereInput | Prisma.ForecastWhereInput[];
    OR?: Prisma.ForecastWhereInput[];
    NOT?: Prisma.ForecastWhereInput | Prisma.ForecastWhereInput[];
    id?: Prisma.StringFilter<"Forecast"> | string;
    userId?: Prisma.StringFilter<"Forecast"> | string;
    categoryId?: Prisma.StringFilter<"Forecast"> | string;
    targetMonth?: Prisma.IntFilter<"Forecast"> | number;
    targetYear?: Prisma.IntFilter<"Forecast"> | number;
    predictedAmount?: Prisma.DecimalFilter<"Forecast"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Forecast"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
};
export type ForecastOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
};
export type ForecastWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_categoryId_targetMonth_targetYear?: Prisma.ForecastUserIdCategoryIdTargetMonthTargetYearCompoundUniqueInput;
    AND?: Prisma.ForecastWhereInput | Prisma.ForecastWhereInput[];
    OR?: Prisma.ForecastWhereInput[];
    NOT?: Prisma.ForecastWhereInput | Prisma.ForecastWhereInput[];
    userId?: Prisma.StringFilter<"Forecast"> | string;
    categoryId?: Prisma.StringFilter<"Forecast"> | string;
    targetMonth?: Prisma.IntFilter<"Forecast"> | number;
    targetYear?: Prisma.IntFilter<"Forecast"> | number;
    predictedAmount?: Prisma.DecimalFilter<"Forecast"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Forecast"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
}, "id" | "userId_categoryId_targetMonth_targetYear">;
export type ForecastOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ForecastCountOrderByAggregateInput;
    _avg?: Prisma.ForecastAvgOrderByAggregateInput;
    _max?: Prisma.ForecastMaxOrderByAggregateInput;
    _min?: Prisma.ForecastMinOrderByAggregateInput;
    _sum?: Prisma.ForecastSumOrderByAggregateInput;
};
export type ForecastScalarWhereWithAggregatesInput = {
    AND?: Prisma.ForecastScalarWhereWithAggregatesInput | Prisma.ForecastScalarWhereWithAggregatesInput[];
    OR?: Prisma.ForecastScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ForecastScalarWhereWithAggregatesInput | Prisma.ForecastScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Forecast"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Forecast"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"Forecast"> | string;
    targetMonth?: Prisma.IntWithAggregatesFilter<"Forecast"> | number;
    targetYear?: Prisma.IntWithAggregatesFilter<"Forecast"> | number;
    predictedAmount?: Prisma.DecimalWithAggregatesFilter<"Forecast"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Forecast"> | Date | string;
};
export type ForecastCreateInput = {
    id?: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutForecastsInput;
    category: Prisma.CategoryCreateNestedOneWithoutForecastsInput;
};
export type ForecastUncheckedCreateInput = {
    id?: string;
    userId: string;
    categoryId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ForecastUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutForecastsNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutForecastsNestedInput;
};
export type ForecastUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastCreateManyInput = {
    id?: string;
    userId: string;
    categoryId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ForecastUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastListRelationFilter = {
    every?: Prisma.ForecastWhereInput;
    some?: Prisma.ForecastWhereInput;
    none?: Prisma.ForecastWhereInput;
};
export type ForecastOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ForecastUserIdCategoryIdTargetMonthTargetYearCompoundUniqueInput = {
    userId: string;
    categoryId: string;
    targetMonth: number;
    targetYear: number;
};
export type ForecastCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ForecastAvgOrderByAggregateInput = {
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
};
export type ForecastMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ForecastMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ForecastSumOrderByAggregateInput = {
    targetMonth?: Prisma.SortOrder;
    targetYear?: Prisma.SortOrder;
    predictedAmount?: Prisma.SortOrder;
};
export type ForecastCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutUserInput, Prisma.ForecastUncheckedCreateWithoutUserInput> | Prisma.ForecastCreateWithoutUserInput[] | Prisma.ForecastUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutUserInput | Prisma.ForecastCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ForecastCreateManyUserInputEnvelope;
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
};
export type ForecastUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutUserInput, Prisma.ForecastUncheckedCreateWithoutUserInput> | Prisma.ForecastCreateWithoutUserInput[] | Prisma.ForecastUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutUserInput | Prisma.ForecastCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ForecastCreateManyUserInputEnvelope;
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
};
export type ForecastUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutUserInput, Prisma.ForecastUncheckedCreateWithoutUserInput> | Prisma.ForecastCreateWithoutUserInput[] | Prisma.ForecastUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutUserInput | Prisma.ForecastCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ForecastUpsertWithWhereUniqueWithoutUserInput | Prisma.ForecastUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ForecastCreateManyUserInputEnvelope;
    set?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    disconnect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    delete?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    update?: Prisma.ForecastUpdateWithWhereUniqueWithoutUserInput | Prisma.ForecastUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ForecastUpdateManyWithWhereWithoutUserInput | Prisma.ForecastUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ForecastScalarWhereInput | Prisma.ForecastScalarWhereInput[];
};
export type ForecastUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutUserInput, Prisma.ForecastUncheckedCreateWithoutUserInput> | Prisma.ForecastCreateWithoutUserInput[] | Prisma.ForecastUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutUserInput | Prisma.ForecastCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ForecastUpsertWithWhereUniqueWithoutUserInput | Prisma.ForecastUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ForecastCreateManyUserInputEnvelope;
    set?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    disconnect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    delete?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    update?: Prisma.ForecastUpdateWithWhereUniqueWithoutUserInput | Prisma.ForecastUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ForecastUpdateManyWithWhereWithoutUserInput | Prisma.ForecastUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ForecastScalarWhereInput | Prisma.ForecastScalarWhereInput[];
};
export type ForecastCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutCategoryInput, Prisma.ForecastUncheckedCreateWithoutCategoryInput> | Prisma.ForecastCreateWithoutCategoryInput[] | Prisma.ForecastUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutCategoryInput | Prisma.ForecastCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ForecastCreateManyCategoryInputEnvelope;
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
};
export type ForecastUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutCategoryInput, Prisma.ForecastUncheckedCreateWithoutCategoryInput> | Prisma.ForecastCreateWithoutCategoryInput[] | Prisma.ForecastUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutCategoryInput | Prisma.ForecastCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ForecastCreateManyCategoryInputEnvelope;
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
};
export type ForecastUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutCategoryInput, Prisma.ForecastUncheckedCreateWithoutCategoryInput> | Prisma.ForecastCreateWithoutCategoryInput[] | Prisma.ForecastUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutCategoryInput | Prisma.ForecastCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ForecastUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ForecastUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ForecastCreateManyCategoryInputEnvelope;
    set?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    disconnect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    delete?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    update?: Prisma.ForecastUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ForecastUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ForecastUpdateManyWithWhereWithoutCategoryInput | Prisma.ForecastUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ForecastScalarWhereInput | Prisma.ForecastScalarWhereInput[];
};
export type ForecastUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ForecastCreateWithoutCategoryInput, Prisma.ForecastUncheckedCreateWithoutCategoryInput> | Prisma.ForecastCreateWithoutCategoryInput[] | Prisma.ForecastUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ForecastCreateOrConnectWithoutCategoryInput | Prisma.ForecastCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ForecastUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ForecastUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ForecastCreateManyCategoryInputEnvelope;
    set?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    disconnect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    delete?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    connect?: Prisma.ForecastWhereUniqueInput | Prisma.ForecastWhereUniqueInput[];
    update?: Prisma.ForecastUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ForecastUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ForecastUpdateManyWithWhereWithoutCategoryInput | Prisma.ForecastUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ForecastScalarWhereInput | Prisma.ForecastScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ForecastCreateWithoutUserInput = {
    id?: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutForecastsInput;
};
export type ForecastUncheckedCreateWithoutUserInput = {
    id?: string;
    categoryId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ForecastCreateOrConnectWithoutUserInput = {
    where: Prisma.ForecastWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForecastCreateWithoutUserInput, Prisma.ForecastUncheckedCreateWithoutUserInput>;
};
export type ForecastCreateManyUserInputEnvelope = {
    data: Prisma.ForecastCreateManyUserInput | Prisma.ForecastCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ForecastUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ForecastWhereUniqueInput;
    update: Prisma.XOR<Prisma.ForecastUpdateWithoutUserInput, Prisma.ForecastUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ForecastCreateWithoutUserInput, Prisma.ForecastUncheckedCreateWithoutUserInput>;
};
export type ForecastUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ForecastWhereUniqueInput;
    data: Prisma.XOR<Prisma.ForecastUpdateWithoutUserInput, Prisma.ForecastUncheckedUpdateWithoutUserInput>;
};
export type ForecastUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ForecastScalarWhereInput;
    data: Prisma.XOR<Prisma.ForecastUpdateManyMutationInput, Prisma.ForecastUncheckedUpdateManyWithoutUserInput>;
};
export type ForecastScalarWhereInput = {
    AND?: Prisma.ForecastScalarWhereInput | Prisma.ForecastScalarWhereInput[];
    OR?: Prisma.ForecastScalarWhereInput[];
    NOT?: Prisma.ForecastScalarWhereInput | Prisma.ForecastScalarWhereInput[];
    id?: Prisma.StringFilter<"Forecast"> | string;
    userId?: Prisma.StringFilter<"Forecast"> | string;
    categoryId?: Prisma.StringFilter<"Forecast"> | string;
    targetMonth?: Prisma.IntFilter<"Forecast"> | number;
    targetYear?: Prisma.IntFilter<"Forecast"> | number;
    predictedAmount?: Prisma.DecimalFilter<"Forecast"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Forecast"> | Date | string;
};
export type ForecastCreateWithoutCategoryInput = {
    id?: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutForecastsInput;
};
export type ForecastUncheckedCreateWithoutCategoryInput = {
    id?: string;
    userId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ForecastCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ForecastWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForecastCreateWithoutCategoryInput, Prisma.ForecastUncheckedCreateWithoutCategoryInput>;
};
export type ForecastCreateManyCategoryInputEnvelope = {
    data: Prisma.ForecastCreateManyCategoryInput | Prisma.ForecastCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ForecastUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ForecastWhereUniqueInput;
    update: Prisma.XOR<Prisma.ForecastUpdateWithoutCategoryInput, Prisma.ForecastUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ForecastCreateWithoutCategoryInput, Prisma.ForecastUncheckedCreateWithoutCategoryInput>;
};
export type ForecastUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ForecastWhereUniqueInput;
    data: Prisma.XOR<Prisma.ForecastUpdateWithoutCategoryInput, Prisma.ForecastUncheckedUpdateWithoutCategoryInput>;
};
export type ForecastUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ForecastScalarWhereInput;
    data: Prisma.XOR<Prisma.ForecastUpdateManyMutationInput, Prisma.ForecastUncheckedUpdateManyWithoutCategoryInput>;
};
export type ForecastCreateManyUserInput = {
    id?: string;
    categoryId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ForecastUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutForecastsNestedInput;
};
export type ForecastUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastCreateManyCategoryInput = {
    id?: string;
    userId: string;
    targetMonth: number;
    targetYear: number;
    predictedAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ForecastUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutForecastsNestedInput;
};
export type ForecastUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    targetYear?: Prisma.IntFieldUpdateOperationsInput | number;
    predictedAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForecastSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    targetMonth?: boolean;
    targetYear?: boolean;
    predictedAmount?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["forecast"]>;
export type ForecastSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    targetMonth?: boolean;
    targetYear?: boolean;
    predictedAmount?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["forecast"]>;
export type ForecastSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    targetMonth?: boolean;
    targetYear?: boolean;
    predictedAmount?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["forecast"]>;
export type ForecastSelectScalar = {
    id?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    targetMonth?: boolean;
    targetYear?: boolean;
    predictedAmount?: boolean;
    createdAt?: boolean;
};
export type ForecastOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "categoryId" | "targetMonth" | "targetYear" | "predictedAmount" | "createdAt", ExtArgs["result"]["forecast"]>;
export type ForecastInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type ForecastIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type ForecastIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $ForecastPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Forecast";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        categoryId: string;
        targetMonth: number;
        targetYear: number;
        predictedAmount: runtime.Decimal;
        createdAt: Date;
    }, ExtArgs["result"]["forecast"]>;
    composites: {};
};
export type ForecastGetPayload<S extends boolean | null | undefined | ForecastDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ForecastPayload, S>;
export type ForecastCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ForecastFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ForecastCountAggregateInputType | true;
};
export interface ForecastDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Forecast'];
        meta: {
            name: 'Forecast';
        };
    };
    findUnique<T extends ForecastFindUniqueArgs>(args: Prisma.SelectSubset<T, ForecastFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ForecastFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ForecastFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ForecastFindFirstArgs>(args?: Prisma.SelectSubset<T, ForecastFindFirstArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ForecastFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ForecastFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ForecastFindManyArgs>(args?: Prisma.SelectSubset<T, ForecastFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ForecastCreateArgs>(args: Prisma.SelectSubset<T, ForecastCreateArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ForecastCreateManyArgs>(args?: Prisma.SelectSubset<T, ForecastCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ForecastCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ForecastCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ForecastDeleteArgs>(args: Prisma.SelectSubset<T, ForecastDeleteArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ForecastUpdateArgs>(args: Prisma.SelectSubset<T, ForecastUpdateArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ForecastDeleteManyArgs>(args?: Prisma.SelectSubset<T, ForecastDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ForecastUpdateManyArgs>(args: Prisma.SelectSubset<T, ForecastUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ForecastUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ForecastUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ForecastUpsertArgs>(args: Prisma.SelectSubset<T, ForecastUpsertArgs<ExtArgs>>): Prisma.Prisma__ForecastClient<runtime.Types.Result.GetResult<Prisma.$ForecastPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ForecastCountArgs>(args?: Prisma.Subset<T, ForecastCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ForecastCountAggregateOutputType> : number>;
    aggregate<T extends ForecastAggregateArgs>(args: Prisma.Subset<T, ForecastAggregateArgs>): Prisma.PrismaPromise<GetForecastAggregateType<T>>;
    groupBy<T extends ForecastGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ForecastGroupByArgs['orderBy'];
    } : {
        orderBy?: ForecastGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ForecastGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForecastGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ForecastFieldRefs;
}
export interface Prisma__ForecastClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ForecastFieldRefs {
    readonly id: Prisma.FieldRef<"Forecast", 'String'>;
    readonly userId: Prisma.FieldRef<"Forecast", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Forecast", 'String'>;
    readonly targetMonth: Prisma.FieldRef<"Forecast", 'Int'>;
    readonly targetYear: Prisma.FieldRef<"Forecast", 'Int'>;
    readonly predictedAmount: Prisma.FieldRef<"Forecast", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"Forecast", 'DateTime'>;
}
export type ForecastFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where: Prisma.ForecastWhereUniqueInput;
};
export type ForecastFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where: Prisma.ForecastWhereUniqueInput;
};
export type ForecastFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where?: Prisma.ForecastWhereInput;
    orderBy?: Prisma.ForecastOrderByWithRelationInput | Prisma.ForecastOrderByWithRelationInput[];
    cursor?: Prisma.ForecastWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForecastScalarFieldEnum | Prisma.ForecastScalarFieldEnum[];
};
export type ForecastFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where?: Prisma.ForecastWhereInput;
    orderBy?: Prisma.ForecastOrderByWithRelationInput | Prisma.ForecastOrderByWithRelationInput[];
    cursor?: Prisma.ForecastWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForecastScalarFieldEnum | Prisma.ForecastScalarFieldEnum[];
};
export type ForecastFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where?: Prisma.ForecastWhereInput;
    orderBy?: Prisma.ForecastOrderByWithRelationInput | Prisma.ForecastOrderByWithRelationInput[];
    cursor?: Prisma.ForecastWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForecastScalarFieldEnum | Prisma.ForecastScalarFieldEnum[];
};
export type ForecastCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForecastCreateInput, Prisma.ForecastUncheckedCreateInput>;
};
export type ForecastCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ForecastCreateManyInput | Prisma.ForecastCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ForecastCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    data: Prisma.ForecastCreateManyInput | Prisma.ForecastCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ForecastIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ForecastUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForecastUpdateInput, Prisma.ForecastUncheckedUpdateInput>;
    where: Prisma.ForecastWhereUniqueInput;
};
export type ForecastUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ForecastUpdateManyMutationInput, Prisma.ForecastUncheckedUpdateManyInput>;
    where?: Prisma.ForecastWhereInput;
    limit?: number;
};
export type ForecastUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForecastUpdateManyMutationInput, Prisma.ForecastUncheckedUpdateManyInput>;
    where?: Prisma.ForecastWhereInput;
    limit?: number;
    include?: Prisma.ForecastIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ForecastUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where: Prisma.ForecastWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForecastCreateInput, Prisma.ForecastUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ForecastUpdateInput, Prisma.ForecastUncheckedUpdateInput>;
};
export type ForecastDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
    where: Prisma.ForecastWhereUniqueInput;
};
export type ForecastDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForecastWhereInput;
    limit?: number;
};
export type ForecastDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForecastSelect<ExtArgs> | null;
    omit?: Prisma.ForecastOmit<ExtArgs> | null;
    include?: Prisma.ForecastInclude<ExtArgs> | null;
};
//# sourceMappingURL=Forecast.d.ts.map