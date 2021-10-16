import { CommonService } from './../../services/common.service';
import { SharedModalPage } from './../shared-modal/shared-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

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

  async onSupport() {
    const modal = await this.modalCtrl.create({
      component: SharedModalPage,
      componentProps: {'flag': 'support'},
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

}
