import { Component } from '@angular/core';

export interface TabbedItemConfig {
  title: string;
  icon: string;
  component: Component;
}

export interface TabbedItemsConfig {
  list: TabbedItemConfig[];
  pinnedTabs?: TabbedItemConfig[];
}
