import { ApiService } from './../../services/api.service';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { SharedModalPage } from '../shared-modal/shared-modal.page';
import { AlertTypeEnum } from 'src/app/services/error-handler/alert-type.enum';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {

  addClientForm: FormGroup;
  casteList: any = [];
  loanList: any = [];
  loanTypeList: any = [];
  show: boolean;
  passedData: any = {};
  loanSelected: any;

  userImage: string = null;
  aadhaar_front: string = null;
  aadhaar_back: string = null;
  pan: string = null;
  ca: string = null;
  salary_slip: string = null;
  showForm: boolean;
  OTP: any;
  opt1: any;
  opt2: any;
  opt3: any;
  opt4: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private api: ApiService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.show = false;
    this.showForm = true;
    this._buildForm();
    this.getLoanTypes();
    this.getLoanAmount();
    this.getCastes();
  }

  private _buildForm() {
    this.addClientForm = this.formBuilder.group(
      {
        name: new FormControl('test', Validators.compose([Validators.required, Validators.minLength(3)])),
        father_name: new FormControl('test abc', Validators.compose([Validators.required, Validators.minLength(3)])),
        mobile: new FormControl('9090909098', Validators.compose([Validators.required])),
        address: new FormControl('terrs gagsf ha', Validators.compose([Validators.required])),
        aadhar_number: new FormControl('123123456765', Validators.compose([Validators.required])),
        pan_number: new FormControl('basnv23757', Validators.compose([Validators.required])),
        account: new FormControl('5152415625162761', Validators.compose([Validators.required])),
        ifsc: new FormControl('BNK123', Validators.compose([Validators.required])),
        bank: new FormControl('BANK', Validators.compose([Validators.required])),
        caste: new FormControl('', Validators.compose([Validators.required])),
        loan_type_id: new FormControl('', Validators.compose([Validators.required])),
        loan_id: new FormControl('', Validators.compose([Validators.required])),
        aadhar_front_image: new FormControl('', Validators.compose([])),
        aadhar_back_image: new FormControl('', Validators.compose([])),
        image: new FormControl('', Validators.compose([])),
        pan_card_image: new FormControl('', Validators.compose([])),
        salary_slip: new FormControl('', Validators.compose([])),
        ca_report: new FormControl('', Validators.compose([])),
        installment_time_id: new FormControl('', Validators.compose([])),
        subsidy: new FormControl('', Validators.compose([])),
        payable_amount: new FormControl('', Validators.compose([])),
        fee: new FormControl('', Validators.compose([])),
        otp: new FormControl('', Validators.compose([]))
      },
      // {
      //   name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      //   father_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      //   mobile: new FormControl('', Validators.compose([Validators.required])),
      //   address: new FormControl('', Validators.compose([Validators.required])),
      //   aadhar_number: new FormControl('', Validators.compose([Validators.required])),
      //   pan_number: new FormControl('', Validators.compose([Validators.required])),
      //   account: new FormControl('', Validators.compose([Validators.required])),
      //   ifsc: new FormControl('', Validators.compose([Validators.required])),
      //   bank: new FormControl('', Validators.compose([Validators.required])),
      //   caste: new FormControl('', Validators.compose([Validators.required])),
      //   loan_type_id: new FormControl('', Validators.compose([Validators.required])),
      //   loan_id: new FormControl('', Validators.compose([Validators.required])),
      //   aadhar_front_image: new FormControl('', Validators.compose([])),
      //   aadhar_back_image: new FormControl('', Validators.compose([])),
      //   image: new FormControl('', Validators.compose([])),
      //   pan_card_image: new FormControl('', Validators.compose([])),
      //   salary_slip: new FormControl('', Validators.compose([])),
      //   ca_report: new FormControl('', Validators.compose([])),
      //   installment_time_id: new FormControl('', Validators.compose([])),
      //   subsidy: new FormControl('', Validators.compose([])),
      //   payable_amount: new FormControl('', Validators.compose([])),
      //   fee: new FormControl('', Validators.compose([])),
      //   otp: new FormControl('', Validators.compose([]))
      // },
    );
  }

  async getLoanTypes() {
    this.api.loanType().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.loanTypeList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }
  
  async getLoanAmount() {
    this.api.loanAmount().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.loanList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }
  
  async getCastes() {
    this.api.casteList().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.casteList = data.data;
      }
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

  async loanSelection(event: any) {
    console.log(event);
    // if (event.detail.value.loan_amount >= 100000) {
    //   this.show = true;
    //   this.loanSelected = event.detail.value.id;
    // } else {
    //   this.show = false;
    // }
    this.loanList.filter((data: any) => {
      if (data.id == event.detail.value) {
        var demo = data.loan_amount;
        if (demo >= 100000) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    });

    const modal = await this.modalCtrl.create({
      component: SharedModalPage,
      componentProps: {'flag': 'loan', 'loan_id': event.detail.value},
      swipeToClose: true
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data) {
      if (data.rejected) {
        this.navCtrl.navigateRoot('/dashboard');
      } 
      if (data.pass) {
        this.passedData = data.pass;
        console.log(this.passedData);
      }
    } else {
      console.log('dismissed');
    }
  }

  async onProductImage(flag?: any) {
    console.log('Image Segment!');
    let actionSheet = this.actionSheetCtrl.create({
      header: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler(1, flag);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2, flag);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    (await actionSheet).present();
  }

  actionHandler(selection: any, flag: any) {
    let options: CameraOptions;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        allowEdit: true,
      };
    } else if (selection == 2) {
      options = {
        quality: 75,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        allowEdit: true
      };
    } else {
      options = {
        quality: 75,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        allowEdit: true
      };
    }


    if (selection == 1 || selection == 2) {
      this.getImg(options, flag);
    }
  }

  getImg(options: CameraOptions, flag: any) {
    this.camera.getPicture(options).then((imageData) => {
      if (flag == 1) {
        this.userImage = 'data:image/jpeg;base64,' + imageData;
      } else if (flag == 2) {
        this.aadhaar_front = 'data:image/jpeg;base64,' + imageData;
      } else if (flag == 3) {
        this.aadhaar_back = 'data:image/jpeg;base64,' + imageData;
      } else if (flag == 4) {
        this.pan = 'data:image/jpeg;base64,' + imageData;
      } else if (flag == 5) {
        this.ca = 'data:image/jpeg;base64,' + imageData;
      } else if (flag == 6) {
        this.salary_slip = 'data:image/jpeg;base64,' + imageData;
      } else {
        console.log('Selection Fail!');
      }
      // console.log(this.base64Image);
     }, (err) => {
      // Handle error
      console.log(err);
      this.commonService.showAlert(AlertTypeEnum.Error, err);
     });
  }

  async verify() {
    try {
      await this.checkFunction();
      if (this.addClientForm.valid) {
        this.addClientForm.patchValue({
          'image': this.userImage,
          'aadhar_back_image': this.aadhaar_back,
          'aadhar_front_image': this.aadhaar_front,
          'ca_report': this.ca,
          'pan_card_image': this.pan,
          'salary_slip': this.salary_slip,
          'installment_time_id': this.passedData.installment_time_id,
          'subsidy': this.passedData.subsidy,
          'payable_amount': this.passedData.payable_amount,
          'fee': this.passedData.fee
        });
        console.log(this.addClientForm.value);
        this.api.otpVerify({mobile: this.addClientForm.value.mobile}).then((data: any) => {
          console.log(data);
          if (data.status == 200) {
            this.showForm = false;
          }
        }).catch(err => {
          this.commonService.showAlert(AlertTypeEnum.Error, err.message);
        });
      }
    } catch(err) {
      this.commonService.showAlert(AlertTypeEnum.Error, err);
    }
  }

  async checkFunction() {
    return new Promise((resolve, reject) => {
      if (!this.userImage) {
        reject('User Image is mandatory');
      } else if (!this.aadhaar_back || !this.aadhaar_front) {
        reject('Aadhaar Images are mandatory');
      } else if (!this.pan) {
        reject('Pan Card is mandatory');
      } else if (this.show) {
        if (!this.ca) {
          reject('CA Image is mandatory');
        } else if (!this.salary_slip) {
          reject('Salary Slip is mandatory');
        } else {
          resolve(true);
        }
      } else {
        resolve(true);
      }
    });
  }

  otpController(event, next, prev){
    if(event.target.value.length < 1 && prev){
      // prev.setFocus()
    }
    else if(next && event.target.value.length > 0){
      next.setFocus();
    }
    else {
     return 0;
    } 
  }

  OTPVerify() {
    this.commonService.showLoaderExtend();
    this.commonService.showToast('Images take time to upload...');
    let otpPin = `${this.opt1}${this.opt2}${this.opt3}${this.opt4}`
    console.log('->', otpPin);
    this.addClientForm.patchValue({
      'otp': otpPin
    });
    this.api.verify(this.addClientForm.value).then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.showForm = true;
        this.addClientForm.reset();
        this.commonService.showAlert(AlertTypeEnum.Information, data.message);
        this.navCtrl.navigateRoot('/dashboard');
      } else {
        console.log('else:', data);
        let temp = data.errors;
        var k = Object.keys(temp)
        for(var i=0;i<k.length; i++){
          let p= k[i];
          this.commonService.showAlert(AlertTypeEnum.Warning, data.errors[p]);
        }
      }
      this.commonService.hideLoader();
    }).catch(err => {
      this.commonService.hideLoader();
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    })
  }

}
