import { Component, OnInit } from '@angular/core';
import { TabbedItemsConfig } from '../layout/tabbed-items/tabbed-items-config.model';

@Component({
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  public paymentComponentItems: TabbedItemsConfig = {
    list: [
      {
        title: 'Новий платіж',
        icon: 'note_add',
        component: {} as any
      },
      {
        title: 'Історія платежів',
        icon: 'history',
        component: {} as any
      }
    ],
    pinnedTabs: [
      {
        title: 'Головна',
        icon: 'bookmark',
        component: {} as any
      }
    ]
  };

  constructor() {
    console.log('PaymentsComponent');
  }

  ngOnInit() {
  }

}
