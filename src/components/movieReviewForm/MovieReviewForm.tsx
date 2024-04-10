import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useState } from "react";
import { Movie } from "@/lib/serializer";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export default function () {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleTransaction = async (movie: Movie) => {
    //return when no pub key
    if (!connection || !publicKey) {
      alert("please connect you wallet");
      return;
    }

    const transaction = new Transaction();
    const instructionDatabuffer = movie.serialize();

    //pda for storing data
    const [pda] = await PublicKey.findProgramAddress(
      [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instructions = new TransactionInstruction({
      keys: [
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: true,
        },
      ],
      data: instructionDatabuffer,
      programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });
  };

  const handleSubmit = (evnet: any) => {
    event?.preventDefault();
    if (title.trim().length === 0 || description.trim().length === 0) {
      alert("Plese provide valid data");
      return;
    }
    // here movie object is begin created
    const movie = new Movie(title, rating, description);
    handleTransaction(movie);
  };

  return (
    <div className="">
      <p>Add a review</p>
      <form className="flex flex-col border-2 border-white p-4 rounded-md">
        <label className="mb-1" htmlFor="title_input">
          Movie Title
        </label>
        <input
          className="rounded-md focus:outline-none py-1 bg-transparent border-[1px] border-white px-2"
          id="title_input"
          type="text"
          onChange={(event) => setTitle(event?.target.value)}
        />

        <label className="mt-4 mb-1" htmlFor="review_input">
          Add your review
        </label>
        <textarea
          className="rounded-md focus:outline-none py-1 bg-transparent border-[1px] border-white px-2"
          id="review_input"
          rows={4}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label className="mt-4 mb-1" htmlFor="rating_input">
          Rating
        </label>
        <input
          className="rounded-md focus:outline-none pl-2 bg-transparent border-[1px] border-white"
          type="number"
          max={5}
          min={0}
          onChange={(event) => setRating(parseInt(event.target.value))}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-gray-800 rounded-md mt-4 py-1"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
