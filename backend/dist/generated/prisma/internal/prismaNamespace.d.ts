import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly UserStats: "UserStats";
    readonly Badge: "Badge";
    readonly UserBadge: "UserBadge";
    readonly Challenge: "Challenge";
    readonly UserChallenge: "UserChallenge";
    readonly Transaction: "Transaction";
    readonly Category: "Category";
    readonly BudgetGoal: "BudgetGoal";
    readonly Cluster: "Cluster";
    readonly Notification: "Notification";
    readonly ActivityLog: "ActivityLog";
    readonly CsvImport: "CsvImport";
    readonly ExportLog: "ExportLog";
    readonly ForecastCache: "ForecastCache";
    readonly Forecast: "Forecast";
    readonly RecommendationLog: "RecommendationLog";
    readonly CategoryFeedbackEvent: "CategoryFeedbackEvent";
    readonly AnalysisRun: "AnalysisRun";
    readonly UserSetting: "UserSetting";
    readonly ReminderConfig: "ReminderConfig";
    readonly PushSubscription: "PushSubscription";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "userStats" | "badge" | "userBadge" | "challenge" | "userChallenge" | "transaction" | "category" | "budgetGoal" | "cluster" | "notification" | "activityLog" | "csvImport" | "exportLog" | "forecastCache" | "forecast" | "recommendationLog" | "categoryFeedbackEvent" | "analysisRun" | "userSetting" | "reminderConfig" | "pushSubscription";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        UserStats: {
            payload: Prisma.$UserStatsPayload<ExtArgs>;
            fields: Prisma.UserStatsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserStatsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserStatsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>;
                };
                findFirst: {
                    args: Prisma.UserStatsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserStatsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>;
                };
                findMany: {
                    args: Prisma.UserStatsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>[];
                };
                create: {
                    args: Prisma.UserStatsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>;
                };
                createMany: {
                    args: Prisma.UserStatsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserStatsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>[];
                };
                delete: {
                    args: Prisma.UserStatsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>;
                };
                update: {
                    args: Prisma.UserStatsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>;
                };
                deleteMany: {
                    args: Prisma.UserStatsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserStatsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserStatsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>[];
                };
                upsert: {
                    args: Prisma.UserStatsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserStatsPayload>;
                };
                aggregate: {
                    args: Prisma.UserStatsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserStats>;
                };
                groupBy: {
                    args: Prisma.UserStatsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserStatsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserStatsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserStatsCountAggregateOutputType> | number;
                };
            };
        };
        Badge: {
            payload: Prisma.$BadgePayload<ExtArgs>;
            fields: Prisma.BadgeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BadgeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BadgeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>;
                };
                findFirst: {
                    args: Prisma.BadgeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BadgeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>;
                };
                findMany: {
                    args: Prisma.BadgeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>[];
                };
                create: {
                    args: Prisma.BadgeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>;
                };
                createMany: {
                    args: Prisma.BadgeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BadgeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>[];
                };
                delete: {
                    args: Prisma.BadgeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>;
                };
                update: {
                    args: Prisma.BadgeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>;
                };
                deleteMany: {
                    args: Prisma.BadgeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BadgeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BadgeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>[];
                };
                upsert: {
                    args: Prisma.BadgeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BadgePayload>;
                };
                aggregate: {
                    args: Prisma.BadgeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBadge>;
                };
                groupBy: {
                    args: Prisma.BadgeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BadgeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BadgeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BadgeCountAggregateOutputType> | number;
                };
            };
        };
        UserBadge: {
            payload: Prisma.$UserBadgePayload<ExtArgs>;
            fields: Prisma.UserBadgeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserBadgeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserBadgeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>;
                };
                findFirst: {
                    args: Prisma.UserBadgeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserBadgeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>;
                };
                findMany: {
                    args: Prisma.UserBadgeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>[];
                };
                create: {
                    args: Prisma.UserBadgeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>;
                };
                createMany: {
                    args: Prisma.UserBadgeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserBadgeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>[];
                };
                delete: {
                    args: Prisma.UserBadgeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>;
                };
                update: {
                    args: Prisma.UserBadgeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>;
                };
                deleteMany: {
                    args: Prisma.UserBadgeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserBadgeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserBadgeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>[];
                };
                upsert: {
                    args: Prisma.UserBadgeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserBadgePayload>;
                };
                aggregate: {
                    args: Prisma.UserBadgeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserBadge>;
                };
                groupBy: {
                    args: Prisma.UserBadgeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserBadgeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserBadgeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserBadgeCountAggregateOutputType> | number;
                };
            };
        };
        Challenge: {
            payload: Prisma.$ChallengePayload<ExtArgs>;
            fields: Prisma.ChallengeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChallengeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                findFirst: {
                    args: Prisma.ChallengeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                findMany: {
                    args: Prisma.ChallengeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>[];
                };
                create: {
                    args: Prisma.ChallengeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                createMany: {
                    args: Prisma.ChallengeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>[];
                };
                delete: {
                    args: Prisma.ChallengeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                update: {
                    args: Prisma.ChallengeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                deleteMany: {
                    args: Prisma.ChallengeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChallengeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChallengeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>[];
                };
                upsert: {
                    args: Prisma.ChallengeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                aggregate: {
                    args: Prisma.ChallengeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChallenge>;
                };
                groupBy: {
                    args: Prisma.ChallengeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChallengeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChallengeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChallengeCountAggregateOutputType> | number;
                };
            };
        };
        UserChallenge: {
            payload: Prisma.$UserChallengePayload<ExtArgs>;
            fields: Prisma.UserChallengeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserChallengeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserChallengeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>;
                };
                findFirst: {
                    args: Prisma.UserChallengeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserChallengeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>;
                };
                findMany: {
                    args: Prisma.UserChallengeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>[];
                };
                create: {
                    args: Prisma.UserChallengeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>;
                };
                createMany: {
                    args: Prisma.UserChallengeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserChallengeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>[];
                };
                delete: {
                    args: Prisma.UserChallengeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>;
                };
                update: {
                    args: Prisma.UserChallengeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>;
                };
                deleteMany: {
                    args: Prisma.UserChallengeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserChallengeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserChallengeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>[];
                };
                upsert: {
                    args: Prisma.UserChallengeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserChallengePayload>;
                };
                aggregate: {
                    args: Prisma.UserChallengeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserChallenge>;
                };
                groupBy: {
                    args: Prisma.UserChallengeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserChallengeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserChallengeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserChallengeCountAggregateOutputType> | number;
                };
            };
        };
        Transaction: {
            payload: Prisma.$TransactionPayload<ExtArgs>;
            fields: Prisma.TransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>;
                };
                findFirst: {
                    args: Prisma.TransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>;
                };
                findMany: {
                    args: Prisma.TransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>[];
                };
                create: {
                    args: Prisma.TransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>;
                };
                createMany: {
                    args: Prisma.TransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>[];
                };
                delete: {
                    args: Prisma.TransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>;
                };
                update: {
                    args: Prisma.TransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.TransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>[];
                };
                upsert: {
                    args: Prisma.TransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransactionPayload>;
                };
                aggregate: {
                    args: Prisma.TransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTransaction>;
                };
                groupBy: {
                    args: Prisma.TransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TransactionCountAggregateOutputType> | number;
                };
            };
        };
        Category: {
            payload: Prisma.$CategoryPayload<ExtArgs>;
            fields: Prisma.CategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                create: {
                    args: Prisma.CategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                createMany: {
                    args: Prisma.CategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                delete: {
                    args: Prisma.CategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                update: {
                    args: Prisma.CategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                upsert: {
                    args: Prisma.CategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategory>;
                };
                groupBy: {
                    args: Prisma.CategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryCountAggregateOutputType> | number;
                };
            };
        };
        BudgetGoal: {
            payload: Prisma.$BudgetGoalPayload<ExtArgs>;
            fields: Prisma.BudgetGoalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BudgetGoalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BudgetGoalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>;
                };
                findFirst: {
                    args: Prisma.BudgetGoalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BudgetGoalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>;
                };
                findMany: {
                    args: Prisma.BudgetGoalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>[];
                };
                create: {
                    args: Prisma.BudgetGoalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>;
                };
                createMany: {
                    args: Prisma.BudgetGoalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BudgetGoalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>[];
                };
                delete: {
                    args: Prisma.BudgetGoalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>;
                };
                update: {
                    args: Prisma.BudgetGoalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>;
                };
                deleteMany: {
                    args: Prisma.BudgetGoalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BudgetGoalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BudgetGoalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>[];
                };
                upsert: {
                    args: Prisma.BudgetGoalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetGoalPayload>;
                };
                aggregate: {
                    args: Prisma.BudgetGoalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBudgetGoal>;
                };
                groupBy: {
                    args: Prisma.BudgetGoalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BudgetGoalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BudgetGoalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BudgetGoalCountAggregateOutputType> | number;
                };
            };
        };
        Cluster: {
            payload: Prisma.$ClusterPayload<ExtArgs>;
            fields: Prisma.ClusterFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ClusterFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ClusterFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>;
                };
                findFirst: {
                    args: Prisma.ClusterFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ClusterFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>;
                };
                findMany: {
                    args: Prisma.ClusterFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>[];
                };
                create: {
                    args: Prisma.ClusterCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>;
                };
                createMany: {
                    args: Prisma.ClusterCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ClusterCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>[];
                };
                delete: {
                    args: Prisma.ClusterDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>;
                };
                update: {
                    args: Prisma.ClusterUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>;
                };
                deleteMany: {
                    args: Prisma.ClusterDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ClusterUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ClusterUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>[];
                };
                upsert: {
                    args: Prisma.ClusterUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClusterPayload>;
                };
                aggregate: {
                    args: Prisma.ClusterAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCluster>;
                };
                groupBy: {
                    args: Prisma.ClusterGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClusterGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ClusterCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClusterCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        ActivityLog: {
            payload: Prisma.$ActivityLogPayload<ExtArgs>;
            fields: Prisma.ActivityLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>;
                };
                findFirst: {
                    args: Prisma.ActivityLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>;
                };
                findMany: {
                    args: Prisma.ActivityLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>[];
                };
                create: {
                    args: Prisma.ActivityLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>;
                };
                createMany: {
                    args: Prisma.ActivityLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>[];
                };
                delete: {
                    args: Prisma.ActivityLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>;
                };
                update: {
                    args: Prisma.ActivityLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>;
                };
                deleteMany: {
                    args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>[];
                };
                upsert: {
                    args: Prisma.ActivityLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActivityLogPayload>;
                };
                aggregate: {
                    args: Prisma.ActivityLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateActivityLog>;
                };
                groupBy: {
                    args: Prisma.ActivityLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActivityLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ActivityLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActivityLogCountAggregateOutputType> | number;
                };
            };
        };
        CsvImport: {
            payload: Prisma.$CsvImportPayload<ExtArgs>;
            fields: Prisma.CsvImportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CsvImportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CsvImportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>;
                };
                findFirst: {
                    args: Prisma.CsvImportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CsvImportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>;
                };
                findMany: {
                    args: Prisma.CsvImportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>[];
                };
                create: {
                    args: Prisma.CsvImportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>;
                };
                createMany: {
                    args: Prisma.CsvImportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CsvImportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>[];
                };
                delete: {
                    args: Prisma.CsvImportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>;
                };
                update: {
                    args: Prisma.CsvImportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>;
                };
                deleteMany: {
                    args: Prisma.CsvImportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CsvImportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CsvImportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>[];
                };
                upsert: {
                    args: Prisma.CsvImportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CsvImportPayload>;
                };
                aggregate: {
                    args: Prisma.CsvImportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCsvImport>;
                };
                groupBy: {
                    args: Prisma.CsvImportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CsvImportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CsvImportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CsvImportCountAggregateOutputType> | number;
                };
            };
        };
        ExportLog: {
            payload: Prisma.$ExportLogPayload<ExtArgs>;
            fields: Prisma.ExportLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExportLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExportLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>;
                };
                findFirst: {
                    args: Prisma.ExportLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExportLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>;
                };
                findMany: {
                    args: Prisma.ExportLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>[];
                };
                create: {
                    args: Prisma.ExportLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>;
                };
                createMany: {
                    args: Prisma.ExportLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExportLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>[];
                };
                delete: {
                    args: Prisma.ExportLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>;
                };
                update: {
                    args: Prisma.ExportLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>;
                };
                deleteMany: {
                    args: Prisma.ExportLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExportLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExportLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>[];
                };
                upsert: {
                    args: Prisma.ExportLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportLogPayload>;
                };
                aggregate: {
                    args: Prisma.ExportLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExportLog>;
                };
                groupBy: {
                    args: Prisma.ExportLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExportLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExportLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExportLogCountAggregateOutputType> | number;
                };
            };
        };
        ForecastCache: {
            payload: Prisma.$ForecastCachePayload<ExtArgs>;
            fields: Prisma.ForecastCacheFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ForecastCacheFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ForecastCacheFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>;
                };
                findFirst: {
                    args: Prisma.ForecastCacheFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ForecastCacheFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>;
                };
                findMany: {
                    args: Prisma.ForecastCacheFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>[];
                };
                create: {
                    args: Prisma.ForecastCacheCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>;
                };
                createMany: {
                    args: Prisma.ForecastCacheCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ForecastCacheCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>[];
                };
                delete: {
                    args: Prisma.ForecastCacheDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>;
                };
                update: {
                    args: Prisma.ForecastCacheUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>;
                };
                deleteMany: {
                    args: Prisma.ForecastCacheDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ForecastCacheUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ForecastCacheUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>[];
                };
                upsert: {
                    args: Prisma.ForecastCacheUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastCachePayload>;
                };
                aggregate: {
                    args: Prisma.ForecastCacheAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateForecastCache>;
                };
                groupBy: {
                    args: Prisma.ForecastCacheGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ForecastCacheGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ForecastCacheCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ForecastCacheCountAggregateOutputType> | number;
                };
            };
        };
        Forecast: {
            payload: Prisma.$ForecastPayload<ExtArgs>;
            fields: Prisma.ForecastFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ForecastFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ForecastFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>;
                };
                findFirst: {
                    args: Prisma.ForecastFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ForecastFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>;
                };
                findMany: {
                    args: Prisma.ForecastFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>[];
                };
                create: {
                    args: Prisma.ForecastCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>;
                };
                createMany: {
                    args: Prisma.ForecastCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ForecastCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>[];
                };
                delete: {
                    args: Prisma.ForecastDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>;
                };
                update: {
                    args: Prisma.ForecastUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>;
                };
                deleteMany: {
                    args: Prisma.ForecastDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ForecastUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ForecastUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>[];
                };
                upsert: {
                    args: Prisma.ForecastUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ForecastPayload>;
                };
                aggregate: {
                    args: Prisma.ForecastAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateForecast>;
                };
                groupBy: {
                    args: Prisma.ForecastGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ForecastGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ForecastCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ForecastCountAggregateOutputType> | number;
                };
            };
        };
        RecommendationLog: {
            payload: Prisma.$RecommendationLogPayload<ExtArgs>;
            fields: Prisma.RecommendationLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecommendationLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecommendationLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>;
                };
                findFirst: {
                    args: Prisma.RecommendationLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecommendationLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>;
                };
                findMany: {
                    args: Prisma.RecommendationLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>[];
                };
                create: {
                    args: Prisma.RecommendationLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>;
                };
                createMany: {
                    args: Prisma.RecommendationLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecommendationLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>[];
                };
                delete: {
                    args: Prisma.RecommendationLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>;
                };
                update: {
                    args: Prisma.RecommendationLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>;
                };
                deleteMany: {
                    args: Prisma.RecommendationLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecommendationLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecommendationLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>[];
                };
                upsert: {
                    args: Prisma.RecommendationLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationLogPayload>;
                };
                aggregate: {
                    args: Prisma.RecommendationLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecommendationLog>;
                };
                groupBy: {
                    args: Prisma.RecommendationLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecommendationLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecommendationLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecommendationLogCountAggregateOutputType> | number;
                };
            };
        };
        CategoryFeedbackEvent: {
            payload: Prisma.$CategoryFeedbackEventPayload<ExtArgs>;
            fields: Prisma.CategoryFeedbackEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFeedbackEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFeedbackEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFeedbackEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFeedbackEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFeedbackEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>[];
                };
                create: {
                    args: Prisma.CategoryFeedbackEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>;
                };
                createMany: {
                    args: Prisma.CategoryFeedbackEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CategoryFeedbackEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>[];
                };
                delete: {
                    args: Prisma.CategoryFeedbackEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>;
                };
                update: {
                    args: Prisma.CategoryFeedbackEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryFeedbackEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryFeedbackEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CategoryFeedbackEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>[];
                };
                upsert: {
                    args: Prisma.CategoryFeedbackEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryFeedbackEventPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryFeedbackEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategoryFeedbackEvent>;
                };
                groupBy: {
                    args: Prisma.CategoryFeedbackEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryFeedbackEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryFeedbackEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryFeedbackEventCountAggregateOutputType> | number;
                };
            };
        };
        AnalysisRun: {
            payload: Prisma.$AnalysisRunPayload<ExtArgs>;
            fields: Prisma.AnalysisRunFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AnalysisRunFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AnalysisRunFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>;
                };
                findFirst: {
                    args: Prisma.AnalysisRunFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AnalysisRunFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>;
                };
                findMany: {
                    args: Prisma.AnalysisRunFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>[];
                };
                create: {
                    args: Prisma.AnalysisRunCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>;
                };
                createMany: {
                    args: Prisma.AnalysisRunCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AnalysisRunCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>[];
                };
                delete: {
                    args: Prisma.AnalysisRunDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>;
                };
                update: {
                    args: Prisma.AnalysisRunUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>;
                };
                deleteMany: {
                    args: Prisma.AnalysisRunDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AnalysisRunUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AnalysisRunUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>[];
                };
                upsert: {
                    args: Prisma.AnalysisRunUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisRunPayload>;
                };
                aggregate: {
                    args: Prisma.AnalysisRunAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAnalysisRun>;
                };
                groupBy: {
                    args: Prisma.AnalysisRunGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnalysisRunGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AnalysisRunCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnalysisRunCountAggregateOutputType> | number;
                };
            };
        };
        UserSetting: {
            payload: Prisma.$UserSettingPayload<ExtArgs>;
            fields: Prisma.UserSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>;
                };
                findFirst: {
                    args: Prisma.UserSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>;
                };
                findMany: {
                    args: Prisma.UserSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>[];
                };
                create: {
                    args: Prisma.UserSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>;
                };
                createMany: {
                    args: Prisma.UserSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>[];
                };
                delete: {
                    args: Prisma.UserSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>;
                };
                update: {
                    args: Prisma.UserSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.UserSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>[];
                };
                upsert: {
                    args: Prisma.UserSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserSettingPayload>;
                };
                aggregate: {
                    args: Prisma.UserSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserSetting>;
                };
                groupBy: {
                    args: Prisma.UserSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserSettingCountAggregateOutputType> | number;
                };
            };
        };
        ReminderConfig: {
            payload: Prisma.$ReminderConfigPayload<ExtArgs>;
            fields: Prisma.ReminderConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReminderConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReminderConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>;
                };
                findFirst: {
                    args: Prisma.ReminderConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReminderConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>;
                };
                findMany: {
                    args: Prisma.ReminderConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>[];
                };
                create: {
                    args: Prisma.ReminderConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>;
                };
                createMany: {
                    args: Prisma.ReminderConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReminderConfigCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>[];
                };
                delete: {
                    args: Prisma.ReminderConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>;
                };
                update: {
                    args: Prisma.ReminderConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.ReminderConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReminderConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReminderConfigUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>[];
                };
                upsert: {
                    args: Prisma.ReminderConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReminderConfigPayload>;
                };
                aggregate: {
                    args: Prisma.ReminderConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReminderConfig>;
                };
                groupBy: {
                    args: Prisma.ReminderConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReminderConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReminderConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReminderConfigCountAggregateOutputType> | number;
                };
            };
        };
        PushSubscription: {
            payload: Prisma.$PushSubscriptionPayload<ExtArgs>;
            fields: Prisma.PushSubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PushSubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PushSubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.PushSubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PushSubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.PushSubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>[];
                };
                create: {
                    args: Prisma.PushSubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.PushSubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PushSubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.PushSubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>;
                };
                update: {
                    args: Prisma.PushSubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.PushSubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PushSubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PushSubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.PushSubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.PushSubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePushSubscription>;
                };
                groupBy: {
                    args: Prisma.PushSubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PushSubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PushSubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PushSubscriptionCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly avatar: "avatar";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserStatsScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly xp: "xp";
    readonly level: "level";
    readonly streak: "streak";
    readonly longestStreak: "longestStreak";
    readonly lastTransactionAt: "lastTransactionAt";
    readonly totalTransactions: "totalTransactions";
    readonly totalIncome: "totalIncome";
    readonly totalExpense: "totalExpense";
    readonly hasExported: "hasExported";
    readonly hasAnalyzed: "hasAnalyzed";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserStatsScalarFieldEnum = (typeof UserStatsScalarFieldEnum)[keyof typeof UserStatsScalarFieldEnum];
export declare const BadgeScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly icon: "icon";
    readonly condition: "condition";
    readonly xpReward: "xpReward";
    readonly color: "color";
    readonly createdAt: "createdAt";
};
export type BadgeScalarFieldEnum = (typeof BadgeScalarFieldEnum)[keyof typeof BadgeScalarFieldEnum];
export declare const UserBadgeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly badgeId: "badgeId";
    readonly unlockedAt: "unlockedAt";
};
export type UserBadgeScalarFieldEnum = (typeof UserBadgeScalarFieldEnum)[keyof typeof UserBadgeScalarFieldEnum];
export declare const ChallengeScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly target: "target";
    readonly xpReward: "xpReward";
    readonly type: "type";
    readonly createdAt: "createdAt";
};
export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum];
export declare const UserChallengeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly challengeId: "challengeId";
    readonly current: "current";
    readonly isCompleted: "isCompleted";
    readonly completedAt: "completedAt";
    readonly deadline: "deadline";
    readonly weekNumber: "weekNumber";
    readonly year: "year";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserChallengeScalarFieldEnum = (typeof UserChallengeScalarFieldEnum)[keyof typeof UserChallengeScalarFieldEnum];
