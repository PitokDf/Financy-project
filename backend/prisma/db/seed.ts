import { BcryptUtil } from '@/utils';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@example.com';

    // Seed User
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        const hashedPassword = (await BcryptUtil.hash('admin123'))!;
        await prisma.user.create({
            data: {
                name: 'Admin',
                email,
                password: hashedPassword,
            },
        });
        console.log('✅ User seeded:', email);
    }

    // Seed Badges
    const badges = [
        { name: "Pemula Fintrack", description: "Mencatat transaksi pertama", icon: "Star", condition: "transaction_1", xpReward: 10, color: "#10b981" },
        { name: "Pengamat Setia", description: "Streak 3 hari berturut-turut", icon: "Zap", condition: "streak_3", xpReward: 30, color: "#f59e0b" },
        { name: "Ahli Anggaran", description: "Streak 7 hari berturut-turut", icon: "Trophy", condition: "streak_7", xpReward: 100, color: "#3b82f6" },
        { name: "Penjelajah Fitur", description: "Mencatat 10 transaksi", icon: "Box", condition: "transactions_10", xpReward: 50, color: "#8b5cf6" },
    ];

    for (const badge of badges) {
        await prisma.badge.upsert({
            where: { name: badge.name },
            update: {},
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
