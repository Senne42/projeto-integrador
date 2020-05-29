import { Component, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  matches: String[];
  constructor(private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private router: Router,) {}

  microfone(){  
    let options = {
      language: 'pt-BR'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      for (let i = 0; this.matches.length > i; i++){
        if (this.matches[i].toLowerCase().includes("abrir calendário")){
          this.router.navigate(['tabs/tab3']);
        }
        if (this.matches[i].toLowerCase().includes("adicionar lembrete")){
          this.router.navigate(['tabs/tab2']);
        }
    }
      this.cd.detectChanges();
    });
  }

}
