import { Connection, PublicKey } from "@solana/web3.js";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export class MovieCoordinator {
  accounts: PublicKey[] = [];

  async prefetchAccounts(connection: Connection) {}

  async fetchPage(connection: Connection, page: number, perPage: number) {}
}
