import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { userInterface } from './../../models/user/user.interface';
import { CommonService } from './../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userData: userInterface
  total_visits = 0;
  total_approved = 0;
  total_clients_pending = 0;
  visitList: any = [];
  stat: any = {};

  constructor(
    private commonService: CommonService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.commonService.user.subscribe((data: any) => {
      console.log(data);
      this.userData = data.user;
    });
  }
  
  ionViewWillEnter() {
    this.visitList = [];
    this.getStats();
    this.getRepay();
  }

  async getRepay() {
    this.api.dashboardRepayment().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.visitList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

  async getStats() {
    this.api.getStats().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.stat = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

  repay(id) {
    this.router.navigateByUrl('/repayment/'+JSON.stringify(id));
  }

}
