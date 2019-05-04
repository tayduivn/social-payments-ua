import { Document, model, Schema } from "mongoose";
import { KodeKEK } from '../../../api-contracts/kode-kek/kode-kek';

export const kodeKEKSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  }
});

export type KodeKEKModel = KodeKEK & Document;

export const KodeKEKModel = model<KodeKEKModel>('kode-kek', kodeKEKSchema);
