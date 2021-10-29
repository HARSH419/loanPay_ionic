import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { CommonService } from './../../services/common.service';
import { SharedModalPage } from './../shared-modal/shared-modal.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async onSupport(flag) {
    const modal = await this.modalCtrl.create({
      component: SharedModalPage,
      componentProps: {'flag': flag == 1 ? 'support' : 'payment'},
      swipeToClose: true
    });
    modal.present();
  }

  onLogout() {
    this.commonService.logout().then(() => {
      window.localStorage.clear();
      this.navCtrl.navigateRoot('/home');
    });
  }

  openURL(link: string) {
    window.open(link);
  }

}
