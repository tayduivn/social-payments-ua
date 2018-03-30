import {
  model,
  Schema,
  Document,
} from 'mongoose';

const DbInfoSchema = new Schema({
  version: String
});

export interface DbInfoModel extends Document {
  version: string;
}

export const DbInfoModel = model<DbInfoModel>('DbInfo', DbInfoSchema);