export declare const TransactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly description: "description";
    readonly amount: "amount";
    readonly type: "type";
    readonly date: "date";
    readonly categoryId: "categoryId";
    readonly clusterId: "clusterId";
    readonly source: "source";
    readonly csvImportId: "csvImportId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly color: "color";
    readonly icon: "icon";
    readonly type: "type";
    readonly isAutoGenerated: "isAutoGenerated";
    readonly aiConfidence: "aiConfidence";
    readonly aiKeywords: "aiKeywords";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const BudgetGoalScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly categoryId: "categoryId";
    readonly amount: "amount";
    readonly period: "period";
    readonly alertThreshold: "alertThreshold";
    readonly alertSent80: "alertSent80";
    readonly alertSent100: "alertSent100";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BudgetGoalScalarFieldEnum = (typeof BudgetGoalScalarFieldEnum)[keyof typeof BudgetGoalScalarFieldEnum];
export declare const ClusterScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly analysisRunId: "analysisRunId";
    readonly name: "name";
    readonly suggestedName: "suggestedName";
    readonly color: "color";
    readonly index: "index";
    readonly silhouetteScore: "silhouetteScore";
    readonly wcss: "wcss";
    readonly createdAt: "createdAt";
};
export type ClusterScalarFieldEnum = (typeof ClusterScalarFieldEnum)[keyof typeof ClusterScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly message: "message";
    readonly type: "type";
    readonly isRead: "isRead";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly readAt: "readAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const ActivityLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly details: "details";
    readonly type: "type";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum];
