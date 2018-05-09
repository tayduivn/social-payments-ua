import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultifieldAutocompleteComponent } from './multifield-autocomplete.component';

describe('MultifieldAutocompleteComponent', () => {
  let component: MultifieldAutocompleteComponent;
  let fixture: ComponentFixture<MultifieldAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultifieldAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultifieldAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
