import { SpDialogType } from './sp-dialog-type.enum';

export interface SpDialogConfigModel {
  type: SpDialogType;
  title?: string;
  text: string;
}
