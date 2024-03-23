import { 
    Connection, 
    Transaction, 
    SystemProgram, 
    sendAndConfirmTransaction,
    PublicKey
} from "@solana/web3.js";
import 'dotenv/config'
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// 1. recievers's public key 
const suppliedToKey = process.argv[2] || null;

if(!suppliedToKey) {
    console.log("Please provide a valid key");
    process.exit(1);
}
const sendToPubKey = new PublicKey(suppliedToKey);

// 2. sender's public key
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const senderPubKey = senderKeypair.publicKey;

// 3. creating connection
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// 4. Creating transaction
const transaction = new Transaction();
const lamportsToSend = 5000;

// 5. Creating instruction
const instruction = SystemProgram.transfer({
    fromPubkey: senderPubKey,
    toPubkey: sendToPubKey,
    lamports: lamportsToSend
})

// 6. Adding instructin to transaction
transaction.add(instruction);

// 7. Confirming transaciton
const signature = sendAndConfirmTransaction(connection,transaction, [senderKeypair]);
console.log(`Signature is ${signature}`);