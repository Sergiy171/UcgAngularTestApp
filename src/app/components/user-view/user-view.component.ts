import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '');
    
    if (!isNaN(userId)) {
      this.dataService.getUser(userId).subscribe((data: any) => {
        this.user = data as User;
      });
    }
  }

  onSubmitTemplate() {
    console.log('onSubmitTemplate() clicked', this.user);
  }
}
