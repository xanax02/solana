import * as borsh from '@coral-xyz/borsh';

const equipPlayerSchema = borsh.struct([
    borsh.u8('varient'),
    borsh.u16('playerId'),
    borsh.u256('itemId')
])