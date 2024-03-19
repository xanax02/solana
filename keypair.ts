// the package.json have esrun dep so you can run directly this file with help of esrun without build process
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();
console.log("Keypair generated")
console.log("Public Key", keypair.publicKey.toBase58());
console.log("Secret Key", keypair.secretKey);