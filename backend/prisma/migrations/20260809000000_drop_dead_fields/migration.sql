-- DropColumn
ALTER TABLE "users" DROP COLUMN "avatar";

-- DropColumn
ALTER TABLE "user_stats" DROP COLUMN "total_income";

-- DropColumn
ALTER TABLE "user_stats" DROP COLUMN "total_expense";

-- DropColumn
ALTER TABLE "user_settings" DROP COLUMN "reminder_days";

-- DropColumn
ALTER TABLE "user_settings" DROP COLUMN "last_reminder_at";

-- DropColumn
ALTER TABLE "transactions" DROP COLUMN "csv_import_id";

-- DropColumn
ALTER TABLE "clusters" DROP COLUMN "wcss";
