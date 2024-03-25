'use client';

import { ReactNode } from "react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

export default function({children}: Readonly<{children: ReactNode}>){
    const endpoint = clusterApiUrl("devnet");

    return (
        <ConnectionProvider endpoint={endpoint}>
            {children}
        </ConnectionProvider>
    )
}