export interface TabbedItemConfig {
  title: string;
  icon: string;
  component: Object;
  singleInstance?: boolean;
}

export interface TabbedItemsConfig {
  list: TabbedItemConfig[];
  pinnedTabs?: TabbedItemConfig[];
}
