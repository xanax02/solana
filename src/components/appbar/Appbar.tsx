'use client'

import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicMultiButton = dynamic(() => import("@solana/wallet-adapter-react-ui").then(mod => mod.WalletMultiButton))

export default function() {

    return(
        <div className="h-[100%] flex bg-[#121212] items-center justify-between text-[50px] px-5 flex-wrap">
            <Image src={"/solanaLogo.png"} alt="" height={30} width={200} />
            <span>Wallet Adapter</span>
            <DynamicMultiButton />
        </div>
    )
}