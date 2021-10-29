import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, NavController } from '@ionic/angular';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { ApiService } from './../../services/api.service';
import { CommonService } from './../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.page.html',
  styleUrls: ['./shared-modal.page.scss'],
})
export class SharedModalPage implements OnInit {

  @Input() flag: string;
  @Input() loan_id: any;
  title: string;
  queryForm: FormGroup;
  paymentList: any = [];
  loanApprovalForm: FormGroup;
  durationList: any = [];
  selectedDurationData: any = {};
  showDetail: boolean;
  fee: any;
  subsidyList: any = [];
  totalPayableAmount: any;
  subsidySelected: any = null;
  number_call: any;
  email_call: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private callNumber: CallNumber,
    private email: EmailComposer,
    private commonService: CommonService,
    private api: ApiService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // console.log(this.loan_id);
    if (this.flag == 'support') {
      this.title = 'Customer Support';
      this._buildFormSupport();
      this.getSupportContacts();
    } else if (this.flag == 'loan') {
      this.title = 'Loan Details'
      // this._buildFormLoan();
      this.showDetail = false;
      this.getLoanDetails();
    } else if (this.flag == 'payment') {
      this.title = 'Payment Options';
      this.getPaymentOptions();
    } else {
      this.title = "Error"
    }

  }

  async getSupportContacts() {
    this.api.getContacts().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.number_call = data.data.contact_no;
        this.email_call = data.data.email;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    })
  }

  async getLoanDetails() {
    this.commonService.showLoader();
    this.api.loanAmountDetails(this.loan_id).then((data: any) => {
      console.log(data);
      if (data.status = 200) {
        this.durationList = data.data.installments;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
    
    this.api.getExecutiveFee().then((data: any) => {
      console.log(data);
      if (data.status = 200) {
        this.fee = data.fee;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
    
    this.api.subsidy().then((data: any) => {
      console.log(data);
      if (data.status = 200) {
        this.subsidyList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

  private _buildFormSupport() {
    this.queryForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        mobile: new FormControl('', Validators.compose([Validators.required,])),
        email: new FormControl('', Validators.compose([Validators.required,])),
        remark: new FormControl('', Validators.compose([Validators.required,])),
      },
    );
  }

  onCall() {
    this.callNumber.callNumber("18001010101", true)/*change number*/.then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }

  onEmail() {
    let email = {
      to: 'max@mustermann.de', //change email
      subject: 'Query',
      body: 'How are you? Nice greetings from Leipzig',
    };
    this.email.open(email);
  }

  // private _buildFormLoan() {
  //   this.loanApprovalForm = this.formBuilder.group(
  //     {
  //       time: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
  //       amount: new FormControl('', Validators.compose([Validators.required,])),
  //       intrest: new FormControl('', Validators.compose([Validators.required,])),
  //     },
  //   );
  // }

  loanSelection(event: any) {
    // console.log(event);
    this.showDetail = true;
    this.durationList.filter((data => {
      if (data.id == event.detail.value) {
        this.selectedDurationData = data;
        this.totalPayableAmount = this.selectedDurationData.payable_amount + this.fee;
        console.log('Selected: ', this.selectedDurationData);
      }
    }));
  }
  
  subsidySelection(event: any) {
    console.log(event);
    this.subsidySelected = event.detail.value.subsidy;
    let difference = (this.selectedDurationData.payable_amount * (event.detail.value.subsidy / 100));
    this.totalPayableAmount = this.selectedDurationData.payable_amount - difference;
    console.log(this.totalPayableAmount);
  }

  async onReject() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: 'Are you sure want to reject this form?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.modalCtrl.dismiss({'rejected': true});
          }
        }
      ]
    });
    
    await alert.present();
  }

  onApprove() {
    let body = {
      installment_time_id: this.selectedDurationData.id,
      subsidy: this.subsidySelected,
      payable_amount: this.totalPayableAmount,
      fee: this.fee
    };
    this.modalCtrl.dismiss({'pass': body});
  }

  async query() {
    if (this.queryForm.valid) {
      this.commonService.showLoader();
      this.api.submitQuery(this.queryForm.value).then((data: any) => {
        console.log(data);
        if (data.status == 200) {
          this.commonService.showAlert(AlertTypeEnum.Information, data.message);
          this.onClose();
        }
      }).catch(err => {
        this.commonService.showAlert(AlertTypeEnum.Error, err.message);
      });
    }
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

}
