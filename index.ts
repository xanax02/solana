import * as borsh from '@coral-xyz/borsh';
import { Connection, PublicKey, SystemInstruction, Transaction, TransactionInstruction, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js';

const PROGRAM_ID = new PublicKey("abcd");


const player = {
    publicKey: new PublicKey("player pub key"),
    infoAccount: new PublicKey("Player's info account"),
    secretKey: []
}

const equipPlayerSchema = borsh.struct([
    borsh.u8('varient'),
    borsh.u16('playerId'),
    borsh.u256('itemId')
])

const buffer = Buffer.alloc(1000);
equipPlayerSchema.encode({variant: 2, playerId: 1435, itemId: 737498}, buffer);

const instructionBuffer = buffer.slice(0, equipPlayerSchema.getSpan(buffer));
const connection = new Connection(clusterApiUrl("devnet"));

const transaction = new Transaction();
const instruction = new TransactionInstruction({
    keys: [
        {
            pubkey: player.publicKey,
            isSigner: true,
            isWritable: false
        },
        {
            pubkey: player.infoAccount,
            isSigner: false,
            isWritable: true
        }
    ],
    data: instructionBuffer,
    programId: PROGRAM_ID
})

transaction.add(instruction);

sendAndConfirmTransaction(connection, transaction, [player])
.then(signature => console.log(signature));