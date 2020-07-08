import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Router } from '@angular/router';
import { TextSpeechProvider } from 'src/providers/textSpeech';
import { SpeechRecognitionProvider } from 'src/providers/speechRecognition';
import { LocalStorageProvider } from 'src/providers/localStorage';
import { MenuController } from '@ionic/angular';
import { FilmeProvider } from 'src/providers/filme';


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
    private filmeProvider: FilmeProvider,
    private menu: MenuController,
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
    this.filmeProvider.getFilme()
      .then((res: any) => {
        console.log(res)
      })
    this.speechRecognitionProvider.hasPermission();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
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
                this.router.navigate(['tabs/calendario']);
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
              if (this.matches[i].toLowerCase().includes("remover evento")) {
                this.removerEvento();
              }
              if (this.matches[i].toLowerCase().includes("exibir comandos")) {
                this.exibirComandos();
              }
              if (this.matches[i].toLowerCase().includes("limpar calendário")) {
                this.limparCalendario();
              }
              if (this.matches[i].toLowerCase().includes("limpar lembretes")) {
                this.limparLembretes();
              }
              if (this.matches[i].toLowerCase().includes("editar lembrete")) {
                this.editarLembrete();
              }
              if (this.matches[i].toLowerCase().includes("recomende um filme")) {
                this.recomendaFilme();
              }
              if (this.matches[i].toLowerCase().includes("editar evento")) {
                this.editarEvento();
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
                if (mode) {
                  calendar.mode = mode;
                  await this.storageProvider.onSetCalendar(calendar);
                  this.textSpeechProvider.speak("Modo de exibição atualizado!");
                  this.cd.detectChanges();
                } else {
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
  adicionarEvento() {
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
                        if (dia >= 1 && dia <= 31 && mes != -1) {
                          let evento = {
                            title: title,
                            startTime: new Date(2020, mes, dia),
                            endTime: new Date(2020, mes, dia),
                            allDay: true,
                          }
                          let calendar = await this.storageProvider.onGetCalendar();
                          calendar.events.push(evento);
                          this.storageProvider.onSetCalendar(calendar);
                          this.cd.detectChanges();
                          this.textSpeechProvider.speak("Evento inserido com sucesso, deseja adicionar outro evento?")
                            .then(res => {
                              let options = {
                                language: 'pt-BR',
                                showPopup: true,
                              }
                              this.speechRecognition.startListening(options)
                                .subscribe(
                                  async (matches: Array < string > ) => {
                                    for (let i = 0; i < matches.length; i++) {
                                      if (matches[i].toLowerCase().includes("sim")) {
                                        this.adicionarEvento();
                                        break;
                                      }
                                    }
                                  })
                            })
                        } else {
                          this.textSpeechProvider.speak("Data informada inválida");
                        }
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
              if (dia >= 1 && dia <= 31 && mes != -1) {
                let calendar = await this.storageProvider.onGetCalendar();
                calendar.currentDate = new Date(2020, mes, dia);
                this.storageProvider.onSetCalendar(calendar);
                this.textSpeechProvider.speak("Data de exibição alterada");
                this.cd.detectChanges();
              } else {
                this.textSpeechProvider.speak("Data informada inválida");
              }
            })
      })
  }

  adicionarLembrete() {
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
              this.cd.detectChanges();
              this.textSpeechProvider.speak("Lembrete adicionado, deseja adicionar outro lembrete?")
                .then(res => {
                  let options = {
                    language: 'pt-BR',
                    showPopup: true,
                  }
                  this.speechRecognition.startListening(options)
                    .subscribe(
                      async (matches: Array < string > ) => {
                        for (let i = 0; i < matches.length; i++) {
                          if (matches[i].toLowerCase().includes("sim")) {
                            this.adicionarLembrete();
                            break;
                          }
                        }
                      })
                })
            })
      })
  }

  removerLembrete() {
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
              let n = parseInt(matches[0]) - 1;
              if (n >= 0 && n < reminder.length) {
                reminder.splice(n, 1)
                this.storageProvider.onSetReminder(reminder);
                this.textSpeechProvider.speak("Lembrete removido");
                this.cd.detectChanges();
              } else {
                this.textSpeechProvider.speak("Numero informado invalido");
              }
            })
      })
  }

  editarLembrete() {
    this.textSpeechProvider.speak("Informe o número do lembrete que deseja editar")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true,
        }
        this.speechRecognition.startListening(options)
          .subscribe(
            async (matches: Array < string > ) => {
              let reminder = await this.storageProvider.onGetReminder();
              let n = parseInt(matches[0]) - 1;
              if (n >= 0 && n < reminder.length) {
                this.textSpeechProvider.speak("Informe a nova descrição do lembrete")
                  .then(res => {
                    let options = {
                      language: 'pt-BR',
                      showPopup: true,
                    }
                    this.speechRecognition.startListening(options)
                      .subscribe(
                        async (matches: Array < string > ) => {
                          reminder[n] = matches[0];
                          this.storageProvider.onSetReminder(reminder);
                          this.textSpeechProvider.speak("Lembrete alterado");
                          this.cd.detectChanges();
                        })
                  })
              } else {
                this.textSpeechProvider.speak("Numero informado invalido");
              }
            })
      })
  }

  removerEvento() {
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
              if (dia >= 1 && dia <= 31 && mes != -1) {
                this.textSpeechProvider.speak("Informe o título do evento")
                  .then(res => {
                    let options = {
                      language: 'pt-BR',
                      showPopup: true,
                    }
                    this.speechRecognition.startListening(options)
                      .subscribe(
                        async (matches: Array < string > ) => {
                          let calendar = await this.storageProvider.onGetCalendar();
                          let dataInicial = new Date(2020, mes, dia);
                          let eventoExcluido = false;
                          for (let i = (calendar.events.length - 1); i >= 0; i--) {
                            if (calendar.events[i].startTime.getDate() == dataInicial.getDate() &&
                              calendar.events[i].startTime.getMonth() == dataInicial.getMonth()) {
                              for (let u = 0; u < matches.length; u++) {
                                if (calendar.events[i].title.toLowerCase().includes(matches[u])) {
                                  calendar.events.splice(i, 1);
                                  eventoExcluido = true;
                                  break;
                                }
                              }
                              if (eventoExcluido) break;
                            }
                          }
                          if (eventoExcluido) {
                            this.storageProvider.onSetCalendar(calendar);
                            this.textSpeechProvider.speak("Evento excluido com sucesso")
                          } else this.textSpeechProvider.speak("Evento não encontrado");
                          this.cd.detectChanges();
                        })
                  })
              } else {
                this.textSpeechProvider.speak("Data informada inválida");
              }
            })
      })
  }
  editarEvento() {
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
              if (dia >= 1 && dia <= 31 && mes != -1) {
                this.textSpeechProvider.speak("Informe o título do evento")
                  .then(res => {
                    let options = {
                      language: 'pt-BR',
                      showPopup: true,
                    }
                    this.speechRecognition.startListening(options)
                      .subscribe(
                        async (matches: Array < string > ) => {
                          let calendar = await this.storageProvider.onGetCalendar();
                          let dataInicial = new Date(2020, mes, dia);
                          let eventoEditado = false;
                          for (let i = (calendar.events.length - 1); i >= 0; i--) {
                            if (calendar.events[i].startTime.getDate() == dataInicial.getDate() &&
                              calendar.events[i].startTime.getMonth() == dataInicial.getMonth()) {
                              for (let u = 0; u < matches.length; u++) {
                                if (calendar.events[i].title.toLowerCase().includes(matches[u])) {
                                  this.textSpeechProvider.speak("Informe o novo título do evento")
                                    .then(res => {
                                      let options = {
                                        language: 'pt-BR',
                                        showPopup: true,
                                      }
                                      this.speechRecognition.startListening(options)
                                        .subscribe(
                                          async (matches: Array < string > ) => {
                                            let title = matches[0];
                                            this.textSpeechProvider.speak("Informe a nova data do evento")
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
                                                      if (dia >= 1 && dia <= 31 && mes != -1) {
                                                        let evento = {
                                                          title: title,
                                                          startTime: new Date(2020, mes, dia),
                                                          endTime: new Date(2020, mes, dia),
                                                          allDay: true,
                                                        }
                                                        calendar.events[i] = evento;
                                                        eventoEditado = true;
                                                      } else {
                                                        this.textSpeechProvider.speak("Data informada inválida");
                                                      }
                                                    })
                                              })
                                          })
                                    })
                                }
                                if (eventoEditado) break;
                              }
                              if (eventoEditado) break;
                            }
                          }
                          if (eventoEditado) {
                            this.storageProvider.onSetCalendar(calendar);
                            this.textSpeechProvider.speak("Evento alterado com sucesso")
                          } else this.textSpeechProvider.speak("Evento não encontrado");
                          this.cd.detectChanges();
                        })
                  })
              } else {
                this.textSpeechProvider.speak("Data informada inválida");
              }
            })
      })
  }

  limparLembretes() {
    this.textSpeechProvider.speak("Todos os lembretes serão apagados, deseja continuar?")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true,
        }
        this.speechRecognition.startListening(options)
          .subscribe(
            async (matches: Array < string > ) => {
              let limpeza = false;
              for (let i = 0; i < matches.length; i++) {
                if (matches[i].toLowerCase().includes("sim")) {
                  this.storageProvider.onSetReminder([]);
                  limpeza = true;
                  break;
                }
              }
              if (limpeza) this.textSpeechProvider.speak("Lembretes excluidos com sucesso");
              else this.textSpeechProvider.speak("Operação cancelada");
              this.cd.detectChanges();
            })
      })
  }

  limparCalendario() {
    this.textSpeechProvider.speak("Todos os eventos serão apagados, deseja continuar?")
      .then(res => {
        let options = {
          language: 'pt-BR',
          showPopup: true,
        }
        this.speechRecognition.startListening(options)
          .subscribe(
            async (matches: Array < string > ) => {
              let limpeza = false;
              for (let i = 0; i < matches.length; i++) {
                if (matches[i].toLowerCase().includes("sim")) {
                  let calendar = await this.storageProvider.onGetCalendar();
                  calendar.events = [];
                  calendar.mode = 'month';
                  calendar.currentDate = new Date();
                  this.storageProvider.onSetCalendar(calendar);
                  limpeza = true;
                  break;
                }
              }
              if (limpeza) this.textSpeechProvider.speak("Eventos excluidos com sucesso");
              else this.textSpeechProvider.speak("Operação cancelada");
              this.cd.detectChanges();
            })
      })
  }

  exibirComandos() {
    this.openFirst();
  }

  recomendaFilme() {
    this.filmeProvider.getFilme()
      .then((res: any) => {
        this.textSpeechProvider.speakIngles(res.filme)
          .then(res => {
            this.textSpeechProvider.speak("Deseja que recomende outro filme?")
              .then(res => {
                let options = {
                  language: 'pt-BR',
                  showPopup: true,
                }
                this.speechRecognition.startListening(options)
                  .subscribe(
                    async (matches: Array < string > ) => {
                      for (let i = 0; i < matches.length; i++) {
                        if (matches[i].toLowerCase().includes("sim")) {
                          this.recomendaFilme();
                          break;
                        }
                      }
                    })
              })
          })
      })
  }
}