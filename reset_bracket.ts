import { db } from "./src/lib/db";

async function main() {
  await db.tournament.updateMany({
    data: { bracketData: null }
  });
  console.log("SUCCESSFULLY_RESET_BRACKET_DATA_TO_NULL");
}

main().finally(() => process.exit(0));
