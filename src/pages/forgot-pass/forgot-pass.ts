import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { AuthProvider } from '../../providers/auth/auth';
import { SharedProvider } from '../../providers/shared/shared';


@IonicPage()
@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html',
})
export class ForgotPassPage {
  public restPasswordForm: FormGroup;

  constructor(
    
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public _authService: AuthProvider,
    public _sharedService: SharedProvider
  )
   {  
     this.createForm();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassPage');
  }

  createForm() {
    this.restPasswordForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  resetPassWord() {
    let loader = this._sharedService.loader();
    loader.present().then(() => {
      this._authService.resetPassword(this.restPasswordForm.value)
        .subscribe((resp) => {
          if (resp.success) {
            this.restPasswordForm.reset();
            this._sharedService.toaster('Password rest information has been sent to your email');
            loader.dismiss();
          } else {
            loader.dismiss();
            this._sharedService.toaster('internal server error');
          }
        }, (err) => {
          // Unable to log in
          loader.dismiss();
          this._sharedService.toaster('internal server error');
      });
    })
  }


  



}
