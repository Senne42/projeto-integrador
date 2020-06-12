import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalStorageProvider } from '../../providers/localStorage'
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})

/**
 * Página do calendário;
 */
export class Tab3Page implements OnInit {

    private subscription: Subscription;

    constructor(private navController: NavController,
        private storageProvider: LocalStorageProvider) {

    }

    /**
     * Função executada assim que a tela é aberta;
     * Verifica se possui alguma calendario armazenado, caso não, insere um calendário inical;
     * Aguarda alterações no calendário;
     */
    async ngOnInit(): Promise < void > {
        let calendar = await this.storageProvider.onGetCalendar();
        if (!calendar) {
            this.storageProvider.onSetCalendar({
                mode: this.calendar.mode,
                events: this.eventSource
            });
        }
        else{
            this.eventSource = calendar.events;
            this.calendar.mode = calendar.mode;
        }
        this.subscription = this.storageProvider.calendar.subscribe((res: any) => {
            console.log(res);
            // this.eventSource = res.events;
            this.calendar.mode = res.mode;
        })
    }
    eventSource = [];
    viewTitle;

    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function (date: Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function (date: Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function (date: Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function (date: Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function (date: Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function (date: Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function (date: Date) {
                return 'testDH';
            },
            formatDayViewTitle: function (date: Date) {
                return 'testDT';
            }
        }
    };

    /**
     * Insere eventos aleatórios no calndário;
     */
    loadEvents() {
        this.eventSource = this.createRandomEvents();
        console.log(this.eventSource);
    }

    /**
     * Alteração do titulo do calendário;
     * @param title Titulo do calendário;
     */
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    /**
     * Função é chamada quando o usuario clica no evento;
     * @param event Evento clicado;
     */
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    /**
     * Altera o modo de exibição do calendario;
     * @param mode Modo de exibição do calendario;
     */
    changeMode(mode) {
        this.calendar.mode = mode;
    }

    /**
     * Altera a exibição para o dia atual;
     */
    today() {
        this.calendar.currentDate = new Date();
    }

    /**
     * Exibe o evento do dia selecionado
     * @param ev Evento selecionado
     */
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    /**
     * Exibe os eventos do dia atual;
     * @param event  Eventos do dia;
     */
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    /**
     * Cria eventos aleatórios para serem exibidos no calendario;
     */
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

    /**
     * Exibe eventos de acordo com o modo selecionado;
     * @param ev  Eventos do modo selecionado;
     */
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    /**
     * Desabilita eventos a partir de um dia/horário determinado;
     * @param date Data/Horário;
     */
    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}