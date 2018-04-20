import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef
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
export class TabbedItemsComponent implements AfterViewInit {
  @Input() public items: TabbedItemsConfig;

  @ViewChildren('tabContent', {
    read: ViewContainerRef
  }) private tabContentRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public listItemTrackFn = (item: TabbedItemConfig) => {
    return item.title;
  };

  public ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // debugger;
  }

  private loadComponent(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.tabContentRef.clear();
    this.tabContentRef.createComponent(componentFactory);
  }
}
