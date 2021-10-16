import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from './../../services/api.service';
import { CommonService } from './../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private api: ApiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm() {
    this.loginForm = this.formBuilder.group(
      {
        login_id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        password: new FormControl('', Validators.compose([Validators.required,])),
      },
    );
  }

  async login() {
    if (this.loginForm.valid) {
      this.commonService.showLoader();
      this.api.login(this.loginForm.value).then((data: any) => {
        this.navCtrl.navigateRoot('/dashboard');
      }).catch(err => {
        this.commonService.showAlert(AlertTypeEnum.Error, err.message);
      });
      this.commonService.hideLoader();
    }
  }

}
