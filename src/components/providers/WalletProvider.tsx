'use client';

import { ReactNode, useMemo } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";

export default function({children}: Readonly<{children: ReactNode}>) {
    
    const wallets = useMemo(() => [], []);

    return(
        <WalletProvider wallets={wallets}>
            {children}
        </WalletProvider>
    )
}