import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning old database seed data...");

  // Clean old dummy data
  await prisma.matchSubmission.deleteMany({});
  await prisma.match.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.groupStanding.deleteMany({});
  await prisma.squadPlayer.deleteMany({});
  await prisma.squad.deleteMany({});
  await prisma.tournament.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.footballPlayer.deleteMany({});

  const passwordHash = await bcrypt.hash("admin123", 10);

  // 1. Initial essential Admin Account
  const admin = await prisma.user.create({
    data: {
      username: "admin_alex",
      email: "admin@fconline.gg",
      passwordHash,
      role: "ADMIN",
      ign: "FCPro_AlexAdmin",
      discordTag: "AlexAdmin#0001",
      squadValue: BigInt(5000000000000),
      favoriteClub: "Tây Ban Nha",
      eloRating: 2100,
    },
  });

  // 2. Initial essential Tournament Record
  await prisma.tournament.create({
    data: {
      title: "FC Online World Cup 2026",
      description: "Giải đấu World Cup 30 đội tuyển hàng đầu",
      format: "GROUP_STAGE",
      status: "REGISTRATION_OPEN",
      maxPlayers: 12,
      prizePool: "100 QQ",
      rules: "Thi đấu theo thể thức World Cup 4 Bảng Đấu (Top 1 Bán kết)",
      startDate: new Date(),
      checkInMinutes: 30,
    },
  });

  console.log(`Database seeded with essential Admin account (${admin.ign}). All sample dummy players removed!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
