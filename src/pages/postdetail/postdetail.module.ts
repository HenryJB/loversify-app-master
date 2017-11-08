import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostdetailPage } from './postdetail';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { StriphtmlPipe } from '../../pipes/striphtml/striphtml';

@NgModule({
  declarations: [
    PostdetailPage,
    StriphtmlPipe
  ],
  providers: [
    SocialSharing,
    Clipboard
  ],
  imports: [
    IonicPageModule.forChild(PostdetailPage),
  ],
})
export class PostdetailPageModule {}
