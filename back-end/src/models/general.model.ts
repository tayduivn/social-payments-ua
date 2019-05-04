import { Document, model, Schema } from "mongoose";
import { General } from '../../../api-contracts/general';

export const generalSchema = new Schema({
  territoryCode: {
    type: String,
    required: true,
    unique: true
  },
  edrpou: {
    type: String,
    required: true,
    unique: true
  },
  dbVersion: {
    type: String,
    required: true,
    unique: true
  }
});

export type GeneralModel = General & Document;

export const GeneralModel = model<GeneralModel>('general', generalSchema);
