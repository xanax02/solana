import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

async function getBalance(address: PublicKey) : Promise<number> {
    const connection = new Connection(clusterApiUrl("devnet"));
    return connection.getBalance(address);
}