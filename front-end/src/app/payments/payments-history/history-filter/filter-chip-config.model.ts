import { FilterType } from './shared/filter-type.enum';

export interface FilterChipConfigModel {
  text: string;
  title?: string;
  type: FilterType
}
