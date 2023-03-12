import * as web3 from "@solana/web3.js";
import Dotenv  from "dotenv";
Dotenv.config();

async function main() {
    const newKeyPair = web3.Keypair.generate();
    console.log(newKeyPair.secretKey.toString());
}

main()
    .then(() => {
        console.log("finished successfully");
    })
    .catch((error) => {
        console.error(error);
    })