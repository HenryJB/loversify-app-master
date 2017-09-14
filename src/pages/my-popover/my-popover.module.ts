import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPopoverPage } from './my-popover';

@NgModule({
  declarations: [
    MyPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPopoverPage),
  ],
})
export class MyPopoverPageModule {}
