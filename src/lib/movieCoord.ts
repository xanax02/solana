import { Connection, PublicKey } from "@solana/web3.js";
import { Movie } from "./serializer";
import base58 from "bs58";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";
const program_id = new PublicKey(MOVIE_REVIEW_PROGRAM_ID);

export class MovieCoordinator {
  static accounts: PublicKey[] = [];

  // fetches all the accounts from chain with pubkey and limited account data
  static async prefetchAccounts(connection: Connection, search: string) {
    console.log(search);
    const accounts = await connection.getProgramAccounts(program_id, {
      // for having title for sorting
      dataSlice: { offset: 2, length: 18 },
      filters:
        search === ""
          ? []
          : [
              {
                memcmp: {
                  offset: 2,
                  bytes: base58.encode(Buffer.from(search)),
                },
              },
            ],
    });
    // SORTING ACCOUNTS ACCORDING TO TITLE IN ALPHABETICAL ORDER
    const accountsWithTitles = accounts.map((account) => account);

    //
    // could not do it as data is currupted.
    //

    // accountsWithTitles.sort((a, b) => {
    //   const lengthA =
    //     a.account.data.length >= 4 ? a.account.data.readUInt32LE(0) : 0;
    //   const lengthB =
    //     b.account.data.length >= 4 ? b.account.data.readUInt32LE(0) : 0;
    //   console.log(lengthA, lengthB);
    //   const dataA = a.account.data.slice(4, 4 + lengthA);
    //   const dataB = b.account.data.slice(4, 4 + lengthB);
    //   return dataA.compare(dataB);
    // });

    // setting class' accounts
    this.accounts = accountsWithTitles.map((account) => account.pubkey);
  }

  // slices the accounts array according to perPage and page number
  // then with that sliced data of pubKeys fetches the accountdata
  static async fetchPage(
    connection: Connection,
    page: number,
    perPage: number,
    search: string,
    reaload: boolean
  ): Promise<Movie[]> {
    if (this.accounts.length === 0 || reaload) {
      await this.prefetchAccounts(connection, search);
    }

    const paginatedPublicKeys = this.accounts.slice(
      (page - 1) * perPage,
      page * perPage
    );

    if (paginatedPublicKeys.length === 0) return [];

    const accounts = await connection.getMultipleAccountsInfo(
      paginatedPublicKeys
    );
    const movies = accounts.reduce((accum: Movie[], account) => {
      const movie = Movie.deserialize(account?.data);
      if (!movie) return accum;
      return [...accum, movie];
    }, []);

    return movies;
  }
}
