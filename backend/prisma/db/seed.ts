import { BcryptUtil } from '@/utils';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    // const email = 'admin@example.com';

    // // Seed User
    // const existingUser = await prisma.user.findUnique({
    //     where: { email },
    // });

    // if (!existingUser) {
    //     const hashedPassword = (await BcryptUtil.hash('admin123'))!;
    //     await prisma.user.create({
    //         data: {
    //             name: 'Admin',
    //             email,
    //             password: hashedPassword,
    //         },
    //     });
    //     console.log('✅ User seeded:', email);
    // }

    // Seed Badges
    const badges = [
        // Legacy/Initial Badges
        { name: "Konsisten", description: "7 hari streak pencatatan", icon: "Flame", condition: "streak_7", xpReward: 50, color: "#FF6B35" },
        { name: "Master Streak", description: "30 hari streak pencatatan", icon: "Fire", condition: "streak_30", xpReward: 200, color: "#FF4500" },
        { name: "Analis", description: "Lakukan analisis K-Means pertama", icon: "Brain", condition: "first_analysis", xpReward: 30, color: "#8B5CF6" },
        { name: "Pencatat Aktif", description: "Catat 50 transaksi", icon: "List", condition: "transactions_50", xpReward: 100, color: "#3B82F6" },
        { name: "Penabung", description: "Pemasukan > Pengeluaran selama 1 bulan", icon: "TrendingUp", condition: "saver_month", xpReward: 75, color: "#10B981" },
        { name: "Organized", description: "Buat 5 kategori", icon: "Tag", condition: "categories_5", xpReward: 50, color: "#F59E0B" },
        { name: "Budget Master", description: "Tetapkan 3 target anggaran", icon: "Target", condition: "budget_3", xpReward: 45, color: "#EC4899" },
        { name: "Reporter", description: "Ekspor laporan pertama", icon: "FileText", condition: "first_export", xpReward: 20, color: "#6366F1" },
        { name: "Level 5", description: "Capai level 5", icon: "Trophy", condition: "level_5", xpReward: 100, color: "#FBBF24" },
        { name: "Level 10", description: "Capai level 10", icon: "Crown", condition: "level_10", xpReward: 250, color: "#A855F7" },
        { name: "Cerdas Finansial", description: "Saldo positif 3 bulan berturut-turut", icon: "Wallet", condition: "positive_3months", xpReward: 150, color: "#14B8A6" },
        { name: "Pemula Fintrack", description: "Mencatat transaksi pertama", icon: "Star", condition: "transaction_1", xpReward: 10, color: "#10b981" },
        { name: "Pengamat Setia", description: "Streak 3 hari berturut-turut", icon: "Zap", condition: "streak_3", xpReward: 30, color: "#f59e0b" },
        { name: "Ahli Anggaran", description: "Streak 7 hari berturut-turut", icon: "Trophy", condition: "streak_7", xpReward: 100, color: "#3b82f6" },
        { name: "Penjelajah Fitur", description: "Mencatat 10 transaksi", icon: "Box", condition: "transactions_10", xpReward: 50, color: "#8b5cf6" },
    ];

    for (const badge of badges) {
        await prisma.badge.upsert({
            where: { name: badge.name },
            update: {
                description: badge.description,
                icon: badge.icon,
                condition: badge.condition,
                xpReward: badge.xpReward,
                color: badge.color
            },
            create: badge,
        });
    }
    console.log('✅ Badges seeded');

    // Seed Challenges
    const challenges = [
        { title: "Weekly Spender", description: "Catat 5 transaksi dalam seminggu", target: 5, xpReward: 50, type: 'WEEKLY_TRANSACTIONS' },
        { title: "Financial Planner", description: "Buat 3 anggaran (budget goal)", target: 3, xpReward: 70, type: 'BUDGET_GOALS' },
        { title: "Data Analyst", description: "Lakukan analisis AI sebanyak 2 kali", target: 2, xpReward: 100, type: 'ANALYSIS_COUNT' },
        { title: "Consistent User", description: "Jaga streak selama 3 hari di minggu ini", target: 3, xpReward: 80, type: 'STREAK_MAINTAIN' },
        { title: "Power User", description: "Catat 15 transaksi dalam seminggu", target: 15, xpReward: 150, type: 'WEEKLY_TRANSACTIONS' },
    ];

    for (const challenge of challenges) {
        await prisma.challenge.create({
            data: {
                description: challenge.description,
                target: challenge.target,
                xpReward: challenge.xpReward,
                type: challenge.type as any,
                title: challenge.title
            },
        });
    }
    console.log('✅ Challenges seeded');
}

main()
    .catch((err) => {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
