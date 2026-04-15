import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type UserStatsModel = runtime.Types.Result.DefaultSelection<Prisma.$UserStatsPayload>;
export type AggregateUserStats = {
    _count: UserStatsCountAggregateOutputType | null;
    _avg: UserStatsAvgAggregateOutputType | null;
    _sum: UserStatsSumAggregateOutputType | null;
    _min: UserStatsMinAggregateOutputType | null;
    _max: UserStatsMaxAggregateOutputType | null;
};
export type UserStatsAvgAggregateOutputType = {
    xp: number | null;
    level: number | null;
    streak: number | null;
    longestStreak: number | null;
    totalTransactions: number | null;
    totalIncome: number | null;
    totalExpense: number | null;
};
export type UserStatsSumAggregateOutputType = {
    xp: number | null;
    level: number | null;
    streak: number | null;
    longestStreak: number | null;
    totalTransactions: number | null;
    totalIncome: number | null;
    totalExpense: number | null;
};
export type UserStatsMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    xp: number | null;
    level: number | null;
    streak: number | null;
    longestStreak: number | null;
    lastTransactionAt: Date | null;
    totalTransactions: number | null;
    totalIncome: number | null;
    totalExpense: number | null;
    hasExported: boolean | null;
    hasAnalyzed: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserStatsMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    xp: number | null;
    level: number | null;
    streak: number | null;
    longestStreak: number | null;
    lastTransactionAt: Date | null;
    totalTransactions: number | null;
    totalIncome: number | null;
    totalExpense: number | null;
    hasExported: boolean | null;
    hasAnalyzed: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserStatsCountAggregateOutputType = {
    id: number;
    userId: number;
    xp: number;
    level: number;
    streak: number;
    longestStreak: number;
    lastTransactionAt: number;
    totalTransactions: number;
    totalIncome: number;
    totalExpense: number;
    hasExported: number;
    hasAnalyzed: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserStatsAvgAggregateInputType = {
    xp?: true;
    level?: true;
    streak?: true;
    longestStreak?: true;
    totalTransactions?: true;
    totalIncome?: true;
    totalExpense?: true;
};
export type UserStatsSumAggregateInputType = {
    xp?: true;
    level?: true;
    streak?: true;
    longestStreak?: true;
    totalTransactions?: true;
    totalIncome?: true;
    totalExpense?: true;
};
export type UserStatsMinAggregateInputType = {
    id?: true;
    userId?: true;
    xp?: true;
    level?: true;
    streak?: true;
    longestStreak?: true;
    lastTransactionAt?: true;
    totalTransactions?: true;
    totalIncome?: true;
    totalExpense?: true;
    hasExported?: true;
    hasAnalyzed?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserStatsMaxAggregateInputType = {
    id?: true;
    userId?: true;
    xp?: true;
    level?: true;
    streak?: true;
    longestStreak?: true;
    lastTransactionAt?: true;
    totalTransactions?: true;
    totalIncome?: true;
    totalExpense?: true;
    hasExported?: true;
    hasAnalyzed?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserStatsCountAggregateInputType = {
    id?: true;
    userId?: true;
    xp?: true;
    level?: true;
    streak?: true;
    longestStreak?: true;
    lastTransactionAt?: true;
    totalTransactions?: true;
    totalIncome?: true;
    totalExpense?: true;
    hasExported?: true;
    hasAnalyzed?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserStatsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserStatsWhereInput;
    orderBy?: Prisma.UserStatsOrderByWithRelationInput | Prisma.UserStatsOrderByWithRelationInput[];
    cursor?: Prisma.UserStatsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserStatsCountAggregateInputType;
    _avg?: UserStatsAvgAggregateInputType;
    _sum?: UserStatsSumAggregateInputType;
    _min?: UserStatsMinAggregateInputType;
    _max?: UserStatsMaxAggregateInputType;
};
export type GetUserStatsAggregateType<T extends UserStatsAggregateArgs> = {
    [P in keyof T & keyof AggregateUserStats]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserStats[P]> : Prisma.GetScalarType<T[P], AggregateUserStats[P]>;
};
export type UserStatsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserStatsWhereInput;
    orderBy?: Prisma.UserStatsOrderByWithAggregationInput | Prisma.UserStatsOrderByWithAggregationInput[];
    by: Prisma.UserStatsScalarFieldEnum[] | Prisma.UserStatsScalarFieldEnum;
    having?: Prisma.UserStatsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserStatsCountAggregateInputType | true;
    _avg?: UserStatsAvgAggregateInputType;
    _sum?: UserStatsSumAggregateInputType;
    _min?: UserStatsMinAggregateInputType;
    _max?: UserStatsMaxAggregateInputType;
};
export type UserStatsGroupByOutputType = {
    id: string;
    userId: string;
    xp: number;
    level: number;
    streak: number;
    longestStreak: number;
    lastTransactionAt: Date | null;
    totalTransactions: number;
    totalIncome: number;
    totalExpense: number;
    hasExported: boolean;
    hasAnalyzed: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: UserStatsCountAggregateOutputType | null;
    _avg: UserStatsAvgAggregateOutputType | null;
    _sum: UserStatsSumAggregateOutputType | null;
    _min: UserStatsMinAggregateOutputType | null;
    _max: UserStatsMaxAggregateOutputType | null;
};
export type GetUserStatsGroupByPayload<T extends UserStatsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserStatsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserStatsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserStatsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserStatsGroupByOutputType[P]>;
}>>;
export type UserStatsWhereInput = {
    AND?: Prisma.UserStatsWhereInput | Prisma.UserStatsWhereInput[];
    OR?: Prisma.UserStatsWhereInput[];
    NOT?: Prisma.UserStatsWhereInput | Prisma.UserStatsWhereInput[];
    id?: Prisma.StringFilter<"UserStats"> | string;
    userId?: Prisma.StringFilter<"UserStats"> | string;
    xp?: Prisma.IntFilter<"UserStats"> | number;
    level?: Prisma.IntFilter<"UserStats"> | number;
    streak?: Prisma.IntFilter<"UserStats"> | number;
    longestStreak?: Prisma.IntFilter<"UserStats"> | number;
    lastTransactionAt?: Prisma.DateTimeNullableFilter<"UserStats"> | Date | string | null;
    totalTransactions?: Prisma.IntFilter<"UserStats"> | number;
    totalIncome?: Prisma.IntFilter<"UserStats"> | number;
    totalExpense?: Prisma.IntFilter<"UserStats"> | number;
    hasExported?: Prisma.BoolFilter<"UserStats"> | boolean;
    hasAnalyzed?: Prisma.BoolFilter<"UserStats"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"UserStats"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserStats"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserStatsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastTransactionAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
    hasExported?: Prisma.SortOrder;
    hasAnalyzed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.UserStatsWhereInput | Prisma.UserStatsWhereInput[];
    OR?: Prisma.UserStatsWhereInput[];
    NOT?: Prisma.UserStatsWhereInput | Prisma.UserStatsWhereInput[];
    xp?: Prisma.IntFilter<"UserStats"> | number;
    level?: Prisma.IntFilter<"UserStats"> | number;
    streak?: Prisma.IntFilter<"UserStats"> | number;
    longestStreak?: Prisma.IntFilter<"UserStats"> | number;
    lastTransactionAt?: Prisma.DateTimeNullableFilter<"UserStats"> | Date | string | null;
    totalTransactions?: Prisma.IntFilter<"UserStats"> | number;
    totalIncome?: Prisma.IntFilter<"UserStats"> | number;
    totalExpense?: Prisma.IntFilter<"UserStats"> | number;
    hasExported?: Prisma.BoolFilter<"UserStats"> | boolean;
    hasAnalyzed?: Prisma.BoolFilter<"UserStats"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"UserStats"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserStats"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type UserStatsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastTransactionAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
    hasExported?: Prisma.SortOrder;
    hasAnalyzed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserStatsCountOrderByAggregateInput;
    _avg?: Prisma.UserStatsAvgOrderByAggregateInput;
    _max?: Prisma.UserStatsMaxOrderByAggregateInput;
    _min?: Prisma.UserStatsMinOrderByAggregateInput;
    _sum?: Prisma.UserStatsSumOrderByAggregateInput;
};
export type UserStatsScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserStatsScalarWhereWithAggregatesInput | Prisma.UserStatsScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserStatsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserStatsScalarWhereWithAggregatesInput | Prisma.UserStatsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserStats"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserStats"> | string;
    xp?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    level?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    streak?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    longestStreak?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    lastTransactionAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserStats"> | Date | string | null;
    totalTransactions?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    totalIncome?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    totalExpense?: Prisma.IntWithAggregatesFilter<"UserStats"> | number;
    hasExported?: Prisma.BoolWithAggregatesFilter<"UserStats"> | boolean;
    hasAnalyzed?: Prisma.BoolWithAggregatesFilter<"UserStats"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserStats"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserStats"> | Date | string;
};
export type UserStatsCreateInput = {
    id?: string;
    xp?: number;
    level?: number;
    streak?: number;
    longestStreak?: number;
    lastTransactionAt?: Date | string | null;
    totalTransactions?: number;
    totalIncome?: number;
    totalExpense?: number;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutUserStatsInput;
};
export type UserStatsUncheckedCreateInput = {
    id?: string;
    userId: string;
    xp?: number;
    level?: number;
    streak?: number;
    longestStreak?: number;
    lastTransactionAt?: Date | string | null;
    totalTransactions?: number;
    totalIncome?: number;
    totalExpense?: number;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserStatsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    xp?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.IntFieldUpdateOperationsInput | number;
    streak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastTransactionAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    totalIncome?: Prisma.IntFieldUpdateOperationsInput | number;
    totalExpense?: Prisma.IntFieldUpdateOperationsInput | number;
    hasExported?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasAnalyzed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutUserStatsNestedInput;
};
export type UserStatsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    xp?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.IntFieldUpdateOperationsInput | number;
    streak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastTransactionAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    totalIncome?: Prisma.IntFieldUpdateOperationsInput | number;
    totalExpense?: Prisma.IntFieldUpdateOperationsInput | number;
    hasExported?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasAnalyzed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStatsCreateManyInput = {
    id?: string;
    userId: string;
    xp?: number;
    level?: number;
    streak?: number;
    longestStreak?: number;
    lastTransactionAt?: Date | string | null;
    totalTransactions?: number;
    totalIncome?: number;
    totalExpense?: number;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserStatsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    xp?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.IntFieldUpdateOperationsInput | number;
    streak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastTransactionAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    totalIncome?: Prisma.IntFieldUpdateOperationsInput | number;
    totalExpense?: Prisma.IntFieldUpdateOperationsInput | number;
    hasExported?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasAnalyzed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStatsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    xp?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.IntFieldUpdateOperationsInput | number;
    streak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastTransactionAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    totalIncome?: Prisma.IntFieldUpdateOperationsInput | number;
    totalExpense?: Prisma.IntFieldUpdateOperationsInput | number;
    hasExported?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasAnalyzed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStatsNullableScalarRelationFilter = {
    is?: Prisma.UserStatsWhereInput | null;
    isNot?: Prisma.UserStatsWhereInput | null;
};
export type UserStatsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastTransactionAt?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
    hasExported?: Prisma.SortOrder;
    hasAnalyzed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserStatsAvgOrderByAggregateInput = {
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
};
export type UserStatsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastTransactionAt?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
    hasExported?: Prisma.SortOrder;
    hasAnalyzed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserStatsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    lastTransactionAt?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
    hasExported?: Prisma.SortOrder;
    hasAnalyzed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserStatsSumOrderByAggregateInput = {
    xp?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    streak?: Prisma.SortOrder;
    longestStreak?: Prisma.SortOrder;
    totalTransactions?: Prisma.SortOrder;
    totalIncome?: Prisma.SortOrder;
    totalExpense?: Prisma.SortOrder;
};
export type UserStatsCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserStatsCreateWithoutUserInput, Prisma.UserStatsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStatsCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserStatsWhereUniqueInput;
};
export type UserStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserStatsCreateWithoutUserInput, Prisma.UserStatsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStatsCreateOrConnectWithoutUserInput;
    connect?: Prisma.UserStatsWhereUniqueInput;
};
export type UserStatsUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserStatsCreateWithoutUserInput, Prisma.UserStatsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStatsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserStatsUpsertWithoutUserInput;
    disconnect?: Prisma.UserStatsWhereInput | boolean;
    delete?: Prisma.UserStatsWhereInput | boolean;
    connect?: Prisma.UserStatsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserStatsUpdateToOneWithWhereWithoutUserInput, Prisma.UserStatsUpdateWithoutUserInput>, Prisma.UserStatsUncheckedUpdateWithoutUserInput>;
};
export type UserStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserStatsCreateWithoutUserInput, Prisma.UserStatsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.UserStatsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.UserStatsUpsertWithoutUserInput;
    disconnect?: Prisma.UserStatsWhereInput | boolean;
    delete?: Prisma.UserStatsWhereInput | boolean;
    connect?: Prisma.UserStatsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserStatsUpdateToOneWithWhereWithoutUserInput, Prisma.UserStatsUpdateWithoutUserInput>, Prisma.UserStatsUncheckedUpdateWithoutUserInput>;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type UserStatsCreateWithoutUserInput = {
    id?: string;
    xp?: number;
    level?: number;
    streak?: number;
    longestStreak?: number;
    lastTransactionAt?: Date | string | null;
    totalTransactions?: number;
    totalIncome?: number;
    totalExpense?: number;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserStatsUncheckedCreateWithoutUserInput = {
    id?: string;
    xp?: number;
    level?: number;
    streak?: number;
    longestStreak?: number;
    lastTransactionAt?: Date | string | null;
    totalTransactions?: number;
    totalIncome?: number;
    totalExpense?: number;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserStatsCreateOrConnectWithoutUserInput = {
    where: Prisma.UserStatsWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserStatsCreateWithoutUserInput, Prisma.UserStatsUncheckedCreateWithoutUserInput>;
};
export type UserStatsUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.UserStatsUpdateWithoutUserInput, Prisma.UserStatsUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserStatsCreateWithoutUserInput, Prisma.UserStatsUncheckedCreateWithoutUserInput>;
    where?: Prisma.UserStatsWhereInput;
};
export type UserStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.UserStatsWhereInput;
    data: Prisma.XOR<Prisma.UserStatsUpdateWithoutUserInput, Prisma.UserStatsUncheckedUpdateWithoutUserInput>;
};
export type UserStatsUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    xp?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.IntFieldUpdateOperationsInput | number;
    streak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastTransactionAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    totalIncome?: Prisma.IntFieldUpdateOperationsInput | number;
    totalExpense?: Prisma.IntFieldUpdateOperationsInput | number;
    hasExported?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasAnalyzed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStatsUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    xp?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.IntFieldUpdateOperationsInput | number;
    streak?: Prisma.IntFieldUpdateOperationsInput | number;
    longestStreak?: Prisma.IntFieldUpdateOperationsInput | number;
    lastTransactionAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalTransactions?: Prisma.IntFieldUpdateOperationsInput | number;
    totalIncome?: Prisma.IntFieldUpdateOperationsInput | number;
    totalExpense?: Prisma.IntFieldUpdateOperationsInput | number;
    hasExported?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasAnalyzed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserStatsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    xp?: boolean;
    level?: boolean;
    streak?: boolean;
    longestStreak?: boolean;
    lastTransactionAt?: boolean;
    totalTransactions?: boolean;
    totalIncome?: boolean;
    totalExpense?: boolean;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userStats"]>;
