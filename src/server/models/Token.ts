import { Schema, model } from 'mongoose';

interface IToken {
  email: string;
  refreshToken: string;
}

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: { type: String, required: true },
});

export const Token = model<IToken>('Token', TokenSchema);
