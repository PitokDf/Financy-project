-- CreateTable
CREATE TABLE "recommendation_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "suggestedTop3" TEXT[],
    "chosenCategoryId" TEXT NOT NULL,
    "top1Correct" BOOLEAN NOT NULL,
    "inTop3" BOOLEAN NOT NULL,
    "inputLatencyMs" INTEGER NOT NULL,
    "modelVariant" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_feedback_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "suggestedTop3" TEXT[],
    "chosenCategoryId" TEXT NOT NULL,
    "isCorrected" BOOLEAN NOT NULL,
    "correctionFromCategoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_feedback_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recommendation_logs_userId_createdAt_idx" ON "recommendation_logs"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "recommendation_logs_transactionId_idx" ON "recommendation_logs"("transactionId");

-- CreateIndex
CREATE INDEX "category_feedback_events_userId_createdAt_idx" ON "category_feedback_events"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "category_feedback_events_transactionId_idx" ON "category_feedback_events"("transactionId");

-- AddForeignKey
ALTER TABLE "recommendation_logs" ADD CONSTRAINT "recommendation_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendation_logs" ADD CONSTRAINT "recommendation_logs_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_feedback_events" ADD CONSTRAINT "category_feedback_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_feedback_events" ADD CONSTRAINT "category_feedback_events_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
