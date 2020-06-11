import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Router } from '@angular/router';
import { TextSpeechProvider } from 'src/providers/textSpeech';
import { SpeechRecognitionProvider } from 'src/providers/speechRecognition';
import { LocalStorageProvider } from 'src/providers/localStorage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  matches: String[];
  constructor(
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef,
    private router: Router,
    private textSpeechProvider: TextSpeechProvider,
    private speechRecognitionProvider: SpeechRecognitionProvider,
    private storageProvider: LocalStorageProvider) {}
    
  ngOnInit(): void {
      this.speechRecognitionProvider.hasPermission();
    //this.getPermission();
  }
  getPermission() {
    this.speechRecognition.hasPermission()
      .then(async (hasPermission: boolean) => {
        if (!hasPermission) {
          await this.speechRecognition.requestPermission();
          //this.microfone();
        }
      });  
  }

  async microfone(){ 
    let options = {
      language: 'pt-BR',
      showPopup: true,
    }
    this.speechRecognition.startListening(options)
  .subscribe(
    async (matches: Array<string>) => {
      console.log(matches);
      this.matches = matches;
      for (let i = 0; this.matches.length > i; i++){
        if (this.matches[i].toLowerCase().includes("abrir calendário")){
          this.router.navigate(['tabs/tab3']);
        }
        if (this.matches[i].toLowerCase().includes("alterar exibição")){
          this.alteraExibicao();
        }
        if (this.matches[i].toLowerCase().includes("adicionar lembrete")){
          this.router.navigate(['tabs/tab2']);
        }
      } 
      //this.microfone();
    },
    (onerror) => {
      console.log('error:', onerror);
      //this.microfone();
    }
  )
      this.cd.detectChanges();
  }

  async alteraExibicao(){
    let calendar = await this.storageProvider.onGetCalendar(); 
    this.textSpeechProvider.speak("Qual seria o modo de exibição?")
    .then(res=>{
    let options = {
      language: 'pt-BR',
      showPopup: true,
    }
    this.speechRecognition.startListening(options)
  .subscribe(
    async (matches: Array<string>) => {
      console.log(matches);
      this.matches = matches;
      for (let i = 0; this.matches.length > i; i++){
        if (this.matches[i].toLowerCase().includes("semana")){
          calendar.mode = 'week';
        }
        if (this.matches[i].toLowerCase().includes("mês")){
          calendar.mode = 'month';
        }
        if (this.matches[i].toLowerCase().includes("dia")){
          calendar.mode = 'day';
        }
      }
      this.textSpeechProvider.speak("Modo de exibição atualizado!");
      this.storageProvider.onSetCalendar(calendar);
    },
    (onerror) => {
      console.log('error:', onerror);
      //this.microfone();
    }
    )
  });
  }
}
