'use client'

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {

  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  console.log("balance", balance)

  useEffect(() => {
    if(!publicKey || !connection) return;

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL),
      "confirmed"
    )

    connection.getAccountInfo(publicKey).then(info =>{
      if(info) setBalance(info.lamports);
    })

  }, [connection, publicKey])

  return (
    <main>
      <h1>Hello world</h1>
      <p>{publicKey ? `Balance is ${balance / LAMPORTS_PER_SOL} sol` : ""}</p>
    </main>
  );
}
