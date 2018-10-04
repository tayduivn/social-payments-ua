import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Street } from '../../../../api-contracts/street/street';
import { personSchema } from '../person/person.model';

export const userSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  url: String
});

export type StreetModel = Street & Document;

export const StreetModel = model<StreetModel>('Street', personSchema);
