import * as borsh from '@coral-xyz/borsh';

const equipPlayerSchema = borsh.struct([
    borsh.u8('varient'),
    borsh.u16('playerId'),
    borsh.u256('itemId')
])

const buffer = Buffer.alloc(1000);
equipPlayerSchema.encode({variant: 2, playerId: 1435, itemId: 737498}, buffer);

const instructionBuffer = buffer.slice(0, equipPlayerSchema.getSpan(buffer));