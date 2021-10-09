import { SharedModalPage } from './../shared-modal/shared-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
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

}
