import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	img

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private camera: Camera, private socialSharing: SocialSharing) {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Facebook',
          // role: 'destructive',
          handler: () => {
            this.socialSharing.shareViaFacebook('messageFB', this.img).then(() => {
            	console.log('success share to fb');
			  // Success!
			}).catch(() => {
            	console.log('error share to fb');
			  // Error!
			});
          }
        },{
          text: 'Instagram',
          handler: () => {
            this.socialSharing.shareViaInstagram('messageInst', this.img).then(() => {
            	console.log('success share to insta');
			  // Success!
			}).catch(() => {
            	console.log('error share to insta');
			  // Error!
			});
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(){
  	 const options: CameraOptions = {
	  quality: 100,
	  destinationType: this.camera.DestinationType.DATA_URL,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE
	}

	this.camera.getPicture(options).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64:
	 let base64Image = 'data:image/jpeg;base64,' + imageData;
	 this.img = base64Image;
	}, (err) => {
	 // Handle error
	});
  }
}
