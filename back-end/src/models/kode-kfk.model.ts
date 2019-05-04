import { Document, model, Schema } from "mongoose";
import { KodeKFK } from '../../../api-contracts/kode-kfk/kode-kfk';

export const kodeKFKSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  }
});

export type KodeKFKModel = KodeKFK & Document;

export const KodeKFKModel = model<KodeKFKModel>('kode-kfk', kodeKFKSchema);
