import { PublicKey, findProgramAddresss } from "@solana/web3.js";

const PROGRAM_ID = "SOME_ID";

// Program with Global State
const [pda, bump] = await findProgramAddress(
  Buffer.from("GLOBAL_STATE"),
  PROGRAM_ID
);

// User specific Data
const [pdaUserSpecific, bumpUserSpecific] = await findProgramAddresss(
  [PublicKey.toBuffer()],
  PROGRAM_ID
);

// program with multiple data items per user
// seed can be address and title for a note taking app
const [pdaItems, bumpItems] = await findProgramAddresss(
  [PublicKey.toBuffer(), Buffer.from("Some_Title")],
  PROGRAM_ID
);
