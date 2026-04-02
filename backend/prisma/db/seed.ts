import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import 'dotenv/config'
const prisma = new PrismaClient();
async function main() {
    const email = 'admin@example.com';

    // Periksa apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        const hashedPassword = (await bcrypt.hash('admin123', 10))!;

        await prisma.user.create({
            data: {
                name: 'Admin',
                email,
                passwordHash: hashedPassword,
            },
        });

        console.log('✅ User seeded:', email);
    } else {
        console.log('ℹ️ User already exists:', email);
    }
}

main()
    .catch((err) => {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
