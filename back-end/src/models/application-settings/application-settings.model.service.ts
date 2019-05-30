import { ApplicationSettingsModel } from './application-settings.model';
import { MongoosePromise } from '../mongoose-promise';
import { ApplicationSettings } from '../../../../api-contracts/application-settings/application-settings';

export class ApplicationSettingsModelService {
  public static getAll(): MongoosePromise<ApplicationSettings> {
    return ApplicationSettingsModel.find({});
  }
}
