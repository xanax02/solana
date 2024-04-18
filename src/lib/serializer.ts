import * as borsh from "@coral-xyz/borsh";

export class Movie {
  title: string;
  rating: number;
  description: string;

  constructor(title: string, rating: number, description: string) {
    this.title = title;
    this.rating = rating;
    this.description = description;
  }

  intructionSchema = borsh.struct([
    borsh.u8("varient"),
    borsh.str("title"),
    borsh.u8("rating"),
    borsh.str("description"),
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.intructionSchema.encode({ ...this, varient: 0 }, buffer);
    return buffer.slice(0, this.intructionSchema.getSpan(buffer));
  }

  borshAccountSchema = borsh.struct([
    borsh.bool("initialized"),
    borsh.u8("rating"),
    borsh.str("title"),
    borsh.str("description"),
  ]);

  deserialize(buffer?: Buffer): Movie | null {
    if (!buffer) return null;

    try {
      const { title, rating, description } =
        this.borshAccountSchema.decode(buffer);
      return new Movie(title, rating, description);
    } catch (erro) {
      console.log(erro);
      return null;
    }
  }
}
