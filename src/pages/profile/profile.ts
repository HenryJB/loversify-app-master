import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController,  PopoverController, NavParams, Platform, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  currentUser: any;
  userForm: FormGroup;
  countries: Array<any>;
  lastImage: string = null;
  profileImage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _authService: AuthProvider,
    public fb: FormBuilder,
    public _sharedService: SharedProvider,
    public popoverCtrl: PopoverController,
    private camera: Camera,
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath,
    public platform: Platform,
    public events: Events,
    public actionSheetCtrl : ActionSheetController
  ) {
    this.currentUser = this._authService.currentUser();
    this.createUserForm();
    this.getProfileImage();
  }

  

  
  ionViewDidLoad() {
    this.getCountries();
  }


  getProfileImage() {
    this.profileImage = this._authService.getImage('profileImage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('MyPopoverPage');
    popover.present({
      ev: myEvent
    });
  }
  
  createUserForm() {
    this.userForm =  this.fb.group({
      id: [this.currentUser.id, Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['',  Validators.required],
      phone: [''],
      birthday: [''],
      gender: [''],
      relationship_status: [''],
      country: ['']
    })
  }

 

  getCountries() {
    this._authService.getContries()
    .subscribe((res) => {
       this.countries = res
    }, err => {
      // caught error
    })
  }

  updateUser() {
    let loader = this._sharedService.loader('Updating...');
    loader.present();
    this._authService.update(this.userForm.value)
    .subscribe((res) => {
       if (res.success) {
        this._authService.saveToken('token', res.data.token);
        this.events.publish('user:currentUser', this._authService.currentUser());
        loader.dismissAll();
        this._sharedService.toaster('Updated');
        
       } else {
        loader.dismissAll();
        this._sharedService.toaster('Unable to update');
       }
    }, err => {
      loader.dismissAll();
      this._sharedService.toaster('Server Error');
    })
  }


  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
          });
      } else {
        // var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        // var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this._sharedService.toaster('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage()
    }, error => {
      this._sharedService.toaster('Error while storing file.');
    });
  }
   

   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }




  public uploadImage() {
    // Destination URL
    var url = "http://app.loversify.com/api/users/upload";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    this._authService.saveToken('profileImage', targetPath);
    this.getProfileImage();
    this.events.publish('user:picture', targetPath)

    var imgBlob = new Blob([targetPath], {
        type: "image/jpeg"
    });
   
    // File name only
    var filename = this.lastImage;

    let fd = new FormData();
    
    fd.append('photo', imgBlob);
    fd.append('id', this.currentUser.id);
    fd.append('photoname', 'user-image-' + ".jpg");
    let loader = this._sharedService.loader('Uploading....');
    loader.present();
    this._sharedService.upload(fd).subscribe((res) => {
      if (res.success) {
        loader.dismissAll();
        this._sharedService.toaster('Image succesful uploaded.');
        console.log(res)
      } else {
        loader.dismissAll()
      }
    }, err => {
        loader.dismissAll()
        this._sharedService.toaster('Error while uploading file.');
    })
  }

  public presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
}
