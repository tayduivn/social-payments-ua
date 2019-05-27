import { Document, model, Schema } from 'mongoose';
import { ApplicationSettings } from '../../../../api-contracts/application-settings/application-settings';
import { SettingParamName } from '../../../../api-contracts/application-settings/setting-param-name.type';

const paramNames: SettingParamName[] = [
  'territoryCode',
  'edrpou',
  'dbVersion'
];

export const applicationSettingsSchema = new Schema({
  param: {
    type: String,
    enum: paramNames
  }
});

export type ApplicationSettingsModel = ApplicationSettings & Document;

export const ApplicationSettingsModel = model<ApplicationSettingsModel>('applicationSettings', applicationSettingsSchema, 'applicationSettings');
