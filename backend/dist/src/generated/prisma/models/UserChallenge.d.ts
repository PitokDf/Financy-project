import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type UserChallengeModel = runtime.Types.Result.DefaultSelection<Prisma.$UserChallengePayload>;
export type AggregateUserChallenge = {
    _count: UserChallengeCountAggregateOutputType | null;
    _avg: UserChallengeAvgAggregateOutputType | null;
    _sum: UserChallengeSumAggregateOutputType | null;
    _min: UserChallengeMinAggregateOutputType | null;
    _max: UserChallengeMaxAggregateOutputType | null;
};
export type UserChallengeAvgAggregateOutputType = {
    current: number | null;
    weekNumber: number | null;
    year: number | null;
};
export type UserChallengeSumAggregateOutputType = {
    current: number | null;
    weekNumber: number | null;
    year: number | null;
};
export type UserChallengeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    challengeId: string | null;
    current: number | null;
    isCompleted: boolean | null;
    completedAt: Date | null;
    deadline: Date | null;
    weekNumber: number | null;
    year: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserChallengeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    challengeId: string | null;
    current: number | null;
    isCompleted: boolean | null;
    completedAt: Date | null;
    deadline: Date | null;
    weekNumber: number | null;
    year: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserChallengeCountAggregateOutputType = {
    id: number;
    userId: number;
    challengeId: number;
    current: number;
    isCompleted: number;
    completedAt: number;
    deadline: number;
    weekNumber: number;
    year: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserChallengeAvgAggregateInputType = {
    current?: true;
    weekNumber?: true;
    year?: true;
};
export type UserChallengeSumAggregateInputType = {
    current?: true;
    weekNumber?: true;
    year?: true;
};
export type UserChallengeMinAggregateInputType = {
    id?: true;
    userId?: true;
    challengeId?: true;
    current?: true;
    isCompleted?: true;
    completedAt?: true;
    deadline?: true;
    weekNumber?: true;
    year?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserChallengeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    challengeId?: true;
    current?: true;
    isCompleted?: true;
    completedAt?: true;
    deadline?: true;
    weekNumber?: true;
    year?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserChallengeCountAggregateInputType = {
    id?: true;
    userId?: true;
    challengeId?: true;
    current?: true;
    isCompleted?: true;
    completedAt?: true;
    deadline?: true;
    weekNumber?: true;
    year?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserChallengeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserChallengeWhereInput;
    orderBy?: Prisma.UserChallengeOrderByWithRelationInput | Prisma.UserChallengeOrderByWithRelationInput[];
    cursor?: Prisma.UserChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserChallengeCountAggregateInputType;
    _avg?: UserChallengeAvgAggregateInputType;
    _sum?: UserChallengeSumAggregateInputType;
    _min?: UserChallengeMinAggregateInputType;
    _max?: UserChallengeMaxAggregateInputType;
};
export type GetUserChallengeAggregateType<T extends UserChallengeAggregateArgs> = {
    [P in keyof T & keyof AggregateUserChallenge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserChallenge[P]> : Prisma.GetScalarType<T[P], AggregateUserChallenge[P]>;
};
export type UserChallengeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserChallengeWhereInput;
    orderBy?: Prisma.UserChallengeOrderByWithAggregationInput | Prisma.UserChallengeOrderByWithAggregationInput[];
    by: Prisma.UserChallengeScalarFieldEnum[] | Prisma.UserChallengeScalarFieldEnum;
    having?: Prisma.UserChallengeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserChallengeCountAggregateInputType | true;
    _avg?: UserChallengeAvgAggregateInputType;
    _sum?: UserChallengeSumAggregateInputType;
    _min?: UserChallengeMinAggregateInputType;
    _max?: UserChallengeMaxAggregateInputType;
};
export type UserChallengeGroupByOutputType = {
    id: string;
    userId: string;
    challengeId: string;
    current: number;
    isCompleted: boolean;
    completedAt: Date | null;
    deadline: Date;
    weekNumber: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
    _count: UserChallengeCountAggregateOutputType | null;
    _avg: UserChallengeAvgAggregateOutputType | null;
    _sum: UserChallengeSumAggregateOutputType | null;
    _min: UserChallengeMinAggregateOutputType | null;
    _max: UserChallengeMaxAggregateOutputType | null;
};
export type GetUserChallengeGroupByPayload<T extends UserChallengeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserChallengeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserChallengeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserChallengeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserChallengeGroupByOutputType[P]>;
}>>;
export type UserChallengeWhereInput = {
    AND?: Prisma.UserChallengeWhereInput | Prisma.UserChallengeWhereInput[];
    OR?: Prisma.UserChallengeWhereInput[];
    NOT?: Prisma.UserChallengeWhereInput | Prisma.UserChallengeWhereInput[];
    id?: Prisma.StringFilter<"UserChallenge"> | string;
    userId?: Prisma.StringFilter<"UserChallenge"> | string;
    challengeId?: Prisma.StringFilter<"UserChallenge"> | string;
    current?: Prisma.IntFilter<"UserChallenge"> | number;
    isCompleted?: Prisma.BoolFilter<"UserChallenge"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"UserChallenge"> | Date | string | null;
    deadline?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    weekNumber?: Prisma.IntFilter<"UserChallenge"> | number;
    year?: Prisma.IntFilter<"UserChallenge"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    challenge?: Prisma.XOR<Prisma.ChallengeScalarRelationFilter, Prisma.ChallengeWhereInput>;
};
export type UserChallengeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    current?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    challenge?: Prisma.ChallengeOrderByWithRelationInput;
};
export type UserChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_challengeId_weekNumber_year?: Prisma.UserChallengeUserIdChallengeIdWeekNumberYearCompoundUniqueInput;
    AND?: Prisma.UserChallengeWhereInput | Prisma.UserChallengeWhereInput[];
    OR?: Prisma.UserChallengeWhereInput[];
    NOT?: Prisma.UserChallengeWhereInput | Prisma.UserChallengeWhereInput[];
    userId?: Prisma.StringFilter<"UserChallenge"> | string;
    challengeId?: Prisma.StringFilter<"UserChallenge"> | string;
    current?: Prisma.IntFilter<"UserChallenge"> | number;
    isCompleted?: Prisma.BoolFilter<"UserChallenge"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"UserChallenge"> | Date | string | null;
    deadline?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    weekNumber?: Prisma.IntFilter<"UserChallenge"> | number;
    year?: Prisma.IntFilter<"UserChallenge"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    challenge?: Prisma.XOR<Prisma.ChallengeScalarRelationFilter, Prisma.ChallengeWhereInput>;
}, "id" | "userId_challengeId_weekNumber_year">;
export type UserChallengeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    current?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserChallengeCountOrderByAggregateInput;
    _avg?: Prisma.UserChallengeAvgOrderByAggregateInput;
    _max?: Prisma.UserChallengeMaxOrderByAggregateInput;
    _min?: Prisma.UserChallengeMinOrderByAggregateInput;
    _sum?: Prisma.UserChallengeSumOrderByAggregateInput;
};
export type UserChallengeScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserChallengeScalarWhereWithAggregatesInput | Prisma.UserChallengeScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserChallengeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserChallengeScalarWhereWithAggregatesInput | Prisma.UserChallengeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserChallenge"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserChallenge"> | string;
    challengeId?: Prisma.StringWithAggregatesFilter<"UserChallenge"> | string;
    current?: Prisma.IntWithAggregatesFilter<"UserChallenge"> | number;
    isCompleted?: Prisma.BoolWithAggregatesFilter<"UserChallenge"> | boolean;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserChallenge"> | Date | string | null;
    deadline?: Prisma.DateTimeWithAggregatesFilter<"UserChallenge"> | Date | string;
    weekNumber?: Prisma.IntWithAggregatesFilter<"UserChallenge"> | number;
    year?: Prisma.IntWithAggregatesFilter<"UserChallenge"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserChallenge"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserChallenge"> | Date | string;
};
export type UserChallengeCreateInput = {
    id?: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserChallengesInput;
    challenge: Prisma.ChallengeCreateNestedOneWithoutUserChallengesInput;
};
export type UserChallengeUncheckedCreateInput = {
    id?: string;
    userId: string;
    challengeId: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserChallengeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserChallengesNestedInput;
    challenge?: Prisma.ChallengeUpdateOneRequiredWithoutUserChallengesNestedInput;
};
export type UserChallengeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeCreateManyInput = {
    id?: string;
    userId: string;
    challengeId: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserChallengeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeListRelationFilter = {
    every?: Prisma.UserChallengeWhereInput;
    some?: Prisma.UserChallengeWhereInput;
    none?: Prisma.UserChallengeWhereInput;
};
export type UserChallengeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserChallengeUserIdChallengeIdWeekNumberYearCompoundUniqueInput = {
    userId: string;
    challengeId: string;
    weekNumber: number;
    year: number;
};
export type UserChallengeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    current?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserChallengeAvgOrderByAggregateInput = {
    current?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
};
export type UserChallengeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    current?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserChallengeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    current?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserChallengeSumOrderByAggregateInput = {
    current?: Prisma.SortOrder;
    weekNumber?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
};
export type UserChallengeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutUserInput, Prisma.UserChallengeUncheckedCreateWithoutUserInput> | Prisma.UserChallengeCreateWithoutUserInput[] | Prisma.UserChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutUserInput | Prisma.UserChallengeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserChallengeCreateManyUserInputEnvelope;
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
};
export type UserChallengeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutUserInput, Prisma.UserChallengeUncheckedCreateWithoutUserInput> | Prisma.UserChallengeCreateWithoutUserInput[] | Prisma.UserChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutUserInput | Prisma.UserChallengeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserChallengeCreateManyUserInputEnvelope;
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
};
export type UserChallengeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutUserInput, Prisma.UserChallengeUncheckedCreateWithoutUserInput> | Prisma.UserChallengeCreateWithoutUserInput[] | Prisma.UserChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutUserInput | Prisma.UserChallengeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserChallengeUpsertWithWhereUniqueWithoutUserInput | Prisma.UserChallengeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserChallengeCreateManyUserInputEnvelope;
    set?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    disconnect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    delete?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    update?: Prisma.UserChallengeUpdateWithWhereUniqueWithoutUserInput | Prisma.UserChallengeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserChallengeUpdateManyWithWhereWithoutUserInput | Prisma.UserChallengeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserChallengeScalarWhereInput | Prisma.UserChallengeScalarWhereInput[];
};
export type UserChallengeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutUserInput, Prisma.UserChallengeUncheckedCreateWithoutUserInput> | Prisma.UserChallengeCreateWithoutUserInput[] | Prisma.UserChallengeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutUserInput | Prisma.UserChallengeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserChallengeUpsertWithWhereUniqueWithoutUserInput | Prisma.UserChallengeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserChallengeCreateManyUserInputEnvelope;
    set?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    disconnect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    delete?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    update?: Prisma.UserChallengeUpdateWithWhereUniqueWithoutUserInput | Prisma.UserChallengeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserChallengeUpdateManyWithWhereWithoutUserInput | Prisma.UserChallengeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserChallengeScalarWhereInput | Prisma.UserChallengeScalarWhereInput[];
};
export type UserChallengeCreateNestedManyWithoutChallengeInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutChallengeInput, Prisma.UserChallengeUncheckedCreateWithoutChallengeInput> | Prisma.UserChallengeCreateWithoutChallengeInput[] | Prisma.UserChallengeUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutChallengeInput | Prisma.UserChallengeCreateOrConnectWithoutChallengeInput[];
    createMany?: Prisma.UserChallengeCreateManyChallengeInputEnvelope;
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
};
export type UserChallengeUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutChallengeInput, Prisma.UserChallengeUncheckedCreateWithoutChallengeInput> | Prisma.UserChallengeCreateWithoutChallengeInput[] | Prisma.UserChallengeUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutChallengeInput | Prisma.UserChallengeCreateOrConnectWithoutChallengeInput[];
    createMany?: Prisma.UserChallengeCreateManyChallengeInputEnvelope;
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
};
export type UserChallengeUpdateManyWithoutChallengeNestedInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutChallengeInput, Prisma.UserChallengeUncheckedCreateWithoutChallengeInput> | Prisma.UserChallengeCreateWithoutChallengeInput[] | Prisma.UserChallengeUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutChallengeInput | Prisma.UserChallengeCreateOrConnectWithoutChallengeInput[];
    upsert?: Prisma.UserChallengeUpsertWithWhereUniqueWithoutChallengeInput | Prisma.UserChallengeUpsertWithWhereUniqueWithoutChallengeInput[];
    createMany?: Prisma.UserChallengeCreateManyChallengeInputEnvelope;
    set?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    disconnect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    delete?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    update?: Prisma.UserChallengeUpdateWithWhereUniqueWithoutChallengeInput | Prisma.UserChallengeUpdateWithWhereUniqueWithoutChallengeInput[];
    updateMany?: Prisma.UserChallengeUpdateManyWithWhereWithoutChallengeInput | Prisma.UserChallengeUpdateManyWithWhereWithoutChallengeInput[];
    deleteMany?: Prisma.UserChallengeScalarWhereInput | Prisma.UserChallengeScalarWhereInput[];
};
export type UserChallengeUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: Prisma.XOR<Prisma.UserChallengeCreateWithoutChallengeInput, Prisma.UserChallengeUncheckedCreateWithoutChallengeInput> | Prisma.UserChallengeCreateWithoutChallengeInput[] | Prisma.UserChallengeUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.UserChallengeCreateOrConnectWithoutChallengeInput | Prisma.UserChallengeCreateOrConnectWithoutChallengeInput[];
    upsert?: Prisma.UserChallengeUpsertWithWhereUniqueWithoutChallengeInput | Prisma.UserChallengeUpsertWithWhereUniqueWithoutChallengeInput[];
    createMany?: Prisma.UserChallengeCreateManyChallengeInputEnvelope;
    set?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    disconnect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    delete?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    connect?: Prisma.UserChallengeWhereUniqueInput | Prisma.UserChallengeWhereUniqueInput[];
    update?: Prisma.UserChallengeUpdateWithWhereUniqueWithoutChallengeInput | Prisma.UserChallengeUpdateWithWhereUniqueWithoutChallengeInput[];
    updateMany?: Prisma.UserChallengeUpdateManyWithWhereWithoutChallengeInput | Prisma.UserChallengeUpdateManyWithWhereWithoutChallengeInput[];
    deleteMany?: Prisma.UserChallengeScalarWhereInput | Prisma.UserChallengeScalarWhereInput[];
};
export type UserChallengeCreateWithoutUserInput = {
    id?: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challenge: Prisma.ChallengeCreateNestedOneWithoutUserChallengesInput;
};
export type UserChallengeUncheckedCreateWithoutUserInput = {
    id?: string;
    challengeId: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserChallengeCreateOrConnectWithoutUserInput = {
    where: Prisma.UserChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserChallengeCreateWithoutUserInput, Prisma.UserChallengeUncheckedCreateWithoutUserInput>;
};
export type UserChallengeCreateManyUserInputEnvelope = {
    data: Prisma.UserChallengeCreateManyUserInput | Prisma.UserChallengeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserChallengeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserChallengeWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserChallengeUpdateWithoutUserInput, Prisma.UserChallengeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserChallengeCreateWithoutUserInput, Prisma.UserChallengeUncheckedCreateWithoutUserInput>;
};
export type UserChallengeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserChallengeWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserChallengeUpdateWithoutUserInput, Prisma.UserChallengeUncheckedUpdateWithoutUserInput>;
};
export type UserChallengeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserChallengeScalarWhereInput;
    data: Prisma.XOR<Prisma.UserChallengeUpdateManyMutationInput, Prisma.UserChallengeUncheckedUpdateManyWithoutUserInput>;
};
export type UserChallengeScalarWhereInput = {
    AND?: Prisma.UserChallengeScalarWhereInput | Prisma.UserChallengeScalarWhereInput[];
    OR?: Prisma.UserChallengeScalarWhereInput[];
    NOT?: Prisma.UserChallengeScalarWhereInput | Prisma.UserChallengeScalarWhereInput[];
    id?: Prisma.StringFilter<"UserChallenge"> | string;
    userId?: Prisma.StringFilter<"UserChallenge"> | string;
    challengeId?: Prisma.StringFilter<"UserChallenge"> | string;
    current?: Prisma.IntFilter<"UserChallenge"> | number;
    isCompleted?: Prisma.BoolFilter<"UserChallenge"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"UserChallenge"> | Date | string | null;
    deadline?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    weekNumber?: Prisma.IntFilter<"UserChallenge"> | number;
    year?: Prisma.IntFilter<"UserChallenge"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserChallenge"> | Date | string;
};
export type UserChallengeCreateWithoutChallengeInput = {
    id?: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserChallengesInput;
};
export type UserChallengeUncheckedCreateWithoutChallengeInput = {
    id?: string;
    userId: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserChallengeCreateOrConnectWithoutChallengeInput = {
    where: Prisma.UserChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserChallengeCreateWithoutChallengeInput, Prisma.UserChallengeUncheckedCreateWithoutChallengeInput>;
};
export type UserChallengeCreateManyChallengeInputEnvelope = {
    data: Prisma.UserChallengeCreateManyChallengeInput | Prisma.UserChallengeCreateManyChallengeInput[];
    skipDuplicates?: boolean;
};
export type UserChallengeUpsertWithWhereUniqueWithoutChallengeInput = {
    where: Prisma.UserChallengeWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserChallengeUpdateWithoutChallengeInput, Prisma.UserChallengeUncheckedUpdateWithoutChallengeInput>;
    create: Prisma.XOR<Prisma.UserChallengeCreateWithoutChallengeInput, Prisma.UserChallengeUncheckedCreateWithoutChallengeInput>;
};
export type UserChallengeUpdateWithWhereUniqueWithoutChallengeInput = {
    where: Prisma.UserChallengeWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserChallengeUpdateWithoutChallengeInput, Prisma.UserChallengeUncheckedUpdateWithoutChallengeInput>;
};
export type UserChallengeUpdateManyWithWhereWithoutChallengeInput = {
    where: Prisma.UserChallengeScalarWhereInput;
    data: Prisma.XOR<Prisma.UserChallengeUpdateManyMutationInput, Prisma.UserChallengeUncheckedUpdateManyWithoutChallengeInput>;
};
export type UserChallengeCreateManyUserInput = {
    id?: string;
    challengeId: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserChallengeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    challenge?: Prisma.ChallengeUpdateOneRequiredWithoutUserChallengesNestedInput;
};
export type UserChallengeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeCreateManyChallengeInput = {
    id?: string;
    userId: string;
    current?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    deadline: Date | string;
    weekNumber: number;
    year: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserChallengeUpdateWithoutChallengeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserChallengesNestedInput;
};
export type UserChallengeUncheckedUpdateWithoutChallengeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeUncheckedUpdateManyWithoutChallengeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    current?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deadline?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    weekNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserChallengeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    challengeId?: boolean;
    current?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    deadline?: boolean;
    weekNumber?: boolean;
    year?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userChallenge"]>;
export type UserChallengeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    challengeId?: boolean;
    current?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    deadline?: boolean;
    weekNumber?: boolean;
    year?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userChallenge"]>;
export type UserChallengeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    challengeId?: boolean;
    current?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    deadline?: boolean;
    weekNumber?: boolean;
    year?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userChallenge"]>;
export type UserChallengeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    challengeId?: boolean;
    current?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    deadline?: boolean;
    weekNumber?: boolean;
    year?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserChallengeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "challengeId" | "current" | "isCompleted" | "completedAt" | "deadline" | "weekNumber" | "year" | "createdAt" | "updatedAt", ExtArgs["result"]["userChallenge"]>;
export type UserChallengeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
};
export type UserChallengeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
};
export type UserChallengeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
};
export type $UserChallengePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserChallenge";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        challenge: Prisma.$ChallengePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        challengeId: string;
        current: number;
        isCompleted: boolean;
        completedAt: Date | null;
        deadline: Date;
        weekNumber: number;
        year: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userChallenge"]>;
    composites: {};
};
export type UserChallengeGetPayload<S extends boolean | null | undefined | UserChallengeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserChallengePayload, S>;
export type UserChallengeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserChallengeCountAggregateInputType | true;
};
export interface UserChallengeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserChallenge'];
        meta: {
            name: 'UserChallenge';
        };
    };
    findUnique<T extends UserChallengeFindUniqueArgs>(args: Prisma.SelectSubset<T, UserChallengeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserChallengeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserChallengeFindFirstArgs>(args?: Prisma.SelectSubset<T, UserChallengeFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserChallengeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserChallengeFindManyArgs>(args?: Prisma.SelectSubset<T, UserChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserChallengeCreateArgs>(args: Prisma.SelectSubset<T, UserChallengeCreateArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserChallengeCreateManyArgs>(args?: Prisma.SelectSubset<T, UserChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserChallengeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserChallengeDeleteArgs>(args: Prisma.SelectSubset<T, UserChallengeDeleteArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserChallengeUpdateArgs>(args: Prisma.SelectSubset<T, UserChallengeUpdateArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserChallengeDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserChallengeUpdateManyArgs>(args: Prisma.SelectSubset<T, UserChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserChallengeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserChallengeUpsertArgs>(args: Prisma.SelectSubset<T, UserChallengeUpsertArgs<ExtArgs>>): Prisma.Prisma__UserChallengeClient<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserChallengeCountArgs>(args?: Prisma.Subset<T, UserChallengeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserChallengeCountAggregateOutputType> : number>;
    aggregate<T extends UserChallengeAggregateArgs>(args: Prisma.Subset<T, UserChallengeAggregateArgs>): Prisma.PrismaPromise<GetUserChallengeAggregateType<T>>;
    groupBy<T extends UserChallengeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserChallengeGroupByArgs['orderBy'];
    } : {
        orderBy?: UserChallengeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserChallengeFieldRefs;
}
export interface Prisma__UserChallengeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    challenge<T extends Prisma.ChallengeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChallengeDefaultArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserChallengeFieldRefs {
    readonly id: Prisma.FieldRef<"UserChallenge", 'String'>;
    readonly userId: Prisma.FieldRef<"UserChallenge", 'String'>;
    readonly challengeId: Prisma.FieldRef<"UserChallenge", 'String'>;
    readonly current: Prisma.FieldRef<"UserChallenge", 'Int'>;
    readonly isCompleted: Prisma.FieldRef<"UserChallenge", 'Boolean'>;
    readonly completedAt: Prisma.FieldRef<"UserChallenge", 'DateTime'>;
    readonly deadline: Prisma.FieldRef<"UserChallenge", 'DateTime'>;
    readonly weekNumber: Prisma.FieldRef<"UserChallenge", 'Int'>;
    readonly year: Prisma.FieldRef<"UserChallenge", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"UserChallenge", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserChallenge", 'DateTime'>;
}
export type UserChallengeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where: Prisma.UserChallengeWhereUniqueInput;
};
export type UserChallengeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where: Prisma.UserChallengeWhereUniqueInput;
};
export type UserChallengeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where?: Prisma.UserChallengeWhereInput;
    orderBy?: Prisma.UserChallengeOrderByWithRelationInput | Prisma.UserChallengeOrderByWithRelationInput[];
    cursor?: Prisma.UserChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserChallengeScalarFieldEnum | Prisma.UserChallengeScalarFieldEnum[];
};
export type UserChallengeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where?: Prisma.UserChallengeWhereInput;
    orderBy?: Prisma.UserChallengeOrderByWithRelationInput | Prisma.UserChallengeOrderByWithRelationInput[];
    cursor?: Prisma.UserChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserChallengeScalarFieldEnum | Prisma.UserChallengeScalarFieldEnum[];
};
export type UserChallengeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where?: Prisma.UserChallengeWhereInput;
    orderBy?: Prisma.UserChallengeOrderByWithRelationInput | Prisma.UserChallengeOrderByWithRelationInput[];
    cursor?: Prisma.UserChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserChallengeScalarFieldEnum | Prisma.UserChallengeScalarFieldEnum[];
};
export type UserChallengeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserChallengeCreateInput, Prisma.UserChallengeUncheckedCreateInput>;
};
export type UserChallengeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserChallengeCreateManyInput | Prisma.UserChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserChallengeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    data: Prisma.UserChallengeCreateManyInput | Prisma.UserChallengeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserChallengeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserChallengeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserChallengeUpdateInput, Prisma.UserChallengeUncheckedUpdateInput>;
    where: Prisma.UserChallengeWhereUniqueInput;
};
export type UserChallengeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserChallengeUpdateManyMutationInput, Prisma.UserChallengeUncheckedUpdateManyInput>;
    where?: Prisma.UserChallengeWhereInput;
    limit?: number;
};
export type UserChallengeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserChallengeUpdateManyMutationInput, Prisma.UserChallengeUncheckedUpdateManyInput>;
    where?: Prisma.UserChallengeWhereInput;
    limit?: number;
    include?: Prisma.UserChallengeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserChallengeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where: Prisma.UserChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserChallengeCreateInput, Prisma.UserChallengeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserChallengeUpdateInput, Prisma.UserChallengeUncheckedUpdateInput>;
};
export type UserChallengeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
    where: Prisma.UserChallengeWhereUniqueInput;
};
export type UserChallengeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserChallengeWhereInput;
    limit?: number;
};
export type UserChallengeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserChallengeSelect<ExtArgs> | null;
    omit?: Prisma.UserChallengeOmit<ExtArgs> | null;
    include?: Prisma.UserChallengeInclude<ExtArgs> | null;
};
//# sourceMappingURL=UserChallenge.d.ts.map