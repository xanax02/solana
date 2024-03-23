import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

const transaction = new Transaction();

let sender;
let recipient;
let amount

const instructions = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * amount
})

transaction.add(instructions);