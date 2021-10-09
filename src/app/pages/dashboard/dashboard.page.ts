import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: any = {
    name: 'Developer',
  };

  visitList: any = [];

  constructor() { }

  ngOnInit() {
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
