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
  
  // async loanAmount() {
  //   return new Promise((resolve, reject) => {
  //     this.requestManager.get('loan-amounts').subscribe((data: any) => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log(err);
  //       reject(new Error(err.error, err.status));
  //     });
  //   });
  // }
}
