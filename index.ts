import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const PROGRAM_ID = new PublicKey("SOME_ID");
const publicKey = new PublicKey("USER_PUBLIC_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

// Program with Global State
const [pda, bump] = await findProgramAddress(
  Buffer.from("GLOBAL_STATE"),
  PROGRAM_ID
);

// User specific Data
const [pdaUserSpecific, bumpUserSpecific] = await findProgramAddresss(
  [publicKey.toBuffer()],
  PROGRAM_ID
);

// program with multiple data items per user
// seed can be address and title for a note taking app
const [pdaItems, bumpItems] = await findProgramAddresss(
  [publicKey.toBuffer(), Buffer.from("Some_Title")],
  PROGRAM_ID
);

// This returns an array of objects where each object has
// pubkey property representing the public key of the account and an account property of type AccountInfo.
// You can use the account property to get the account data.

const accounts = await connection.getProgramAccounts(PROGRAM_ID);
accounts.map(({ pubkey, account }) => {
  console.log("Account", pubkey);
  console.log("DATA buffer", account.data);
});

////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// DATA DESERIALIZATION
import * as borsh from "@coral-xyz/borsh";

const borshAccountSchema = borsh.struct([
  borsh.bool("initialized"),
  borsh.u16("playerId"),
  borsh.str("name"),
]);

const buffer = Buffer.from("THIS IS PLAYER BUFFRE");
const { playerId, name } = borshAccountSchema.decode(buffer);
