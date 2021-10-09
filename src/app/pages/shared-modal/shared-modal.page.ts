import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.page.html',
  styleUrls: ['./shared-modal.page.scss'],
})
export class SharedModalPage implements OnInit {

  @Input() flag: string;
  title: string;
  queryForm: FormGroup;
  loanApprovalForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private callNumber: CallNumber,
    private email: EmailComposer
  ) { }

  ngOnInit() {
    if (this.flag == 'support') {
      this.title = 'Customer Support';
      this._buildFormSupport();
    } else if (this.flag == 'loan') {
      this.title = 'Loan Details'
      // this._buildFormLoan();
    } else {
      this.title = 'Error';
    }
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
        query: new FormControl('', Validators.compose([Validators.required,])),
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

}
