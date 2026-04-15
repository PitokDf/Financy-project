import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ChallengeModel = runtime.Types.Result.DefaultSelection<Prisma.$ChallengePayload>;
export type AggregateChallenge = {
    _count: ChallengeCountAggregateOutputType | null;
    _avg: ChallengeAvgAggregateOutputType | null;
    _sum: ChallengeSumAggregateOutputType | null;
    _min: ChallengeMinAggregateOutputType | null;
    _max: ChallengeMaxAggregateOutputType | null;
};
export type ChallengeAvgAggregateOutputType = {
    target: number | null;
    xpReward: number | null;
};
export type ChallengeSumAggregateOutputType = {
    target: number | null;
    xpReward: number | null;
};
export type ChallengeMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    target: number | null;
    xpReward: number | null;
    type: $Enums.ChallengeType | null;
    createdAt: Date | null;
};
export type ChallengeMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    target: number | null;
    xpReward: number | null;
    type: $Enums.ChallengeType | null;
    createdAt: Date | null;
};
export type ChallengeCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    target: number;
    xpReward: number;
    type: number;
    createdAt: number;
    _all: number;
};
export type ChallengeAvgAggregateInputType = {
    target?: true;
    xpReward?: true;
};
export type ChallengeSumAggregateInputType = {
    target?: true;
    xpReward?: true;
};
export type ChallengeMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    target?: true;
    xpReward?: true;
    type?: true;
    createdAt?: true;
};
export type ChallengeMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    target?: true;
    xpReward?: true;
    type?: true;
    createdAt?: true;
};
export type ChallengeCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    target?: true;
    xpReward?: true;
    type?: true;
    createdAt?: true;
    _all?: true;
};
export type ChallengeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChallengeWhereInput;
    orderBy?: Prisma.ChallengeOrderByWithRelationInput | Prisma.ChallengeOrderByWithRelationInput[];
    cursor?: Prisma.ChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChallengeCountAggregateInputType;
    _avg?: ChallengeAvgAggregateInputType;
    _sum?: ChallengeSumAggregateInputType;
    _min?: ChallengeMinAggregateInputType;
    _max?: ChallengeMaxAggregateInputType;
};
export type GetChallengeAggregateType<T extends ChallengeAggregateArgs> = {
    [P in keyof T & keyof AggregateChallenge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChallenge[P]> : Prisma.GetScalarType<T[P], AggregateChallenge[P]>;
};
export type ChallengeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChallengeWhereInput;
    orderBy?: Prisma.ChallengeOrderByWithAggregationInput | Prisma.ChallengeOrderByWithAggregationInput[];
    by: Prisma.ChallengeScalarFieldEnum[] | Prisma.ChallengeScalarFieldEnum;
    having?: Prisma.ChallengeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChallengeCountAggregateInputType | true;
    _avg?: ChallengeAvgAggregateInputType;
    _sum?: ChallengeSumAggregateInputType;
    _min?: ChallengeMinAggregateInputType;
    _max?: ChallengeMaxAggregateInputType;
};
export type ChallengeGroupByOutputType = {
    id: string;
    title: string;
    description: string;
    target: number;
    xpReward: number;
    type: $Enums.ChallengeType;
    createdAt: Date;
    _count: ChallengeCountAggregateOutputType | null;
    _avg: ChallengeAvgAggregateOutputType | null;
    _sum: ChallengeSumAggregateOutputType | null;
    _min: ChallengeMinAggregateOutputType | null;
    _max: ChallengeMaxAggregateOutputType | null;
};
export type GetChallengeGroupByPayload<T extends ChallengeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChallengeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChallengeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChallengeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChallengeGroupByOutputType[P]>;
}>>;
export type ChallengeWhereInput = {
    AND?: Prisma.ChallengeWhereInput | Prisma.ChallengeWhereInput[];
    OR?: Prisma.ChallengeWhereInput[];
    NOT?: Prisma.ChallengeWhereInput | Prisma.ChallengeWhereInput[];
    id?: Prisma.StringFilter<"Challenge"> | string;
    title?: Prisma.StringFilter<"Challenge"> | string;
    description?: Prisma.StringFilter<"Challenge"> | string;
    target?: Prisma.IntFilter<"Challenge"> | number;
    xpReward?: Prisma.IntFilter<"Challenge"> | number;
    type?: Prisma.EnumChallengeTypeFilter<"Challenge"> | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFilter<"Challenge"> | Date | string;
    userChallenges?: Prisma.UserChallengeListRelationFilter;
};
export type ChallengeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    userChallenges?: Prisma.UserChallengeOrderByRelationAggregateInput;
};
export type ChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ChallengeWhereInput | Prisma.ChallengeWhereInput[];
    OR?: Prisma.ChallengeWhereInput[];
    NOT?: Prisma.ChallengeWhereInput | Prisma.ChallengeWhereInput[];
    title?: Prisma.StringFilter<"Challenge"> | string;
    description?: Prisma.StringFilter<"Challenge"> | string;
    target?: Prisma.IntFilter<"Challenge"> | number;
    xpReward?: Prisma.IntFilter<"Challenge"> | number;
    type?: Prisma.EnumChallengeTypeFilter<"Challenge"> | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFilter<"Challenge"> | Date | string;
    userChallenges?: Prisma.UserChallengeListRelationFilter;
}, "id">;
export type ChallengeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ChallengeCountOrderByAggregateInput;
    _avg?: Prisma.ChallengeAvgOrderByAggregateInput;
    _max?: Prisma.ChallengeMaxOrderByAggregateInput;
    _min?: Prisma.ChallengeMinOrderByAggregateInput;
    _sum?: Prisma.ChallengeSumOrderByAggregateInput;
};
export type ChallengeScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChallengeScalarWhereWithAggregatesInput | Prisma.ChallengeScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChallengeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChallengeScalarWhereWithAggregatesInput | Prisma.ChallengeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Challenge"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Challenge"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Challenge"> | string;
    target?: Prisma.IntWithAggregatesFilter<"Challenge"> | number;
    xpReward?: Prisma.IntWithAggregatesFilter<"Challenge"> | number;
    type?: Prisma.EnumChallengeTypeWithAggregatesFilter<"Challenge"> | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Challenge"> | Date | string;
};
export type ChallengeCreateInput = {
    id?: string;
    title: string;
    description: string;
    target: number;
    xpReward?: number;
    type?: $Enums.ChallengeType;
    createdAt?: Date | string;
    userChallenges?: Prisma.UserChallengeCreateNestedManyWithoutChallengeInput;
};
export type ChallengeUncheckedCreateInput = {
    id?: string;
    title: string;
    description: string;
    target: number;
    xpReward?: number;
    type?: $Enums.ChallengeType;
    createdAt?: Date | string;
    userChallenges?: Prisma.UserChallengeUncheckedCreateNestedManyWithoutChallengeInput;
};
export type ChallengeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    target?: Prisma.IntFieldUpdateOperationsInput | number;
    xpReward?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumChallengeTypeFieldUpdateOperationsInput | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userChallenges?: Prisma.UserChallengeUpdateManyWithoutChallengeNestedInput;
};
export type ChallengeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    target?: Prisma.IntFieldUpdateOperationsInput | number;
    xpReward?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumChallengeTypeFieldUpdateOperationsInput | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userChallenges?: Prisma.UserChallengeUncheckedUpdateManyWithoutChallengeNestedInput;
};
export type ChallengeCreateManyInput = {
    id?: string;
    title: string;
    description: string;
    target: number;
    xpReward?: number;
    type?: $Enums.ChallengeType;
    createdAt?: Date | string;
};
export type ChallengeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    target?: Prisma.IntFieldUpdateOperationsInput | number;
    xpReward?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumChallengeTypeFieldUpdateOperationsInput | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    target?: Prisma.IntFieldUpdateOperationsInput | number;
    xpReward?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumChallengeTypeFieldUpdateOperationsInput | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChallengeAvgOrderByAggregateInput = {
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
};
export type ChallengeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChallengeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChallengeSumOrderByAggregateInput = {
    target?: Prisma.SortOrder;
    xpReward?: Prisma.SortOrder;
};
export type ChallengeScalarRelationFilter = {
    is?: Prisma.ChallengeWhereInput;
    isNot?: Prisma.ChallengeWhereInput;
};
export type EnumChallengeTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChallengeType;
};
export type ChallengeCreateNestedOneWithoutUserChallengesInput = {
    create?: Prisma.XOR<Prisma.ChallengeCreateWithoutUserChallengesInput, Prisma.ChallengeUncheckedCreateWithoutUserChallengesInput>;
    connectOrCreate?: Prisma.ChallengeCreateOrConnectWithoutUserChallengesInput;
    connect?: Prisma.ChallengeWhereUniqueInput;
};
export type ChallengeUpdateOneRequiredWithoutUserChallengesNestedInput = {
    create?: Prisma.XOR<Prisma.ChallengeCreateWithoutUserChallengesInput, Prisma.ChallengeUncheckedCreateWithoutUserChallengesInput>;
    connectOrCreate?: Prisma.ChallengeCreateOrConnectWithoutUserChallengesInput;
    upsert?: Prisma.ChallengeUpsertWithoutUserChallengesInput;
    connect?: Prisma.ChallengeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChallengeUpdateToOneWithWhereWithoutUserChallengesInput, Prisma.ChallengeUpdateWithoutUserChallengesInput>, Prisma.ChallengeUncheckedUpdateWithoutUserChallengesInput>;
};
export type ChallengeCreateWithoutUserChallengesInput = {
    id?: string;
    title: string;
    description: string;
    target: number;
    xpReward?: number;
    type?: $Enums.ChallengeType;
    createdAt?: Date | string;
};
export type ChallengeUncheckedCreateWithoutUserChallengesInput = {
    id?: string;
    title: string;
    description: string;
    target: number;
    xpReward?: number;
    type?: $Enums.ChallengeType;
    createdAt?: Date | string;
};
export type ChallengeCreateOrConnectWithoutUserChallengesInput = {
    where: Prisma.ChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChallengeCreateWithoutUserChallengesInput, Prisma.ChallengeUncheckedCreateWithoutUserChallengesInput>;
};
export type ChallengeUpsertWithoutUserChallengesInput = {
    update: Prisma.XOR<Prisma.ChallengeUpdateWithoutUserChallengesInput, Prisma.ChallengeUncheckedUpdateWithoutUserChallengesInput>;
    create: Prisma.XOR<Prisma.ChallengeCreateWithoutUserChallengesInput, Prisma.ChallengeUncheckedCreateWithoutUserChallengesInput>;
    where?: Prisma.ChallengeWhereInput;
};
export type ChallengeUpdateToOneWithWhereWithoutUserChallengesInput = {
    where?: Prisma.ChallengeWhereInput;
    data: Prisma.XOR<Prisma.ChallengeUpdateWithoutUserChallengesInput, Prisma.ChallengeUncheckedUpdateWithoutUserChallengesInput>;
};
export type ChallengeUpdateWithoutUserChallengesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    target?: Prisma.IntFieldUpdateOperationsInput | number;
    xpReward?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumChallengeTypeFieldUpdateOperationsInput | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeUncheckedUpdateWithoutUserChallengesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    target?: Prisma.IntFieldUpdateOperationsInput | number;
    xpReward?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumChallengeTypeFieldUpdateOperationsInput | $Enums.ChallengeType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeCountOutputType = {
    userChallenges: number;
};
export type ChallengeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userChallenges?: boolean | ChallengeCountOutputTypeCountUserChallengesArgs;
};
export type ChallengeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeCountOutputTypeSelect<ExtArgs> | null;
};
export type ChallengeCountOutputTypeCountUserChallengesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserChallengeWhereInput;
};
export type ChallengeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    target?: boolean;
    xpReward?: boolean;
    type?: boolean;
    createdAt?: boolean;
    userChallenges?: boolean | Prisma.Challenge$userChallengesArgs<ExtArgs>;
    _count?: boolean | Prisma.ChallengeCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["challenge"]>;
