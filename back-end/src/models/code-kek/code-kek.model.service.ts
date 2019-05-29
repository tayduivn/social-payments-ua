import { MongoosePromise } from '../mongoose-promise';
import { CodeKEKModel } from './code-kek.model';
import { uniqueFieldMongoErrorCode } from '../unique-field-error-code.const';

export class CodeKEKModelService {
  public static add(code: string): MongoosePromise<void> {
    return CodeKEKModel.create({code})
      .then(() => {})
      .catch((err) => {
        if (err && err.code === uniqueFieldMongoErrorCode) {
          return;
        } else {
          throw err;
        }
      });
  }

  public static getAll(): MongoosePromise<CodeKEKModel[]> {
    return CodeKEKModel
      .find()
      .sort('code')
  }
}
