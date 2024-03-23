import { Connection } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import 'dotenv/config';

const pubkey = getKeypairFromEnvironment("SECRET_KEY").publicKey;
const connection = new Connection("https://api.devnet.solana.com");
const balance = await connection.getBalance(pubkey);
console.log(balance);