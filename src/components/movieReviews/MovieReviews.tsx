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
    };
  }, []);

  return (
    <div className="mt-4 mb-1">
      <p>Existing Reviews</p>
      <div className="border-2 border-white px-10 py-4">
        <h2 className="uppercase font-medium">This is the heading</h2>
        <p>
          Ultrices sagittis orci a scelerisque purus semper. Arcu risus quis
          varius quam quisque id. Nam aliquam sem et tortor consequat. Amet
          massa vitae tortor condimentum lacinia quis vel eros. Enim lobortis
          scelerisque fermentum dui faucibus in. Fusce id velit ut tortor
          pretium viverra suspendisse potenti nullam. At elementum eu facilisis
          sed odio morbi. Enim nec dui nunc mattis enim ut tellus elementum.
          Nascetur ridiculus mus mauris vitae ultricies. Velit ut tortor pretium
          viverra. Mattis ullamcorper velit sed ullamcorper morbi tincidunt
          ornare massa eget. Pellentesque id nibh tortor id aliquet lectus proin
          nibh. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra
          justo. Gravida in fermentum et sollicitudin. Tincidunt eget nullam non
          nisi est sit amet.
        </p>
      </div>
    </div>
  );
}
