export interface TabbedItemConfig {
  title: string;
  icon: string;
  component: Object;
}

export interface TabbedItemsConfig {
  list: TabbedItemConfig[];
  pinnedTabs?: TabbedItemConfig[];
}
