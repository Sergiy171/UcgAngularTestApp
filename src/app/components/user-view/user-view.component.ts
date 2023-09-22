import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from 'src/app/enums/user-type';
import { User } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @Input() user: User | null = null;

  userTypes = Object.values(UserType);
  dbUserNames: string[] = [];
  initialUserName: string = '';
  formServerErrors: any;
  responseMessage: string = '';

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '');

    this.dataService.getUsers().subscribe((data: any) => {
      this.dbUserNames = (data as User[]).map((user) => user.userName);;
    });

    if (!isNaN(userId)) {
      this.dataService.getUser(userId).subscribe((data: any) => {
        this.user = data as User;
        this.initialUserName = this.user.userName;
      });
    }
    else {
      this.user = {
        id: this.dataService.randomIntFromInterval(1, 10000),
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: UserType.Driver
      };
    }
  }

  onSubmitTemplate() {
    let routeUserId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '');

    if (!isNaN(routeUserId)) {
      this.dataService.updateUser(this.user as User).subscribe((data: any) => {
        this.displaySuccessMessage();
      }, err => {
        if (err instanceof HttpErrorResponse) {
          this.displayErrorMessage(err.error.message);
        }
      });
    } else {
      this.dataService.addUser(this.user as User).subscribe((data: any) => {
        this.router.navigateByUrl('/home');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          this.displayErrorMessage(err.error.message);
        }
      });
    }
  }

  deleteUser() {
    this.dataService.deleteUser(this.user?.id || 1).subscribe((data: any) => {
      this.router.navigateByUrl('/home');
    }, err => {
      if (err instanceof HttpErrorResponse) {
        this.displayErrorMessage(err.error.message);
      }
    });
  }

  checkUniqueUsername(userNameField: any) {
    if (this.wasUserNameChanged() && !this.isUniqueUsername()) {
      userNameField?.control?.setErrors({"duplicated_name": true});
    }
  }

  private isUniqueUsername(): boolean {
    return !this.dbUserNames.includes(this.user?.userName || '');
  }

  private wasUserNameChanged(): boolean {
    return this.initialUserName !== this.user?.userName;
  }

  displaySuccessMessage(): void {
    this.responseMessage = 'Successfully updated';

    setTimeout(() => {
      this.responseMessage = '';
    }, 5000);
  }

  displayErrorMessage(message: any): void {
    this.formServerErrors = message;

    setTimeout(() => {
      this.formServerErrors = '';
    }, 5000);
  }

  isEditingMode(): boolean {
    let userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '');

    return !isNaN(userId);
  }
}
