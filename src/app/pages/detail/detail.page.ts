import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from './../../services/api.service';
import { CommonService } from './../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  detail: any = {};
  paymentList: any = [];

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    let paramData = JSON.parse(this.route.snapshot.params['id']);
    this.getDetail(paramData);
  }

  async getDetail(paramData: any) {
    this.commonService.showLoader();
    this.api.getLoanRequestDetail(paramData).then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.detail = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }
  
  onRepay(status, id) {
    // console.log(status, id);
    if (status == 1) {
      this.router.navigateByUrl('/repayment/'+JSON.stringify(id));
    } else {
      this.commonService.showAlert(AlertTypeEnum.Information, 'Payment already completed.');
    }
  }

}
