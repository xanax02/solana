'use client'

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export default function() {

    return(
        <div className="h-[100%] flex bg-[#121212] items-center justify-between text-[50px] px-5 flex-wrap">
            <Image src={"/solanaLogo.png"} alt="" height={30} width={200} />
            <span>Wallet Adapter</span>
            {/* <button className="text-[16px] px-4 py-2 rounded-md my-2 border-0 bg-blue-800">Connect</button> */}
            <WalletMultiButton />
        </div>
    )
}