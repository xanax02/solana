import * as borsh from "@coral-xyz/borsh";

export class Movie {
  title: string;
  rating: number;
  description: string;

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
}
