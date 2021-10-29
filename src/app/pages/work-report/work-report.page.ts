import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from './../../services/api.service';
import { CommonService } from './../../services/common.service';
import { AlertTypeEnum } from '../../services/error-handler/alert-type.enum';

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.page.html',
  styleUrls: ['./work-report.page.scss'],
})
export class WorkReportPage implements OnInit {

  reportForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm() {
    this.reportForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        mobile: new FormControl('', Validators.compose([Validators.required,])),
        email: new FormControl('', Validators.compose([Validators.required,])),
        address: new FormControl('', Validators.compose([Validators.required,])),
      },
    );
  }

  async submit() {
    if (this.reportForm.valid) {
      this.commonService.showLoader();
      this.api.workReport(this.reportForm.value).then((data: any) => {
        console.log(data);
        if (data.status == 200) {
          this.commonService.showAlert(AlertTypeEnum.Information, data.message);
          this.reportForm.reset();
        }
      }).catch(err => {
        console.log(err);
        this.commonService.showAlert(AlertTypeEnum.Error, err.message.slice(0, err.message.indexOf('\\')));
      });
    }
  }

}
