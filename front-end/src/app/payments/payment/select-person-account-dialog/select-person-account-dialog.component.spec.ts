import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPersonAccountDialogComponent } from './select-person-account-dialog.component';

describe('SelectPersonAccountDialogComponent', () => {
  let component: SelectPersonAccountDialogComponent;
  let fixture: ComponentFixture<SelectPersonAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPersonAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