export type ChallengeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    target?: boolean;
    xpReward?: boolean;
    type?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["challenge"]>;
export type ChallengeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    target?: boolean;
    xpReward?: boolean;
    type?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["challenge"]>;
export type ChallengeSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    target?: boolean;
    xpReward?: boolean;
    type?: boolean;
    createdAt?: boolean;
};
export type ChallengeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "target" | "xpReward" | "type" | "createdAt", ExtArgs["result"]["challenge"]>;
export type ChallengeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userChallenges?: boolean | Prisma.Challenge$userChallengesArgs<ExtArgs>;
    _count?: boolean | Prisma.ChallengeCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ChallengeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ChallengeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ChallengePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Challenge";
    objects: {
        userChallenges: Prisma.$UserChallengePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string;
        target: number;
        xpReward: number;
        type: $Enums.ChallengeType;
        createdAt: Date;
    }, ExtArgs["result"]["challenge"]>;
    composites: {};
};
export type ChallengeGetPayload<S extends boolean | null | undefined | ChallengeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChallengePayload, S>;
export type ChallengeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChallengeCountAggregateInputType | true;
};
export interface ChallengeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Challenge'];
        meta: {
            name: 'Challenge';
        };
    };
    findUnique<T extends ChallengeFindUniqueArgs>(args: Prisma.SelectSubset<T, ChallengeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChallengeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChallengeFindFirstArgs>(args?: Prisma.SelectSubset<T, ChallengeFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChallengeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChallengeFindManyArgs>(args?: Prisma.SelectSubset<T, ChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChallengeCreateArgs>(args: Prisma.SelectSubset<T, ChallengeCreateArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChallengeCreateManyArgs>(args?: Prisma.SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChallengeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChallengeDeleteArgs>(args: Prisma.SelectSubset<T, ChallengeDeleteArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChallengeUpdateArgs>(args: Prisma.SelectSubset<T, ChallengeUpdateArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChallengeDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChallengeUpdateManyArgs>(args: Prisma.SelectSubset<T, ChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChallengeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChallengeUpsertArgs>(args: Prisma.SelectSubset<T, ChallengeUpsertArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChallengeCountArgs>(args?: Prisma.Subset<T, ChallengeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChallengeCountAggregateOutputType> : number>;
    aggregate<T extends ChallengeAggregateArgs>(args: Prisma.Subset<T, ChallengeAggregateArgs>): Prisma.PrismaPromise<GetChallengeAggregateType<T>>;
    groupBy<T extends ChallengeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChallengeGroupByArgs['orderBy'];
    } : {
        orderBy?: ChallengeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChallengeFieldRefs;
}
export interface Prisma__ChallengeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userChallenges<T extends Prisma.Challenge$userChallengesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Challenge$userChallengesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChallengeFieldRefs {
    readonly id: Prisma.FieldRef<"Challenge", 'String'>;
    readonly title: Prisma.FieldRef<"Challenge", 'String'>;
    readonly description: Prisma.FieldRef<"Challenge", 'String'>;
    readonly target: Prisma.FieldRef<"Challenge", 'Int'>;
    readonly xpReward: Prisma.FieldRef<"Challenge", 'Int'>;
    readonly type: Prisma.FieldRef<"Challenge", 'ChallengeType'>;
    readonly createdAt: Prisma.FieldRef<"Challenge", 'DateTime'>;
}
export type ChallengeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where: Prisma.ChallengeWhereUniqueInput;
};
export type ChallengeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where: Prisma.ChallengeWhereUniqueInput;
};
export type ChallengeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where?: Prisma.ChallengeWhereInput;
    orderBy?: Prisma.ChallengeOrderByWithRelationInput | Prisma.ChallengeOrderByWithRelationInput[];
    cursor?: Prisma.ChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChallengeScalarFieldEnum | Prisma.ChallengeScalarFieldEnum[];
};
export type ChallengeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where?: Prisma.ChallengeWhereInput;
    orderBy?: Prisma.ChallengeOrderByWithRelationInput | Prisma.ChallengeOrderByWithRelationInput[];
    cursor?: Prisma.ChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChallengeScalarFieldEnum | Prisma.ChallengeScalarFieldEnum[];
};
export type ChallengeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where?: Prisma.ChallengeWhereInput;
    orderBy?: Prisma.ChallengeOrderByWithRelationInput | Prisma.ChallengeOrderByWithRelationInput[];
    cursor?: Prisma.ChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChallengeScalarFieldEnum | Prisma.ChallengeScalarFieldEnum[];
};
export type ChallengeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChallengeCreateInput, Prisma.ChallengeUncheckedCreateInput>;
};
export type ChallengeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChallengeCreateManyInput | Prisma.ChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChallengeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    data: Prisma.ChallengeCreateManyInput | Prisma.ChallengeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChallengeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChallengeUpdateInput, Prisma.ChallengeUncheckedUpdateInput>;
    where: Prisma.ChallengeWhereUniqueInput;
};
export type ChallengeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChallengeUpdateManyMutationInput, Prisma.ChallengeUncheckedUpdateManyInput>;
    where?: Prisma.ChallengeWhereInput;
    limit?: number;
};
export type ChallengeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChallengeUpdateManyMutationInput, Prisma.ChallengeUncheckedUpdateManyInput>;
    where?: Prisma.ChallengeWhereInput;
    limit?: number;
};
export type ChallengeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where: Prisma.ChallengeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChallengeCreateInput, Prisma.ChallengeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChallengeUpdateInput, Prisma.ChallengeUncheckedUpdateInput>;
};
export type ChallengeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where: Prisma.ChallengeWhereUniqueInput;
};
export type ChallengeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChallengeWhereInput;
    limit?: number;
};
export type Challenge$userChallengesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChallengeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
};
//# sourceMappingURL=Challenge.d.ts.map