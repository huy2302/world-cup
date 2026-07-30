import { db } from "./src/lib/db";

async function main() {
  await db.tournament.updateMany({
    data: { bracketData: null }
  });
  console.log("SUCCESSFULLY_WIPED_BRACKET_DATA_ON_NEON_DB");
}

main().finally(() => process.exit(0));
