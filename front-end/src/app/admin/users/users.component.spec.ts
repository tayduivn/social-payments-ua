import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { SpDialogService } from '../../shared/components/dialog/sp-dialog.service';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [ UsersComponent ],
      providers: [
        {
          provide: SpDialogService,
          useValue: {}
        },
        {
          provide: UsersService,
          useValue: {
            getUsers: Observable.of({}),
            submitUser: Observable.of({})
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
