import prisma from "./src/config/prisma";

async function main() {
  const badges = [
    {
      name: "Pemula Fintrack",
      description: "Mencatat transaksi pertama",
      icon: "Star",
      condition: "transaction_1",
      xpReward: 10,
      color: "#10b981",
    },
    {
      name: "Pengamat Setia",
      description: "Streak 3 hari berturut-turut",
      icon: "Zap",
      condition: "streak_3",
      xpReward: 30,
      color: "#f59e0b",
    },
    {
      name: "Ahli Anggaran",
      description: "Streak 7 hari berturut-turut",
      icon: "Trophy",
      condition: "streak_7",
      xpReward: 100,
      color: "#3b82f6",
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  console.log("Badges seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
