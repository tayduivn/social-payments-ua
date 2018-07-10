import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedItemsComponent } from './tabbed-items.component';

describe('TabbedItemsComponent', () => {
  let component: TabbedItemsComponent;
  let fixture: ComponentFixture<TabbedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
