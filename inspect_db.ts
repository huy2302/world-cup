import { db } from "./src/lib/db";

async function main() {
  const tournaments = await db.tournament.findMany({});
  console.log("ALL_TOURNAMENTS_COUNT:", tournaments.length);
  tournaments.forEach((t, i) => {
    console.log(`Tournament [${i}]: id=${t.id}, title=${t.title}, createdAt=${t.createdAt}, hasBracketData=${Boolean(t.bracketData)}`);
  });

  const users = await db.user.findMany({});
  console.log("ALL_USERS_COUNT:", users.length);
  users.forEach((u) => {
    console.log(`User: username=${u.username}, ign=${u.ign}, club=${u.favoriteClub}`);
  });
}

main().finally(() => process.exit(0));
