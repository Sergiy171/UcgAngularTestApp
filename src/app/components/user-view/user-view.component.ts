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
  
  constructor(
    private dataService: DataService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '');
    
    if (!isNaN(userId)) {
      this.dataService.getUser(userId).subscribe((data: any) => {
        this.user = data as User;
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
        this.router.navigateByUrl('/home');
      });
    } else {
      this.dataService.addUser(this.user as User).subscribe((data: any) => {
        this.router.navigateByUrl('/home');
      });
    }
  }

  deleteUser() {
    this.dataService.deleteUser(this.user?.id || 1).subscribe((data: any) => {
      this.router.navigateByUrl('/home');
    });
  }
}
