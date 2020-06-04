import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  matches: String[];
  constructor(private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private router: Router,) {}
  ngOnInit(): void {
    this.getPermission();
  }
  getPermission() {
    this.speechRecognition.hasPermission()
      .then(async (hasPermission: boolean) => {
        if (!hasPermission) {
          await this.speechRecognition.requestPermission();
          this.microfone();
        }
      });  
  }

  microfone(){  
    let options = {
      language: 'pt-BR',
      showPopup: false,
    }
    this.speechRecognition.startListening(options)
  .subscribe(
    (matches: Array<string>) => {
      console.log(matches);
      this.matches = matches;
      for (let i = 0; this.matches.length > i; i++){
        if (this.matches[i].toLowerCase().includes("abrir calendário")){
          this.router.navigate(['tabs/tab3']);
        }
        if (this.matches[i].toLowerCase().includes("adicionar lembrete")){
          this.router.navigate(['tabs/tab2']);
        }
      } 
      this.microfone();
    },
    (onerror) => {
      console.log('error:', onerror);
      this.microfone();
    }
  )
      this.cd.detectChanges();
  }
}
