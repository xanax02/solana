"use client";

import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Movie } from "@/lib/serializer";
import { MovieCoordinator } from "@/lib/movieCoord";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export default function () {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      console.log("RUNNING");
      MovieCoordinator.fetchPage(
        connection,
        page,
        10,
        search,
        search != ""
      ).then(setMovies);
    } catch (err) {
      setMovies([]);
      console.log(err);
    }
  }, [page, search]);

  return (
    <div className="mt-4 mb-1">
      <p>Existing Reviews</p>

      <div className="mb-2">
        <input
          className="rounded-md focus:outline-none py-1 bg-transparent border-[1px] border-white px-2"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event?.target.value);
          }}
        />
      </div>

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
      <div className="flex justify-center gap-2 mb-8">
        {page > 1 && (
          <button
            className="cursor-pointer"
            onClick={() => setPage((page) => page - 1)}
          >
            -
          </button>
        )}
        <p>{page}</p>
        {MovieCoordinator.accounts.length > page * 2 && (
          <button
            className="cursor-pointer"
            onClick={() => setPage((page) => page + 1)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
