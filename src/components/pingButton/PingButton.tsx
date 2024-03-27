'use client';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

export default function() {

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet()

    function handleClick() {
        if(!publicKey || !connection) return;

        const programPubkey = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
        const programDataPubkey = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

        const transaction = new Transaction();
        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: programDataPubkey,
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId: programPubkey
        })
        
        transaction.add(instruction);
        sendTransaction(transaction, connection)
        .then((sig) => {
            console.log(sig);
        })
    }

    return (
        <button 
            onClick={handleClick}
            className="text-[16px] px-4 py-2 rounded-md my-2 border-0 bg-gray-300 text-black hover:bg-gray-100"
        >
            Ping
        </button>
    )
}