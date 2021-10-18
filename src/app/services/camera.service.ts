import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera: Camera
  ) { }

  takePhoto() {
    let options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      allowEdit: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      return imageData;
     }, (err) => {
      // Handle error
      console.log(err);
      // this.commonService.showAlert(AlertTypeEnum.Error, err);
     });
  }
}
