import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';
import { SearchPageModule } from '../pages/search/search.module';
import { CategoryPageModule } from '../pages/category/category.module';
import { CategoryPage } from '../pages/category/category';
import { SharedProvider } from '../providers/shared/shared';
import { CategoryProvider } from '../providers/category/category';
import { PostsProvider } from '../providers/posts/posts';
import { AdMobPro } from '@ionic-native/admob-pro';
import { AdmobproProvider } from '../providers/admobpro/admobpro';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { PipesModule } from '../pipes/pipes.module';

import { AppRate } from '@ionic-native/app-rate';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    tokenName: 'token',
    headerPrefix: 'JWT',
    headerName: 'Authorization',
    globalHeaders: [{'Accept': 'application/json'}, { 'Content-Type': 'application/json' }],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http);
}


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    CategoryPageModule,
    SearchPageModule,
    HttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },
    SharedProvider,
    AdmobproProvider,
    AuthProvider,
    CategoryProvider,
    PostsProvider,
    AdMobPro,
    File,
    Transfer,
    Camera,
    FilePath,
    AppRate
  ]
})
export class AppModule {}
