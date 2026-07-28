import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FC Online Tournament & Squad database...");

  // Clean existing data
  await prisma.squadPlayer.deleteMany();
  await prisma.squad.deleteMany();
  await prisma.footballPlayer.deleteMany();
  await prisma.matchSubmission.deleteMany();
  await prisma.match.deleteMany();
  await prisma.groupStanding.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Seed FC Online Football Players
  const playersData = [
    {
      name: "Cristiano Ronaldo",
      position: "ST",
      overall: 118,
      season: "ICON",
      cardLevel: 5,
      nationality: "Portugal",
      club: "Real Madrid",
      portrait: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=80",
      salary: 28,
      traits: "Finesse Shot, Power Header, Speed Dribbler, Outside Foot Shot, Flair",
      preferredFoot: "Right / Left 5-5",
      weakFoot: 5,
      skillMoves: 5,
      height: "187 cm",
      weight: "83 kg",
    },
    {
      name: "Lionel Messi",
      position: "RW",
      overall: 117,
      season: "24TS",
      cardLevel: 8,
      nationality: "Argentina",
      club: "FC Barcelona",
      portrait: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=300&auto=format&fit=crop&q=80",
      salary: 27,
      traits: "Finesse Shot, Technical Dribbler, Playmaker, Chip Shot, Long Shot Taker",
      preferredFoot: "Left / Right 4-5",
      weakFoot: 4,
      skillMoves: 5,
      height: "170 cm",
      weight: "72 kg",
    },
    {
      name: "Ruud Gullit",
      position: "CAM",
      overall: 119,
      season: "ICON",
      cardLevel: 5,
      nationality: "Netherlands",
      club: "AC Milan",
      portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
      salary: 29,
      traits: "Power Header, Finesse Shot, Technical Dribbler, Long Passer, Leadership",
      preferredFoot: "Right / Left 5-5",
      weakFoot: 5,
      skillMoves: 5,
      height: "191 cm",
      weight: "88 kg",
    },
    {
      name: "Kylian Mbappé",
      position: "LW",
      overall: 116,
      season: "24TS",
      cardLevel: 5,
      nationality: "France",
      club: "Real Madrid",
      portrait: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80",
      salary: 26,
      traits: "Speed Dribbler, Finesse Shot, Chip Shot, Outside Foot Shot",
      preferredFoot: "Right / Left 4-5",
      weakFoot: 4,
      skillMoves: 5,
      height: "178 cm",
      weight: "75 kg",
    },
    {
      name: "Jude Bellingham",
      position: "CM",
      overall: 115,
      season: "24TS",
      cardLevel: 6,
      nationality: "England",
      club: "Real Madrid",
      portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      salary: 25,
      traits: "Playmaker, Technical Dribbler, Box-to-Box, Leadership",
      preferredFoot: "Right / Left 4-5",
      weakFoot: 4,
      skillMoves: 4,
      height: "186 cm",
      weight: "75 kg",
    },
    {
      name: "Michael Essien",
      position: "LDM",
      overall: 114,
      season: "ICON",
      cardLevel: 5,
      nationality: "Ghana",
      club: "Chelsea",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      salary: 24,
      traits: "Dives Into Tackles, Long Shot Taker, Power House",
      preferredFoot: "Right / Left 4-5",
      weakFoot: 4,
      skillMoves: 3,
      height: "177 cm",
      weight: "80 kg",
    },
    {
      name: "Patrick Vieira",
      position: "RDM",
      overall: 117,
      season: "ICON",
      cardLevel: 5,
      nationality: "France",
      club: "Arsenal",
      portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      salary: 27,
      traits: "Power Header, Dives Into Tackles, Leadership, Interceptor",
      preferredFoot: "Right / Left 4-5",
      weakFoot: 4,
      skillMoves: 4,
      height: "192 cm",
      weight: "82 kg",
    },
    {
      name: "Paolo Maldini",
      position: "LCB",
      overall: 118,
      season: "ICON",
      cardLevel: 5,
      nationality: "Italy",
      club: "AC Milan",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
      salary: 27,
      traits: "Leadership, Slide Tackler, Acrobat, Aerial Threat",
      preferredFoot: "Left / Right 4-5",
      weakFoot: 4,
      skillMoves: 3,
      height: "186 cm",
      weight: "77 kg",
    },
    {
      name: "Virgil van Dijk",
      position: "RCB",
      overall: 116,
      season: "24TS",
      cardLevel: 5,
      nationality: "Netherlands",
      club: "Liverpool",
      portrait: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
      salary: 25,
      traits: "Power Header, Leadership, Long Passer",
      preferredFoot: "Right / Left 3-5",
      weakFoot: 3,
      skillMoves: 3,
      height: "193 cm",
      weight: "92 kg",
    },
    {
      name: "Theo Hernández",
      position: "LB",
      overall: 112,
      season: "23UCL",
      cardLevel: 7,
      nationality: "France",
      club: "AC Milan",
      portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
      salary: 21,
      traits: "Speed Dribbler, Early Crosser",
      preferredFoot: "Left / Right 3-5",
      weakFoot: 3,
      skillMoves: 4,
      height: "184 cm",
      weight: "81 kg",
    },
    {
      name: "Achraf Hakimi",
      position: "RB",
      overall: 111,
      season: "23UCL",
      cardLevel: 7,
      nationality: "Morocco",
      club: "Paris Saint-Germain",
      portrait: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
      salary: 20,
      traits: "Speed Dribbler, Long Throw-In",
      preferredFoot: "Right / Left 4-5",
      weakFoot: 4,
      skillMoves: 4,
      height: "181 cm",
      weight: "73 kg",
    },
    {
      name: "Thibaut Courtois",
      position: "GK",
      overall: 114,
      season: "23UCL",
      cardLevel: 8,
      nationality: "Belgium",
      club: "Real Madrid",
      portrait: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
      salary: 22,
      traits: "GK Long Throw, GK Comes For Crosses, GK Saver",
      preferredFoot: "Left / Right 3-5",
      weakFoot: 3,
      skillMoves: 1,
      height: "200 cm",
      weight: "96 kg",
    },
  ];

  const createdDbPlayers = [];
  for (const fp of playersData) {
    const p = await prisma.footballPlayer.create({ data: fp });
    createdDbPlayers.push(p);
  }

  console.log(`Created ${createdDbPlayers.length} football players.`);

  // 2. Admin & User Accounts
  const admin = await prisma.user.create({
    data: {
      username: "admin_alex",
      email: "admin@fconline.gg",
      passwordHash,
      role: "ADMIN",
      ign: "FCPro_AlexAdmin",
      discordTag: "AlexAdmin#0001",
      squadValue: BigInt(5000000000000),
      favoriteClub: "Real Madrid",
      eloRating: 2100,
    },
  });

  const playerNames = [
    { username: "pro_huy", ign: "FCPro_HuyDev", elo: 1850, squad: 1200000000000, club: "Real Madrid" },
    { username: "cyber_dragon", ign: "VN_CyberDragon", elo: 1720, squad: 950000000000, club: "Manchester City" },
    { username: "striker_king", ign: "CR7_KingGamer", elo: 1680, squad: 800000000000, club: "Al Nassr" },
    { username: "shadow_ninja", ign: "Shadow_FC4", elo: 1610, squad: 650000000000, club: "FC Barcelona" },
    { username: "messi_magic", ign: "LM10_GOAT", elo: 1790, squad: 1100000000000, club: "Inter Miami" },
    { username: "tactical_genius", ign: "Coach_PepPro", elo: 1540, squad: 500000000000, club: "Bayern Munich" },
    { username: "blitz_master", ign: "Blitz_R9", elo: 1590, squad: 720000000000, club: "AC Milan" },
    { username: "golden_glove", ign: "Neuer_Wall", elo: 1480, squad: 420000000000, club: "Paris Saint-Germain" },
  ];

  const createdPlayers = [];
  for (const p of playerNames) {
    const player = await prisma.user.create({
      data: {
        username: p.username,
        email: `${p.username}@fconline.gg`,
        passwordHash,
        role: "PLAYER",
        ign: p.ign,
        discordTag: `${p.username}#1234`,
        squadValue: BigInt(p.squad),
        favoriteClub: p.club,
        eloRating: p.elo,
        totalWins: Math.floor(Math.random() * 20) + 10,
        totalLosses: Math.floor(Math.random() * 10) + 2,
      },
    });
    createdPlayers.push(player);
  }

  // 3. Attach FC Online Squads to Players
  const positionsMap = ["ST", "RW", "CAM", "LW", "CM", "LDM", "RDM", "LCB", "RCB", "LB", "RB", "GK"];
  for (const player of createdPlayers) {
    const squad = await prisma.squad.create({
      data: {
        userId: player.id,
        club: player.favoriteClub || "Real Madrid",
        formation: "4-2-3-1",
        manager: "Carlo Ancelotti (+5% Acceleration)",
        totalSalary: 254,
        maxSalary: 260,
      },
    });

    for (let i = 0; i < createdDbPlayers.length; i++) {
      await prisma.squadPlayer.create({
        data: {
          squadId: squad.id,
          footballPlayerId: createdDbPlayers[i].id,
          pitchPosition: positionsMap[i],
          cardLevel: createdDbPlayers[i].cardLevel,
        },
      });
    }
  }

  // 4. Tournaments
  const t1 = await prisma.tournament.create({
    data: {
      title: "FC Online Champions Cup 2026 - Season 1",
      description: "Premier 8-Player Single Elimination Championship featuring top regional FIFA Online 4 pros with $1,000 + 10,000 FC Points prize pool.",
      format: "SINGLE_ELIMINATION",
      status: "IN_PROGRESS",
      maxPlayers: 8,
      prizePool: "$1,000 + 10,000 FC Points",
      rules: "1v1 Best of 1, Salary Limit 260 BP. No duplicate icon players allowed.",
      startDate: new Date(),
      checkInMinutes: 30,
    },
  });

  for (let i = 0; i < createdPlayers.length; i++) {
    await prisma.registration.create({
      data: {
        tournamentId: t1.id,
        userId: createdPlayers[i].id,
        seedNumber: i + 1,
        isCheckedIn: true,
      },
    });
  }

  const qfMatches = [
    { home: createdPlayers[0].id, away: createdPlayers[7].id, homeScore: 3, awayScore: 1, winner: createdPlayers[0].id, status: "COMPLETED" },
    { home: createdPlayers[1].id, away: createdPlayers[6].id, homeScore: 2, awayScore: 0, winner: createdPlayers[1].id, status: "COMPLETED" },
    { home: createdPlayers[2].id, away: createdPlayers[5].id, homeScore: 1, awayScore: 2, winner: createdPlayers[5].id, status: "COMPLETED" },
    { home: createdPlayers[3].id, away: createdPlayers[4].id, homeScore: 0, awayScore: 4, winner: createdPlayers[4].id, status: "COMPLETED" },
  ];

  for (let i = 0; i < qfMatches.length; i++) {
    const m = qfMatches[i];
    await prisma.match.create({
      data: {
        tournamentId: t1.id,
        round: 1,
        matchNumber: i + 1,
        bracketType: "WINNERS",
        homePlayerId: m.home,
        awayPlayerId: m.away,
        homeScore: m.homeScore,
        awayScore: m.awayScore,
        winnerId: m.winner,
        status: m.status,
        completedAt: new Date(),
      },
    });
  }

  await prisma.match.create({
    data: {
      tournamentId: t1.id,
      round: 2,
      matchNumber: 5,
      bracketType: "WINNERS",
      homePlayerId: createdPlayers[0].id,
      awayPlayerId: createdPlayers[1].id,
      homeScore: 0,
      awayScore: 0,
      status: "READY",
    },
  });

  await prisma.match.create({
    data: {
      tournamentId: t1.id,
      round: 2,
      matchNumber: 6,
      bracketType: "WINNERS",
      homePlayerId: createdPlayers[5].id,
      awayPlayerId: createdPlayers[4].id,
      homeScore: 0,
      awayScore: 0,
      status: "READY",
    },
  });

  console.log("Seeding with FC Online Squads & Players completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
