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

/**
 * Menu inferior da aplicação;
 */
export class TabsPage implements OnInit {
  matches: String[];
  constructor(
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef,
    private router: Router,
    private textSpeechProvider: TextSpeechProvider,
    private speechRecognitionProvider: SpeechRecognitionProvider,
    private storageProvider: LocalStorageProvider) {}
  
  /**
   * Verifica se a aplicação possui permisão para o uso do microfone,
   * caso não, ele solicita;
   */
  ngOnInit(): void {
    this.speechRecognitionProvider.hasPermission();
  }

  /**
   * Realiza o reconhecimento de voz, executando as funcionalidades:
   * Abrir calendario;
   * Alterar exibição;
   * Adicionar lembrete;
   */
  async microfone() {
    let options = {
      language: 'pt-BR',
      showPopup: true,
    }
    this.speechRecognition.startListening(options)
      .subscribe(
        async (matches: Array < string > ) => {
            console.log(matches);
            this.matches = matches;
            for (let i = 0; this.matches.length > i; i++) {
              if (this.matches[i].toLowerCase().includes("abrir calendário")) {
                this.router.navigate(['tabs/tab3']);
              }
              if (this.matches[i].toLowerCase().includes("alterar exibição")) {
                this.alteraExibicao();
              }
              if (this.matches[i].toLowerCase().includes("adicionar lembrete")) {
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

  /**
   * Altera o modo de exibição do calendário:
   * Mês;
   * Semana;
   * Dia;
   */
  async alteraExibicao() {
    let calendar = await this.storageProvider.onGetCalendar();
    this.textSpeechProvider.speak("Qual seria o modo de exibição?")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true,
        }
        this.speechRecognition.startListening(options)
          .subscribe(
            async (matches: Array < string > ) => {
                console.log(matches);
                this.matches = matches;
                for (let i = 0; this.matches.length > i; i++) {
                  if (this.matches[i].toLowerCase().includes("mês")) {
                    calendar.mode = 'month';
                    break;
                  }
                  if (this.matches[i].toLowerCase().includes("semana")) {
                    calendar.mode = 'week';
                    break;
                  }
                  if (this.matches[i].toLowerCase().includes("dia")) {
                    calendar.mode = 'day';
                    break;
                  }
                }
                await this.storageProvider.onSetCalendar(calendar);
                this.textSpeechProvider.speak("Modo de exibição atualizado!");
                this.cd.detectChanges();
              },
              (onerror) => {
                console.log('error:', onerror);
                //this.microfone();
              }
          )
      });
  }
}