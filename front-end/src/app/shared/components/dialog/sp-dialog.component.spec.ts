import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDialogComponent } from './sp-dialog.component';

describe('SpDialogComponent', () => {
  let component: SpDialogComponent;
  let fixture: ComponentFixture<SpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
