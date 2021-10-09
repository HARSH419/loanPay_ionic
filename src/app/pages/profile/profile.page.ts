import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CommonService } from './../../services/common.service';
import { ApiService } from './../../services/api.service';
import { userInterface } from './../../models/user/user.interface';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  userData: userInterface;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.user.subscribe(async (data: any) => {
      this.userData = data.user;
      await this._buildForm();
    });
    this.profileForm.patchValue({
      'name': this.userData.name,
      'mobile': this.userData.mobile,
      'address': this.userData.address,
      'aadhaar': this.userData.aadhar_number,
      'pan': this.userData.pan_number
    });
  }

  private _buildForm() {
    this.profileForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        mobile: new FormControl('', Validators.compose([Validators.required])),
        address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(12)])),
        aadhaar: new FormControl('', Validators.compose([Validators.required])),
        pan: new FormControl('', Validators.compose([Validators.required])),
      },
    );
  }

}
