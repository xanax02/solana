"use client";

import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { Movie } from "@/lib/serializer";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export default function () {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const accounts = await connection.getProgramAccounts(
        new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
      );
      const movies: Movie[] = accounts.map(({ account }) => {
        const movie = Movie.deserialize(account.data);
        if (movie != null) return movie;
        else {
          throw new Error("NULL MOVIE");
        }
      });
      setMovies(movies);
      console.log(movies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="mt-4 mb-1">
      <p>Existing Reviews</p>

      {movies.map((movie, index) => {
        return (
          <div
            key={index + 1}
            className="border-2 border-white px-10 py-4 max-w-[500px] mb-2 break-words"
          >
            <h2 className="uppercase font-medium">{movie.title}</h2>
            <p>{movie.description}</p>
          </div>
        );
      })}
    </div>
  );
}
