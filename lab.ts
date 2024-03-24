import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";
import 'dotenv/config';

// 1. payer and connection
const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

// 2. getting sols if needed
const newBalance = await airdropIfRequired(connection, payer.publicKey, 1*LAMPORTS_PER_SOL, 0.5*LAMPORTS_PER_SOL);

// ADDRESSES
const PING_PROGRAM_ADDRESS = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PING_PROGRAM_DATA_ADDRESS = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

// 3. Creating transaction
const transaction = new Transaction();
// const programId = new PublicKey(PING_PROGRAM_ADDRESS);
// const programDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

//4. Creating instruction
const instruction = new TransactionInstruction({
    keys: [
        {
            pubkey: PING_PROGRAM_DATA_ADDRESS,
            isSigner: false,
            isWritable: true,
        }
    ],
    programId: PING_PROGRAM_ADDRESS
})

// 5. adding instructions to trnasaction
transaction.add(instruction);

// 6. sending and confirmaing transaction
const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);

console.log(`Transaction completed signature is ${signature}`)