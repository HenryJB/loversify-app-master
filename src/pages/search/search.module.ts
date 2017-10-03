import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { StriphtmlPipe } from '../../pipes/striphtml/striphtml';

@NgModule({
  declarations: [
    SearchPage,
    StriphtmlPipe
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
  ],
})
export class SearchPageModule {}
