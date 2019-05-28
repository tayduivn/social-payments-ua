import { MongoosePromise } from '../mongoose-promise';
import { CodeKFKModel } from './code-kfk.model';

export class CodeKfkModelService {
  public static getAll(): MongoosePromise<CodeKFKModel[]> {
    return CodeKFKModel
      .find()
      .sort('code')
  }
}
