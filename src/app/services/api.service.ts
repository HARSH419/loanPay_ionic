import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { RequestManagerService } from './request-manager.service';
import { Storage } from '@ionic/storage-angular';
import { Error } from './error-handler/error.handler';
import { User } from '../models/user/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private storage: Storage,
    private requestManager: RequestManagerService,
    private commonService: CommonService
  ) {
    // console.log(this.commonService.user.value.token)
  }

  login = async (formData) => {
    return new Promise((resolve, reject) => {
      this.requestManager.post('login', formData).subscribe((data: any) => {
        console.log(data);
        let user = new User(data.data.user, data.data.token);
        this.storage.set('user', user);
        this.commonService.user.next(user);
        resolve(user);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  };

  // async getProfile() {
  //   return new Promise((resolve, reject) => {
  //     this.requestManager.get('profile').subscribe((data: any) => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log(err);
  //       reject(new Error(err.error, err.status));
  //     });
  //   });
  // }

  async dashboardRepayment() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('pending-repayments').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async loanType() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('loan-type').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }

  async loanAmount() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('loan-amounts').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async casteList() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('caste').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async loanAmountDetails(id) {
    return new Promise((resolve, reject) => {
      this.requestManager.get(`loan-amount/${id}`).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async getExecutiveFee() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('executive-fee').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async subsidy() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('subsidy').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async otpVerify(formData) {
    return new Promise((resolve, reject) => {
      this.requestManager.post('verify-mobile', formData).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async verify(formData) {
    return new Promise((resolve, reject) => {
      this.requestManager.post('verify-otp-register', formData).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async workReport(formData) {
    return new Promise((resolve, reject) => {
      this.requestManager.post('add-work-report', formData).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async submitQuery(formData) {
    return new Promise((resolve, reject) => {
      this.requestManager.post('add-enquiry', formData).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async getContacts() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('contacts').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async getStats() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('stats').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async getLoanRequestList() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('loan-requests').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async getLoanRequestDetail(id) {
    return new Promise((resolve, reject) => {
      this.requestManager.get(`loan-request/${id}`).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async updateStatus(id, formData) {
    return new Promise((resolve, reject) => {
      this.requestManager.post(`update-loan-request-status/${id}`, formData).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async paymentMethods() {
    return new Promise((resolve, reject) => {
      this.requestManager.get('payment-methods').subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
  
  async repaymentCollection(id, formData) {
    return new Promise((resolve, reject) => {
      this.requestManager.post(`repayment-collect/${id}`, formData).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        reject(new Error(err.error, err.status));
      });
    });
  }
}
