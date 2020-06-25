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
              if (this.matches[i].toLowerCase().includes("exibir lembretes")) {
                this.router.navigate(['tabs/lembretes']);
              }
              if (this.matches[i].toLowerCase().includes("adicionar evento")) {
                this.adicionarEvento();
              }
              if (this.matches[i].toLowerCase().includes("exibir eventos")) {
                this.exibirEventos();
              }
              if (this.matches[i].toLowerCase().includes("adicionar lembrete")) {
                this.adicionarLembrete();
              }
              if (this.matches[i].toLowerCase().includes("remover lembrete")) {
                this.removerLembrete();
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
    let mode: any;
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
                    mode = 'month';
                    break;
                  }
                  if (this.matches[i].toLowerCase().includes("semana")) {
                    mode = 'week';
                    break;
                  }
                  if (this.matches[i].toLowerCase().includes("dia")) {
                    mode = 'day';
                    break;
                  }
                }
                if (mode){
                  calendar.mode = mode;
                  await this.storageProvider.onSetCalendar(calendar);
                  this.textSpeechProvider.speak("Modo de exibição atualizado!");
                  this.cd.detectChanges();
                }
                else {
                  this.textSpeechProvider.speak("Não entendi, tente novamente");
                }
              },
              (onerror) => {
                console.log('error:', onerror);
                //this.microfone();
              }
          )
      });
  }

  meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

  /**
   * Adiciona o evento, necessita das seguintes informações:
   * Título;
   * data(dia e mês);
   */
  adicionarEvento(){
    this.textSpeechProvider.speak("Informe o título do evento")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true, 
        }
        this.speechRecognition.startListening(options)
      .subscribe(
        async (matches: Array < string > ) => {
          let title = matches[0];
          this.textSpeechProvider.speak("Informe a data do evento")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true, 
        }
        this.speechRecognition.startListening(options)
      .subscribe(
        async (matches: Array < string > ) => {
        let data = matches[0].split(' ');
        let dia = parseInt(data[0]);
        let mes = this.meses.indexOf(data[2].toLowerCase());
        let evento = {
          title: title,
          startTime: new Date(2020,mes,dia,14,10),
          endTime: new Date(2020,mes,dia,15,10),
          allDay: false,       
        }
        let calendar = await this.storageProvider.onGetCalendar();
        calendar.events.push(evento);
         this.storageProvider.onSetCalendar(calendar);
        this.textSpeechProvider.speak("Evento inserido com sucesso");
        this.cd.detectChanges();
        })
      })

        })
      })

  }

  exibirEventos() {
    this.textSpeechProvider.speak("Informe a data para exibição")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true, 
        }
        this.speechRecognition.startListening(options)
      .subscribe(
        async (matches: Array < string > ) => {
          let data = matches[0].split(' ');
          let dia = parseInt(data[0]);
          let mes = this.meses.indexOf(data[2].toLowerCase());
          let calendar = await this.storageProvider.onGetCalendar();
          calendar.currentDate = new Date(2020,mes,dia);
          this.storageProvider.onSetCalendar(calendar);
          this.textSpeechProvider.speak("Data de exibição alterada");
          this.cd.detectChanges();
        })
      })
  }

  adicionarLembrete(){
    this.textSpeechProvider.speak("Informe o lembrete que deseja adicionar")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true, 
        }
        this.speechRecognition.startListening(options)
      .subscribe(
        async (matches: Array < string > ) => {
          let reminder = await this.storageProvider.onGetReminder();
          reminder.push(matches[0])
          this.storageProvider.onSetReminder(reminder);
          this.textSpeechProvider.speak("Lembrete adicionado");
          this.cd.detectChanges();
        })
      })
  }

  removerLembrete(){
    this.textSpeechProvider.speak("Informe o número do lembrete que deseja remover")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true, 
        }
        this.speechRecognition.startListening(options)
      .subscribe(
        async (matches: Array < string > ) => {
          let reminder = await this.storageProvider.onGetReminder();
          let n = parseInt(matches[0])-1;
          if (n>=0 && n<reminder.length){
            reminder.splice(n, 1)
            this.storageProvider.onSetReminder(reminder);
            this.textSpeechProvider.speak("Lembrete removido");
            this.cd.detectChanges();
          }
          else{
            this.textSpeechProvider.speak("Numero informado invalido");
          }
        })
      })
    }
}