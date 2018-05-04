import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MatTableDataSource
} from '@angular/material';
import * as _ from 'lodash';
import {
  filter,
  map
} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { UserResponseModel } from '../../../../../api-contracts/user/user-response.model';
import { ComponentBase } from '../../shared/components/common/component-base';
import { SpDialogType } from '../../shared/components/sp-dialog/sp-dialog-type.enum';
import { SpDialogService } from '../../shared/components/sp-dialog/sp-dialog.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDialogModel } from './user-dialog/user-dialog.model';
import { UsersService } from './users.service';

@Component({
  selector: 'sp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent extends ComponentBase implements OnInit {
  public displayedColumns = ['login', 'fullName', 'admin'];
  public usersDataSource = new MatTableDataSource();
  public selectedUser: UserResponseModel = null;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private spDialogService: SpDialogService,
    private usersService: UsersService) {
      super();
  }

  public ngOnInit() {
    this.componentSubscriptions = this.usersService.getUsers().subscribe((users: UserResponseModel[]) => {
      console.log('users collection updated');
      this.usersDataSource.data = _.sortBy(users, ['login']);
      this.cdRef.markForCheck();
    });
  }

  public usersTrackFn(index: number, user: UserResponseModel): string {
    return user.id;
  }

  public openUserDialog() {
    const dialog = this.dialog.open(UserDialogComponent, {
      data: this.selectedUser
    });

    dialog.afterClosed().subscribe((userInfo: UserDialogModel) => {
      if (!userInfo) { return; }

      this.componentSubscriptions.add(this.usersService.submitUser(userInfo).subscribe(() => {
        console.log('user submitted');
      }));
    });
  }

  public rowClick(row: UserResponseModel) {
    this.selectedUser = this.selectedUser === row ? null : row;
  }

  public removeUser() {
    // remember currently selected user's id since
    // at the moment when usersService.removeUser (after user confirms dialog prompt) will ask for id
    // it not exists (clicked outside action already removed it)
    const userId = this.selectedUser.id;

    this.spDialogService.open({
      type: SpDialogType.Confirm,
      text: 'Ви справді бажаєте видалити користувача?'
    }).pipe(
      filter((confirmed: boolean) => confirmed),
      map(() => {
        this.componentSubscriptions.add(this.usersService.removeUser(userId).subscribe());
      })
    ).subscribe();
  }
}
