import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ExportLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ExportLogPayload>;
export type AggregateExportLog = {
    _count: ExportLogCountAggregateOutputType | null;
    _avg: ExportLogAvgAggregateOutputType | null;
    _sum: ExportLogSumAggregateOutputType | null;
    _min: ExportLogMinAggregateOutputType | null;
    _max: ExportLogMaxAggregateOutputType | null;
};
export type ExportLogAvgAggregateOutputType = {
    month: number | null;
    year: number | null;
    fileSize: number | null;
};
export type ExportLogSumAggregateOutputType = {
    month: number | null;
    year: number | null;
    fileSize: number | null;
};
export type ExportLogMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    format: string | null;
    status: string | null;
    month: number | null;
    year: number | null;
    fileUrl: string | null;
    fileSize: number | null;
    createdAt: Date | null;
    completedAt: Date | null;
};
export type ExportLogMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    format: string | null;
    status: string | null;
    month: number | null;
    year: number | null;
    fileUrl: string | null;
    fileSize: number | null;
    createdAt: Date | null;
    completedAt: Date | null;
};
export type ExportLogCountAggregateOutputType = {
    id: number;
    userId: number;
    format: number;
    status: number;
    month: number;
    year: number;
    fileUrl: number;
    fileSize: number;
    createdAt: number;
    completedAt: number;
    _all: number;
};
export type ExportLogAvgAggregateInputType = {
    month?: true;
    year?: true;
    fileSize?: true;
};
export type ExportLogSumAggregateInputType = {
    month?: true;
    year?: true;
    fileSize?: true;
};
export type ExportLogMinAggregateInputType = {
    id?: true;
    userId?: true;
    format?: true;
    status?: true;
    month?: true;
    year?: true;
    fileUrl?: true;
    fileSize?: true;
    createdAt?: true;
    completedAt?: true;
};
export type ExportLogMaxAggregateInputType = {
    id?: true;
    userId?: true;
    format?: true;
    status?: true;
    month?: true;
    year?: true;
    fileUrl?: true;
    fileSize?: true;
    createdAt?: true;
    completedAt?: true;
};
export type ExportLogCountAggregateInputType = {
    id?: true;
    userId?: true;
    format?: true;
    status?: true;
    month?: true;
    year?: true;
    fileUrl?: true;
    fileSize?: true;
    createdAt?: true;
    completedAt?: true;
    _all?: true;
};
export type ExportLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExportLogWhereInput;
    orderBy?: Prisma.ExportLogOrderByWithRelationInput | Prisma.ExportLogOrderByWithRelationInput[];
    cursor?: Prisma.ExportLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExportLogCountAggregateInputType;
    _avg?: ExportLogAvgAggregateInputType;
    _sum?: ExportLogSumAggregateInputType;
    _min?: ExportLogMinAggregateInputType;
    _max?: ExportLogMaxAggregateInputType;
};
export type GetExportLogAggregateType<T extends ExportLogAggregateArgs> = {
    [P in keyof T & keyof AggregateExportLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExportLog[P]> : Prisma.GetScalarType<T[P], AggregateExportLog[P]>;
};
export type ExportLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExportLogWhereInput;
    orderBy?: Prisma.ExportLogOrderByWithAggregationInput | Prisma.ExportLogOrderByWithAggregationInput[];
    by: Prisma.ExportLogScalarFieldEnum[] | Prisma.ExportLogScalarFieldEnum;
    having?: Prisma.ExportLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExportLogCountAggregateInputType | true;
    _avg?: ExportLogAvgAggregateInputType;
    _sum?: ExportLogSumAggregateInputType;
    _min?: ExportLogMinAggregateInputType;
    _max?: ExportLogMaxAggregateInputType;
};
export type ExportLogGroupByOutputType = {
    id: string;
    userId: string;
    format: string;
    status: string;
    month: number | null;
    year: number | null;
    fileUrl: string | null;
    fileSize: number | null;
    createdAt: Date;
    completedAt: Date | null;
    _count: ExportLogCountAggregateOutputType | null;
    _avg: ExportLogAvgAggregateOutputType | null;
    _sum: ExportLogSumAggregateOutputType | null;
    _min: ExportLogMinAggregateOutputType | null;
    _max: ExportLogMaxAggregateOutputType | null;
};
export type GetExportLogGroupByPayload<T extends ExportLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExportLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExportLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExportLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExportLogGroupByOutputType[P]>;
}>>;
export type ExportLogWhereInput = {
    AND?: Prisma.ExportLogWhereInput | Prisma.ExportLogWhereInput[];
    OR?: Prisma.ExportLogWhereInput[];
    NOT?: Prisma.ExportLogWhereInput | Prisma.ExportLogWhereInput[];
    id?: Prisma.StringFilter<"ExportLog"> | string;
    userId?: Prisma.StringFilter<"ExportLog"> | string;
    format?: Prisma.StringFilter<"ExportLog"> | string;
    status?: Prisma.StringFilter<"ExportLog"> | string;
    month?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    year?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    fileUrl?: Prisma.StringNullableFilter<"ExportLog"> | string | null;
    fileSize?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"ExportLog"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"ExportLog"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ExportLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    month?: Prisma.SortOrderInput | Prisma.SortOrder;
    year?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileSize?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ExportLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExportLogWhereInput | Prisma.ExportLogWhereInput[];
    OR?: Prisma.ExportLogWhereInput[];
    NOT?: Prisma.ExportLogWhereInput | Prisma.ExportLogWhereInput[];
    userId?: Prisma.StringFilter<"ExportLog"> | string;
    format?: Prisma.StringFilter<"ExportLog"> | string;
    status?: Prisma.StringFilter<"ExportLog"> | string;
    month?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    year?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    fileUrl?: Prisma.StringNullableFilter<"ExportLog"> | string | null;
    fileSize?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"ExportLog"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"ExportLog"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type ExportLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    month?: Prisma.SortOrderInput | Prisma.SortOrder;
    year?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileSize?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ExportLogCountOrderByAggregateInput;
    _avg?: Prisma.ExportLogAvgOrderByAggregateInput;
    _max?: Prisma.ExportLogMaxOrderByAggregateInput;
    _min?: Prisma.ExportLogMinOrderByAggregateInput;
    _sum?: Prisma.ExportLogSumOrderByAggregateInput;
};
export type ExportLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExportLogScalarWhereWithAggregatesInput | Prisma.ExportLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExportLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExportLogScalarWhereWithAggregatesInput | Prisma.ExportLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ExportLog"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ExportLog"> | string;
    format?: Prisma.StringWithAggregatesFilter<"ExportLog"> | string;
    status?: Prisma.StringWithAggregatesFilter<"ExportLog"> | string;
    month?: Prisma.IntNullableWithAggregatesFilter<"ExportLog"> | number | null;
    year?: Prisma.IntNullableWithAggregatesFilter<"ExportLog"> | number | null;
    fileUrl?: Prisma.StringNullableWithAggregatesFilter<"ExportLog"> | string | null;
    fileSize?: Prisma.IntNullableWithAggregatesFilter<"ExportLog"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ExportLog"> | Date | string;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ExportLog"> | Date | string | null;
};
export type ExportLogCreateInput = {
    id?: string;
    format: string;
    status?: string;
    month?: number | null;
    year?: number | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutExportLogsInput;
};
export type ExportLogUncheckedCreateInput = {
    id?: string;
    userId: string;
    format: string;
    status?: string;
    month?: number | null;
    year?: number | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type ExportLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutExportLogsNestedInput;
};
export type ExportLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExportLogCreateManyInput = {
    id?: string;
    userId: string;
    format: string;
    status?: string;
    month?: number | null;
    year?: number | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type ExportLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExportLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExportLogListRelationFilter = {
    every?: Prisma.ExportLogWhereInput;
    some?: Prisma.ExportLogWhereInput;
    none?: Prisma.ExportLogWhereInput;
};
export type ExportLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExportLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type ExportLogAvgOrderByAggregateInput = {
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
};
export type ExportLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type ExportLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type ExportLogSumOrderByAggregateInput = {
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
};
export type ExportLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExportLogCreateWithoutUserInput, Prisma.ExportLogUncheckedCreateWithoutUserInput> | Prisma.ExportLogCreateWithoutUserInput[] | Prisma.ExportLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExportLogCreateOrConnectWithoutUserInput | Prisma.ExportLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExportLogCreateManyUserInputEnvelope;
    connect?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
};
export type ExportLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExportLogCreateWithoutUserInput, Prisma.ExportLogUncheckedCreateWithoutUserInput> | Prisma.ExportLogCreateWithoutUserInput[] | Prisma.ExportLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExportLogCreateOrConnectWithoutUserInput | Prisma.ExportLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExportLogCreateManyUserInputEnvelope;
    connect?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
};
export type ExportLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExportLogCreateWithoutUserInput, Prisma.ExportLogUncheckedCreateWithoutUserInput> | Prisma.ExportLogCreateWithoutUserInput[] | Prisma.ExportLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExportLogCreateOrConnectWithoutUserInput | Prisma.ExportLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExportLogUpsertWithWhereUniqueWithoutUserInput | Prisma.ExportLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExportLogCreateManyUserInputEnvelope;
    set?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    disconnect?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    delete?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    connect?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    update?: Prisma.ExportLogUpdateWithWhereUniqueWithoutUserInput | Prisma.ExportLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExportLogUpdateManyWithWhereWithoutUserInput | Prisma.ExportLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExportLogScalarWhereInput | Prisma.ExportLogScalarWhereInput[];
};
export type ExportLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExportLogCreateWithoutUserInput, Prisma.ExportLogUncheckedCreateWithoutUserInput> | Prisma.ExportLogCreateWithoutUserInput[] | Prisma.ExportLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExportLogCreateOrConnectWithoutUserInput | Prisma.ExportLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExportLogUpsertWithWhereUniqueWithoutUserInput | Prisma.ExportLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExportLogCreateManyUserInputEnvelope;
    set?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    disconnect?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    delete?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    connect?: Prisma.ExportLogWhereUniqueInput | Prisma.ExportLogWhereUniqueInput[];
    update?: Prisma.ExportLogUpdateWithWhereUniqueWithoutUserInput | Prisma.ExportLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExportLogUpdateManyWithWhereWithoutUserInput | Prisma.ExportLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExportLogScalarWhereInput | Prisma.ExportLogScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ExportLogCreateWithoutUserInput = {
    id?: string;
    format: string;
    status?: string;
    month?: number | null;
    year?: number | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type ExportLogUncheckedCreateWithoutUserInput = {
    id?: string;
    format: string;
    status?: string;
    month?: number | null;
    year?: number | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type ExportLogCreateOrConnectWithoutUserInput = {
    where: Prisma.ExportLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExportLogCreateWithoutUserInput, Prisma.ExportLogUncheckedCreateWithoutUserInput>;
};
export type ExportLogCreateManyUserInputEnvelope = {
    data: Prisma.ExportLogCreateManyUserInput | Prisma.ExportLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExportLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExportLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExportLogUpdateWithoutUserInput, Prisma.ExportLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExportLogCreateWithoutUserInput, Prisma.ExportLogUncheckedCreateWithoutUserInput>;
};
export type ExportLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExportLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExportLogUpdateWithoutUserInput, Prisma.ExportLogUncheckedUpdateWithoutUserInput>;
};
export type ExportLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExportLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ExportLogUpdateManyMutationInput, Prisma.ExportLogUncheckedUpdateManyWithoutUserInput>;
};
export type ExportLogScalarWhereInput = {
    AND?: Prisma.ExportLogScalarWhereInput | Prisma.ExportLogScalarWhereInput[];
    OR?: Prisma.ExportLogScalarWhereInput[];
    NOT?: Prisma.ExportLogScalarWhereInput | Prisma.ExportLogScalarWhereInput[];
    id?: Prisma.StringFilter<"ExportLog"> | string;
    userId?: Prisma.StringFilter<"ExportLog"> | string;
    format?: Prisma.StringFilter<"ExportLog"> | string;
    status?: Prisma.StringFilter<"ExportLog"> | string;
    month?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    year?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    fileUrl?: Prisma.StringNullableFilter<"ExportLog"> | string | null;
    fileSize?: Prisma.IntNullableFilter<"ExportLog"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"ExportLog"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"ExportLog"> | Date | string | null;
};
export type ExportLogCreateManyUserInput = {
    id?: string;
    format: string;
    status?: string;
    month?: number | null;
    year?: number | null;
    fileUrl?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    completedAt?: Date | string | null;
};
export type ExportLogUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExportLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExportLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    year?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExportLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    format?: boolean;
    status?: boolean;
    month?: boolean;
    year?: boolean;
    fileUrl?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["exportLog"]>;
