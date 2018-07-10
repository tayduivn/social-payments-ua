import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAccountsComponent } from './person-accounts.component';

describe('PersonAccountsComponent', () => {
  let component: PersonAccountsComponent;
  let fixture: ComponentFixture<PersonAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
