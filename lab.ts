// generate public key from secrete key and get the data from devnet;
import "dotenv/config";
import { getKeypairFromEnvironment} from "@solana-developers/helpers"
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

//keypair and address
const keypair = getKeypairFromEnvironment("SECRET_KEY");
const publicKey = keypair.publicKey;
// console.log(publicKey.toBase58())

//connnection
const connection = new Connection(clusterApiUrl("devnet"));
const balance =  await connection.getBalance(publicKey);

console.log(balance/LAMPORTS_PER_SOL);