export declare const CsvImportScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly filename: "filename";
    readonly rowCount: "rowCount";
    readonly successCount: "successCount";
    readonly errorCount: "errorCount";
    readonly createdAt: "createdAt";
};
export type CsvImportScalarFieldEnum = (typeof CsvImportScalarFieldEnum)[keyof typeof CsvImportScalarFieldEnum];
export declare const ExportLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly format: "format";
    readonly status: "status";
    readonly month: "month";
    readonly year: "year";
    readonly fileUrl: "fileUrl";
    readonly fileSize: "fileSize";
    readonly createdAt: "createdAt";
    readonly completedAt: "completedAt";
};
export type ExportLogScalarFieldEnum = (typeof ExportLogScalarFieldEnum)[keyof typeof ExportLogScalarFieldEnum];
export declare const ForecastCacheScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly categoryId: "categoryId";
    readonly method: "method";
    readonly period: "period";
    readonly forecast: "forecast";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ForecastCacheScalarFieldEnum = (typeof ForecastCacheScalarFieldEnum)[keyof typeof ForecastCacheScalarFieldEnum];
export declare const ForecastScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly categoryId: "categoryId";
    readonly targetMonth: "targetMonth";
    readonly targetYear: "targetYear";
    readonly predictedAmount: "predictedAmount";
    readonly createdAt: "createdAt";
};
export type ForecastScalarFieldEnum = (typeof ForecastScalarFieldEnum)[keyof typeof ForecastScalarFieldEnum];
export declare const RecommendationLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly modelVariant: "modelVariant";
    readonly top1Correct: "top1Correct";
    readonly inTop3: "inTop3";
    readonly inputLatencyMs: "inputLatencyMs";
    readonly createdAt: "createdAt";
};
export type RecommendationLogScalarFieldEnum = (typeof RecommendationLogScalarFieldEnum)[keyof typeof RecommendationLogScalarFieldEnum];
export declare const CategoryFeedbackEventScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly categoryId: "categoryId";
    readonly action: "action";
    readonly createdAt: "createdAt";
};
export type CategoryFeedbackEventScalarFieldEnum = (typeof CategoryFeedbackEventScalarFieldEnum)[keyof typeof CategoryFeedbackEventScalarFieldEnum];
export declare const AnalysisRunScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly status: "status";
    readonly totalTransactions: "totalTransactions";
    readonly kOptimal: "kOptimal";
    readonly silhouetteScore: "silhouetteScore";
    readonly wcssValues: "wcssValues";
    readonly durationMs: "durationMs";
    readonly errorMessage: "errorMessage";
    readonly createdAt: "createdAt";
    readonly completedAt: "completedAt";
};
export type AnalysisRunScalarFieldEnum = (typeof AnalysisRunScalarFieldEnum)[keyof typeof AnalysisRunScalarFieldEnum];
export declare const UserSettingScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly pushNotifications: "pushNotifications";
    readonly budgetAlerts: "budgetAlerts";
    readonly dailyReminder: "dailyReminder";
    readonly reminderTime: "reminderTime";
    readonly currency: "currency";
    readonly language: "language";
    readonly showGamification: "showGamification";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserSettingScalarFieldEnum = (typeof UserSettingScalarFieldEnum)[keyof typeof UserSettingScalarFieldEnum];
