import { 
    Connection, 
    LAMPORTS_PER_SOL, 
    SystemProgram, 
    Transaction, 
    clusterApiUrl, 
    sendAndConfirmTransaction 
} from "@solana/web3.js";

//1. creating transctions
const transaction = new Transaction();

let sender;
let recipient;
let amount

// 2. creating instructions
const instructions = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * amount
})

// 3. adding instructions to transaction
transaction.add(instructions);

// 4. confirming the transaction
const connection = new Connection(clusterApiUrl("devnet"));
let keyPair;
const signature = sendAndConfirmTransaction(
    connection,
    transaction,
    [keyPair]
)