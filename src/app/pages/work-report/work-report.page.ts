import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.page.html',
  styleUrls: ['./work-report.page.scss'],
})
export class WorkReportPage implements OnInit {

  reportForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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

}
