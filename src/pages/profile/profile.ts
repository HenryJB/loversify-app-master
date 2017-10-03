import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  currentUser: any;
  userForm: FormGroup;
  countries: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _authService: AuthProvider,
    public fb: FormBuilder,
    public _sharedService: SharedProvider,
    public popoverCtrl: PopoverController,
  ) {
    this.currentUser = this._authService.currentUser();
    this.createUserForm();
  }

  
  ionViewDidLoad() {
    this.getCountries();
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
      username: [''],
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
    this._authService.update(this.userForm.value)
    .subscribe((res) => {
       if (res.success) {
        this._sharedService.toaster('Updated');
       } else {
        this._sharedService.toaster('Unable to update');
       }
    }, err => {
      this._sharedService.toaster('Server Error');
    })
  }

  


}
