import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockDetailsPage } from './block-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BlockDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BlockDetailsPage),
    PipesModule
  ],
})
export class BlockDetailsPageModule {}
