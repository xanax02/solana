'use client'

import { ReactNode } from "react";
import Appbar from "../appbar/Appbar";
import WalletContextProviders from "../walletContextProviders/WalletContextProviders";

export default function({children}: {children: ReactNode}) {
    return (
        <WalletContextProviders>
            <header className="h-[90px]"><Appbar /></header>
            <main className="flex-1">{children}</main>
        </WalletContextProviders>
    )
}