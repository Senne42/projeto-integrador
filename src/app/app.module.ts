import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { LocalStorageProvider } from '../providers/localStorage'

import { IonicStorageModule } from '@ionic/storage';
import { registerLocaleData } from '@angular/common'; //import pra deixar a aplicação em ptBr
import ptBr from '@angular/common/locales/pt';
import { TextSpeechProvider } from 'src/providers/textSpeech';
import { SpeechRecognitionProvider } from 'src/providers/speechRecognition';
registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    TextToSpeech,
    LocalStorageProvider,
    TextSpeechProvider,
    SpeechRecognitionProvider,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