export type ExportLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    format?: boolean;
    status?: boolean;
    month?: boolean;
    year?: boolean;
    fileUrl?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["exportLog"]>;
export type ExportLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    format?: boolean;
    status?: boolean;
    month?: boolean;
    year?: boolean;
    fileUrl?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["exportLog"]>;
export type ExportLogSelectScalar = {
    id?: boolean;
    userId?: boolean;
    format?: boolean;
    status?: boolean;
    month?: boolean;
    year?: boolean;
    fileUrl?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    completedAt?: boolean;
};
export type ExportLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "format" | "status" | "month" | "year" | "fileUrl" | "fileSize" | "createdAt" | "completedAt", ExtArgs["result"]["exportLog"]>;
export type ExportLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ExportLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ExportLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ExportLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExportLog";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        format: string;
        status: string;
        month: number | null;
        year: number | null;
        fileUrl: string | null;
        fileSize: number | null;
        createdAt: Date;
        completedAt: Date | null;
    }, ExtArgs["result"]["exportLog"]>;
    composites: {};
};
export type ExportLogGetPayload<S extends boolean | null | undefined | ExportLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExportLogPayload, S>;
export type ExportLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExportLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExportLogCountAggregateInputType | true;
};
export interface ExportLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExportLog'];
        meta: {
            name: 'ExportLog';
        };
    };
    findUnique<T extends ExportLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ExportLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExportLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExportLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExportLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ExportLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExportLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExportLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExportLogFindManyArgs>(args?: Prisma.SelectSubset<T, ExportLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExportLogCreateArgs>(args: Prisma.SelectSubset<T, ExportLogCreateArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExportLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ExportLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExportLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExportLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExportLogDeleteArgs>(args: Prisma.SelectSubset<T, ExportLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExportLogUpdateArgs>(args: Prisma.SelectSubset<T, ExportLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExportLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExportLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExportLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ExportLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExportLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExportLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExportLogUpsertArgs>(args: Prisma.SelectSubset<T, ExportLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ExportLogClient<runtime.Types.Result.GetResult<Prisma.$ExportLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExportLogCountArgs>(args?: Prisma.Subset<T, ExportLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExportLogCountAggregateOutputType> : number>;
    aggregate<T extends ExportLogAggregateArgs>(args: Prisma.Subset<T, ExportLogAggregateArgs>): Prisma.PrismaPromise<GetExportLogAggregateType<T>>;
    groupBy<T extends ExportLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExportLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ExportLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExportLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExportLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExportLogFieldRefs;
}
export interface Prisma__ExportLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExportLogFieldRefs {
    readonly id: Prisma.FieldRef<"ExportLog", 'String'>;
    readonly userId: Prisma.FieldRef<"ExportLog", 'String'>;
    readonly format: Prisma.FieldRef<"ExportLog", 'String'>;
    readonly status: Prisma.FieldRef<"ExportLog", 'String'>;
    readonly month: Prisma.FieldRef<"ExportLog", 'Int'>;
    readonly year: Prisma.FieldRef<"ExportLog", 'Int'>;
    readonly fileUrl: Prisma.FieldRef<"ExportLog", 'String'>;
    readonly fileSize: Prisma.FieldRef<"ExportLog", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ExportLog", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"ExportLog", 'DateTime'>;
}
export type ExportLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where: Prisma.ExportLogWhereUniqueInput;
};
export type ExportLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where: Prisma.ExportLogWhereUniqueInput;
};
export type ExportLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where?: Prisma.ExportLogWhereInput;
    orderBy?: Prisma.ExportLogOrderByWithRelationInput | Prisma.ExportLogOrderByWithRelationInput[];
    cursor?: Prisma.ExportLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExportLogScalarFieldEnum | Prisma.ExportLogScalarFieldEnum[];
};
export type ExportLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where?: Prisma.ExportLogWhereInput;
    orderBy?: Prisma.ExportLogOrderByWithRelationInput | Prisma.ExportLogOrderByWithRelationInput[];
    cursor?: Prisma.ExportLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExportLogScalarFieldEnum | Prisma.ExportLogScalarFieldEnum[];
};
export type ExportLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where?: Prisma.ExportLogWhereInput;
    orderBy?: Prisma.ExportLogOrderByWithRelationInput | Prisma.ExportLogOrderByWithRelationInput[];
    cursor?: Prisma.ExportLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExportLogScalarFieldEnum | Prisma.ExportLogScalarFieldEnum[];
};
export type ExportLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExportLogCreateInput, Prisma.ExportLogUncheckedCreateInput>;
};
export type ExportLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExportLogCreateManyInput | Prisma.ExportLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExportLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    data: Prisma.ExportLogCreateManyInput | Prisma.ExportLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExportLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExportLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExportLogUpdateInput, Prisma.ExportLogUncheckedUpdateInput>;
    where: Prisma.ExportLogWhereUniqueInput;
};
export type ExportLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExportLogUpdateManyMutationInput, Prisma.ExportLogUncheckedUpdateManyInput>;
    where?: Prisma.ExportLogWhereInput;
    limit?: number;
};
export type ExportLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExportLogUpdateManyMutationInput, Prisma.ExportLogUncheckedUpdateManyInput>;
    where?: Prisma.ExportLogWhereInput;
    limit?: number;
    include?: Prisma.ExportLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExportLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where: Prisma.ExportLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExportLogCreateInput, Prisma.ExportLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExportLogUpdateInput, Prisma.ExportLogUncheckedUpdateInput>;
};
export type ExportLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
    where: Prisma.ExportLogWhereUniqueInput;
};
export type ExportLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExportLogWhereInput;
    limit?: number;
};
export type ExportLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExportLogSelect<ExtArgs> | null;
    omit?: Prisma.ExportLogOmit<ExtArgs> | null;
    include?: Prisma.ExportLogInclude<ExtArgs> | null;
};
//# sourceMappingURL=ExportLog.d.ts.map