export type UserStatsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    xp?: boolean;
    level?: boolean;
    streak?: boolean;
    longestStreak?: boolean;
    lastTransactionAt?: boolean;
    totalTransactions?: boolean;
    totalIncome?: boolean;
    totalExpense?: boolean;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userStats"]>;
export type UserStatsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    xp?: boolean;
    level?: boolean;
    streak?: boolean;
    longestStreak?: boolean;
    lastTransactionAt?: boolean;
    totalTransactions?: boolean;
    totalIncome?: boolean;
    totalExpense?: boolean;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userStats"]>;
export type UserStatsSelectScalar = {
    id?: boolean;
    userId?: boolean;
    xp?: boolean;
    level?: boolean;
    streak?: boolean;
    longestStreak?: boolean;
    lastTransactionAt?: boolean;
    totalTransactions?: boolean;
    totalIncome?: boolean;
    totalExpense?: boolean;
    hasExported?: boolean;
    hasAnalyzed?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserStatsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "xp" | "level" | "streak" | "longestStreak" | "lastTransactionAt" | "totalTransactions" | "totalIncome" | "totalExpense" | "hasExported" | "hasAnalyzed" | "createdAt" | "updatedAt", ExtArgs["result"]["userStats"]>;
export type UserStatsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserStatsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserStatsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserStatsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserStats";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        xp: number;
        level: number;
        streak: number;
        longestStreak: number;
        lastTransactionAt: Date | null;
        totalTransactions: number;
        totalIncome: number;
        totalExpense: number;
        hasExported: boolean;
        hasAnalyzed: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userStats"]>;
    composites: {};
};
export type UserStatsGetPayload<S extends boolean | null | undefined | UserStatsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserStatsPayload, S>;
export type UserStatsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserStatsCountAggregateInputType | true;
};
export interface UserStatsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserStats'];
        meta: {
            name: 'UserStats';
        };
    };
    findUnique<T extends UserStatsFindUniqueArgs>(args: Prisma.SelectSubset<T, UserStatsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserStatsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserStatsFindFirstArgs>(args?: Prisma.SelectSubset<T, UserStatsFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserStatsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserStatsFindManyArgs>(args?: Prisma.SelectSubset<T, UserStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserStatsCreateArgs>(args: Prisma.SelectSubset<T, UserStatsCreateArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserStatsCreateManyArgs>(args?: Prisma.SelectSubset<T, UserStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserStatsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserStatsDeleteArgs>(args: Prisma.SelectSubset<T, UserStatsDeleteArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserStatsUpdateArgs>(args: Prisma.SelectSubset<T, UserStatsUpdateArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserStatsDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserStatsUpdateManyArgs>(args: Prisma.SelectSubset<T, UserStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserStatsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserStatsUpsertArgs>(args: Prisma.SelectSubset<T, UserStatsUpsertArgs<ExtArgs>>): Prisma.Prisma__UserStatsClient<runtime.Types.Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserStatsCountArgs>(args?: Prisma.Subset<T, UserStatsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserStatsCountAggregateOutputType> : number>;
    aggregate<T extends UserStatsAggregateArgs>(args: Prisma.Subset<T, UserStatsAggregateArgs>): Prisma.PrismaPromise<GetUserStatsAggregateType<T>>;
    groupBy<T extends UserStatsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserStatsGroupByArgs['orderBy'];
    } : {
        orderBy?: UserStatsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserStatsFieldRefs;
}
export interface Prisma__UserStatsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserStatsFieldRefs {
    readonly id: Prisma.FieldRef<"UserStats", 'String'>;
    readonly userId: Prisma.FieldRef<"UserStats", 'String'>;
    readonly xp: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly level: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly streak: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly longestStreak: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly lastTransactionAt: Prisma.FieldRef<"UserStats", 'DateTime'>;
    readonly totalTransactions: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly totalIncome: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly totalExpense: Prisma.FieldRef<"UserStats", 'Int'>;
    readonly hasExported: Prisma.FieldRef<"UserStats", 'Boolean'>;
    readonly hasAnalyzed: Prisma.FieldRef<"UserStats", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"UserStats", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserStats", 'DateTime'>;
}
export type UserStatsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where: Prisma.UserStatsWhereUniqueInput;
};
export type UserStatsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where: Prisma.UserStatsWhereUniqueInput;
};
export type UserStatsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where?: Prisma.UserStatsWhereInput;
    orderBy?: Prisma.UserStatsOrderByWithRelationInput | Prisma.UserStatsOrderByWithRelationInput[];
    cursor?: Prisma.UserStatsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserStatsScalarFieldEnum | Prisma.UserStatsScalarFieldEnum[];
};
export type UserStatsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where?: Prisma.UserStatsWhereInput;
    orderBy?: Prisma.UserStatsOrderByWithRelationInput | Prisma.UserStatsOrderByWithRelationInput[];
    cursor?: Prisma.UserStatsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserStatsScalarFieldEnum | Prisma.UserStatsScalarFieldEnum[];
};
export type UserStatsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where?: Prisma.UserStatsWhereInput;
    orderBy?: Prisma.UserStatsOrderByWithRelationInput | Prisma.UserStatsOrderByWithRelationInput[];
    cursor?: Prisma.UserStatsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserStatsScalarFieldEnum | Prisma.UserStatsScalarFieldEnum[];
};
export type UserStatsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserStatsCreateInput, Prisma.UserStatsUncheckedCreateInput>;
};
export type UserStatsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserStatsCreateManyInput | Prisma.UserStatsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserStatsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    data: Prisma.UserStatsCreateManyInput | Prisma.UserStatsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserStatsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserStatsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserStatsUpdateInput, Prisma.UserStatsUncheckedUpdateInput>;
    where: Prisma.UserStatsWhereUniqueInput;
};
export type UserStatsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserStatsUpdateManyMutationInput, Prisma.UserStatsUncheckedUpdateManyInput>;
    where?: Prisma.UserStatsWhereInput;
    limit?: number;
};
export type UserStatsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserStatsUpdateManyMutationInput, Prisma.UserStatsUncheckedUpdateManyInput>;
    where?: Prisma.UserStatsWhereInput;
    limit?: number;
    include?: Prisma.UserStatsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserStatsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where: Prisma.UserStatsWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserStatsCreateInput, Prisma.UserStatsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserStatsUpdateInput, Prisma.UserStatsUncheckedUpdateInput>;
};
export type UserStatsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
    where: Prisma.UserStatsWhereUniqueInput;
};
export type UserStatsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserStatsWhereInput;
    limit?: number;
};
export type UserStatsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserStatsSelect<ExtArgs> | null;
    omit?: Prisma.UserStatsOmit<ExtArgs> | null;
    include?: Prisma.UserStatsInclude<ExtArgs> | null;
};
//# sourceMappingURL=UserStats.d.ts.map