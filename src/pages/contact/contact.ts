import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchPage } from '../search/search';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';



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
    public modalCtrl:ModalController,
    public popoverCtrl: PopoverController,
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
      name : [this._authService.currentUser().first_name, Validators.required ],
      subject: ['', Validators.required],
       email: [this._authService.currentUser().email, Validators.required],
       body: ['', Validators.required]
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
        this.contactForm.reset({email: this._authService.currentUser().email});
      } else {
        this._sharedService.toaster('Something wrong');
      }
    }, err => {
      loader.dismiss();
      this._sharedService.toaster('Server error');
    })
  }

  openSearch() {
    const searchModal = this.modalCtrl.create(SearchPage)
    searchModal.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('MyPopoverPage');
    popover.present({
      ev: myEvent
    });
}



}
