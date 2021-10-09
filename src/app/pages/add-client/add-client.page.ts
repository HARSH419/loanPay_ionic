import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SharedModalPage } from '../shared-modal/shared-modal.page';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

  addClientForm: FormGroup;
  casteList: any = [];
  loanList: any = [];
  show: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.show = false;
    this._buildForm();
    this.casteList = [
      {
        id: 1,
        name: 'Dummy'
      },
      {
        id: 2,
        name: 'Dummy 1'
      },
      {
        id: 3,
        name: 'Dummy 2'
      },
      {
        id: 4,
        name: 'Dummy 3'
      },
      {
        id: 5,
        name: 'Dummy 4'
      },
    ];
    this.loanList = [
      {
        id: 1,
        amount: 50000
      },
      {
        id: 2,
        amount: 100000
      },
      {
        id: 3,
        amount: 150000
      },
      {
        id: 4,
        amount: 200000
      },
      {
        id: 5,
        amount: 500000
      },
    ];
  }

  private _buildForm() {
    this.addClientForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        father_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        mobile: new FormControl('', Validators.compose([Validators.required])),
        address: new FormControl('', Validators.compose([Validators.required])),
        aadhaar: new FormControl('', Validators.compose([Validators.required])),
        pan: new FormControl('', Validators.compose([Validators.required])),
        caste: new FormControl('', Validators.compose([Validators.required])),
        loan: new FormControl('', Validators.compose([Validators.required])),
      },
    );
  }

  async loanSelection(event: any) {
    console.log(event);
    if (event.detail.value.amount >= 100000) {
      this.show = true;
    } else {
      this.show = false;
    }
    const modal = await this.modalCtrl.create({
      component: SharedModalPage,
      componentProps: {'flag': 'loan'},
      swipeToClose: true
    });
    modal.present();
  }

}
