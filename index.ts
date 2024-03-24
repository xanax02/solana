import { Connection, Transaction, TransactionInstruction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";

// data
let ProgramDataAccount;
let programId;
let payer;

// 1. creating instruction 
const instruction = new TransactionInstruction({
    keys: [
        {
            pubkey: ProgramDataAccount,
            isSigner: true,
            isWritable: false,
        }
    ],
    programId
})

// 2. creating transaction  and adding instruction
const transaction = new Transaction().add(instruction); 

// 3. creating connection
const connection = new Connection(clusterApiUrl("devnet"));

// 4. confirming transaction
const signature = sendAndConfirmTransaction(connection, transaction, [payer]);