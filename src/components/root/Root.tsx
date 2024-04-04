'use client'

import { ReactNode } from "react";
import Appbar from "../appbar/Appbar";
import WalletContextProviders from "../walletContextProviders/WalletContextProviders";

export default function({children}: {children: ReactNode}) {
    return (
        <WalletContextProviders>
            <header className="h-[90px] fixed top-0 right-0 left-0"><Appbar /></header>
            <main className="mt-[90px] ">{children}</main>
        </WalletContextProviders>
    )
}