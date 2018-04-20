import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  TabbedItemConfig,
  TabbedItemsConfig
} from './tabbed-items-config.model';

@Component({
  selector: 'sp-tabbed-items',
  templateUrl: './tabbed-items.component.html',
  styleUrls: ['./tabbed-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbedItemsComponent implements OnInit {
  @Input() public items: TabbedItemsConfig;

  constructor() { }

  public listItemTrackFn = (item: TabbedItemConfig) => {
    return item.title;
  };

  ngOnInit() {
  }

}
