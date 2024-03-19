import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers'

const keypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(keypair.publicKey.toBase58());
//4Tum3FDSjuYJyBJbA4Di9wSU4S6Krpo5czTwY7dbXRRo -> public key