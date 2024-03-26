'use client';

// import dynamic from "next/dynamic";
// import { ReactNode } from "react";
// import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// const dynamicWalletMultiButton = dynamic(()=> import("@solana/wallet-adapter-react-ui").then(mod => mod.WalletMultiButton), {ssr: false});

// export default function({children}: Readonly<{children: ReactNode}>) {

//     return (
//         <WalletModalProvider>
//             <dynamicWalletMultiButton>
//                 {children}
//             </dynamicWalletMultiButton>
//         </WalletModalProvider>
//     )
// }

// 'use client'

import { ReactNode, useEffect, useState } from "react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function ({ children }: Readonly<{ children: ReactNode }>) {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    },[])

    return (
        isClient ? 
        <>
            <WalletModalProvider>
                <WalletMultiButton>
                    {children}
                </WalletMultiButton>
            </WalletModalProvider>
        </>
        : 
        <></>
    )
}