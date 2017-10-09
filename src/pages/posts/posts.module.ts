import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsPage } from './posts';
import { StriphtmlPipe } from '../../pipes/striphtml/striphtml';

@NgModule({
  declarations: [
    PostsPage,
    StriphtmlPipe
  ],
  imports: [
    IonicPageModule.forChild(PostsPage),
  ],
})
export class PostsPageModule {}
