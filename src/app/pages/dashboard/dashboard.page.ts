import { userInterface } from './../../models/user/user.interface';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userData: userInterface
  total_visits = 5;
  total_approved = 3;
  total_clients_pending = 2;
  visitList: any = [];

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.user.subscribe((data: any) => {
      console.log(data);
      this.userData = data.user;
    });
    this.visitList = [
      {
        id: 1,
        name: 'John Doe',
        amount: '$200',
        status: 0,
      },
      {
        id: 2,
        name: 'Jane Doe',
        amount: '$300',
        status: 0,
      },
      {
        id: 3,
        name: 'Benjamin',
        amount: '$250',
        status: 0,
      },
      {
        id: 4,
        name: 'Harley',
        amount: '$2000',
        status: 1,
      },
    ]
  }

  onViewAll() {
    
  }

}
