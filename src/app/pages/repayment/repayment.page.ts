import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.page.html',
  styleUrls: ['./repayment.page.scss'],
})
export class RepaymentPage implements OnInit {

  paymentForm: FormGroup;
  cust_id: number;
  paymentList: any = [];

  constructor(
    private commonService: CommonService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cust_id = JSON.parse(this.route.snapshot.params['id']);
    this._buildForm();
    this.getPaymentOptions();
  }

  private _buildForm() {
    this.paymentForm = this.formBuilder.group(
      {
        payment_date: new FormControl('', Validators.compose([Validators.required])),
        payment_amount: new FormControl('', Validators.compose([Validators.required])),
        payment_method: new FormControl('', Validators.compose([Validators.required])),
      },
    );
  }

  async getPaymentOptions() {
    this.commonService.showLoader();
    this.api.paymentMethods().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.paymentList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

  async onSubmit() {
    this.commonService.showLoader();
    if (this.paymentForm.valid) {
      this.api.repaymentCollection(this.cust_id, this.paymentForm.value).then((data: any) => {
        if (data.status == 200) {
          this.commonService.showAlert(AlertTypeEnum.Information, data.message);
          this.navCtrl.navigateRoot('/dashboard');
        }
      }).catch(err => {
        this.commonService.showAlert(AlertTypeEnum.Error, err.message);
      });
    }
  }

}
