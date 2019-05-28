import { MongoosePromise } from '../mongoose-promise';
import { CodeKEKModel } from './code-kek.model';

export class CodeKekModelService {
  public static getAll(): MongoosePromise<CodeKEKModel[]> {
    return CodeKEKModel
      .find()
      .sort('code')
  }
}
