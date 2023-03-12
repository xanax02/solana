import { PublicKey, Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

async function getBalance(address: PublicKey) : Promise<number> {
    const connection = new Connection(clusterApiUrl("devnet"));
    return connection.getBalance(address);
}

// new keyPair
const ownerKeypair: Keypair = Keypair.generate();
const publicKey = ownerKeypair.publicKey;