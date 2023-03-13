import * as web3 from "@solana/web3.js";
import Dotenv  from "dotenv";
Dotenv.config();

// async function main() {
//     const newKeyPair = web3.Keypair.generate();
//     console.log(newKeyPair.secretKey.toString());
// }

// main()
//     .then(() => {
//         console.log("finished successfully");
//     })
//     .catch((error) => {
//         console.error(error);
//     })


// Initializing keyPair from envFile
function initializeKeypair(): web3.Keypair {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecret = web3.Keypair.fromSecretKey(secretKey);
    return keypairFromSecret;
}

// Main Function
async function main() {
    const payer = initializeKeypair(); 
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL*1);
    await pingProgram(connection, payer);
}


//Program Addresses
const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";


// Ping Program
async function pingProgram(connection: web3.Connection, payer: web3.Keypair) {
    const transaction = new web3.Transaction();

    const programId = new web3.PublicKey(PROGRAM_ADDRESS);
    const programDataId = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

    //creating instruction
    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: programDataId,
                isSigner: false,
                isWritable: true,
            },
        ],
        programId,
    })

    //adding instruction to transaction
    transaction.add(instruction);

    const signature = await web3.sendAndConfirmTransaction(
        connection, 
        transaction,
        [payer]
    );

    console.log(signature);
}

// Calling main Program
main()
    .then(() => {
        console.log("Successfully finished")
    })
    .catch((error) => {
        console.error(error);
    })