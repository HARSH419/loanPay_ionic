import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../services/api.service';
import { CommonService } from './../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.page.html',
  styleUrls: ['./request-list.page.scss'],
})
export class RequestListPage implements OnInit {

  loanList: any = [];

  constructor(
    private commonService: CommonService,
    private api: ApiService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.commonService.showLoader();
    this.api.getLoanRequestList().then((data: any) => {
      if (data.status == 200) {
        console.log(data);
        this.loanList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

  async onUpdate(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Is file charge paid?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.commonService.showLoader();
            this.api.updateStatus(id, {status: 1}).then((data: any) => {
              console.log(data);
              if (data.status == 200) {
                this.loanList = [];
                this.commonService.showToast(data.data);
                this.getList();
              }
            }).catch(err => {
              this.commonService.showAlert(AlertTypeEnum.Error, err.message);
            });
          }
        }
      ]
    });
    alert.present();
  }

  onDetail(id: any) {
    this.router.navigateByUrl('/detail/'+JSON.stringify(id));
  }

}
