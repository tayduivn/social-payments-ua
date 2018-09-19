import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {
  TabbedItemConfig,
  TabbedItemsConfig
} from './tabbed-items-config.model';

export interface TabbedItemConfigInner extends TabbedItemConfig {
  sticky?: boolean;
}

@Component({
  selector: 'sp-tabbed-items',
  templateUrl: './tabbed-items.component.html',
  styleUrls: ['./tabbed-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbedItemsComponent implements AfterViewInit {
  @Input() public set items(val: TabbedItemsConfig) {
    this._items = val;

    val.pinnedTabs.forEach((item: TabbedItemConfigInner) => item.sticky = true);
    this.openedTabs = (val.pinnedTabs || []).concat();
  }
  public get items(): TabbedItemsConfig {
    return this._items;
  }

  public openedTabs: TabbedItemConfigInner[] = [];

  @ViewChildren('tabContent', {
    read: ViewContainerRef
  }) private tabContentRef: QueryList<ViewContainerRef>;

  private _items: TabbedItemsConfig;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) { }

  public ngAfterViewInit() {
    // first round only pinned tabs have a container created by ngFor
    const views = this.tabContentRef.toArray();

    views.forEach((view: any, index: number) => {
      this.loadComponent(this.openedTabs[index].component, view);
    });
  }

  public onItemClick(item: TabbedItemConfig) {
    this.openedTabs.push(item);

    setTimeout(() => {
      this.loadComponent(this.openedTabs[this.openedTabs.length - 1].component, this.tabContentRef.last)
    })
  }

  public onTabcloseClick(index: number) {
    console.log(index);
    this.openedTabs.splice(index, 1);
  }

  private loadComponent(component: any, container: ViewContainerRef) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    container.clear();
    const compRef = container.createComponent(componentFactory);

    this.addClass(compRef);
    // compRef.instance.data = {};
  }

  private addClass(cmp: ComponentRef<any>) {
    this.renderer.addClass(cmp.location.nativeElement, 'sp-tabbed-item-inserted');
  }
}