export declare const ReminderConfigScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly isEnabled: "isEnabled";
    readonly reminderTime: "reminderTime";
    readonly reminderDays: "reminderDays";
    readonly lastReminderAt: "lastReminderAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReminderConfigScalarFieldEnum = (typeof ReminderConfigScalarFieldEnum)[keyof typeof ReminderConfigScalarFieldEnum];
export declare const PushSubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly endpoint: "endpoint";
    readonly p256dh: "p256dh";
    readonly auth: "auth";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PushSubscriptionScalarFieldEnum = (typeof PushSubscriptionScalarFieldEnum)[keyof typeof PushSubscriptionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumChallengeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeType'>;
export type ListEnumChallengeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeType[]'>;
export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>;
export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>;
export type EnumTransactionSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionSource'>;
export type ListEnumTransactionSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionSource[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumBudgetPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetPeriod'>;
export type ListEnumBudgetPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetPeriod[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityType'>;
export type ListEnumActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityType[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    userStats?: Prisma.UserStatsOmit;
    badge?: Prisma.BadgeOmit;
    userBadge?: Prisma.UserBadgeOmit;
    challenge?: Prisma.ChallengeOmit;
    userChallenge?: Prisma.UserChallengeOmit;
    transaction?: Prisma.TransactionOmit;
    category?: Prisma.CategoryOmit;
    budgetGoal?: Prisma.BudgetGoalOmit;
    cluster?: Prisma.ClusterOmit;
    notification?: Prisma.NotificationOmit;
    activityLog?: Prisma.ActivityLogOmit;
    csvImport?: Prisma.CsvImportOmit;
    exportLog?: Prisma.ExportLogOmit;
    forecastCache?: Prisma.ForecastCacheOmit;
    forecast?: Prisma.ForecastOmit;
    recommendationLog?: Prisma.RecommendationLogOmit;
    categoryFeedbackEvent?: Prisma.CategoryFeedbackEventOmit;
    analysisRun?: Prisma.AnalysisRunOmit;
    userSetting?: Prisma.UserSettingOmit;
    reminderConfig?: Prisma.ReminderConfigOmit;
    pushSubscription?: Prisma.PushSubscriptionOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map