import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostdetailPage } from './postdetail';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PostdetailPage
  ],
  providers: [
    SocialSharing,
    Clipboard
  ],
  imports: [
    IonicPageModule.forChild(PostdetailPage),
    PipesModule
  ],
})
export class PostdetailPageModule {}
