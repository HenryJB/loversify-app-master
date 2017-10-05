import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  help: Object;
  contactForm: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _sharedService: SharedProvider,
    public fb: FormBuilder,
    public _authService: AuthProvider
  ) {
    this.createContactForm();
  }

  ionViewDidLoad() {
    this.loadHelp();
  }



  loadHelp() {
    let loader = this._sharedService.loader();
    loader.present();
    this._sharedService.viewTitle('contact')
    .subscribe((res) => {
      loader.dismiss();
      if (res.success) {
        this.help = res.data;
      } else {
        this._sharedService.toaster('Something wrong');
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('Server error');
    })
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
       email: [this._authService.currentUser().email, Validators.required],
       message: ['', Validators.required]
    })
  }

  submit() {
    let loader = this._sharedService.loader();
    
    loader.present();
    this._sharedService.submitMessage(this.contactForm.value)
    .subscribe((res) => {
      loader.dismiss();
      if (res.success) {
        this._sharedService.toaster('Your message has been sent');
      } else {
        this._sharedService.toaster('Something wrong');
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('Server error');
    })
  }

}
