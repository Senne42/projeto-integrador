import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    async ionViewWillEnter(){
        let calendar = await this.storageProvider.onGetCalendar();
        if (calendar){
            this.eventSource = calendar;
        }
    }
  eventSource;
  viewTitle;

  isToday:boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },
          formatMonthViewDayHeader: function(date:Date) {
              return 'MonMH';
          },
          formatMonthViewTitle: function(date:Date) {
              return 'testMT';
          },
          formatWeekViewDayHeader: function(date:Date) {
              return 'MonWH';
          },
          formatWeekViewTitle: function(date:Date) {
              return 'testWT';
          },
          formatWeekViewHourColumn: function(date:Date) {
              return 'testWH';
          },
          formatDayViewHourColumn: function(date:Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date:Date) {
              return 'testDT';
          }
      }
  };

  constructor(private navController:NavController,
    private storageProvider: LocalStorageProvider) {

  }

  loadEvents() {
      this.eventSource = this.createRandomEvents();
      this.storageProvider.onSetCalendar(this.eventSource);
  }

  onViewTitleChanged(title) {
      this.viewTitle = title;
  }

  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }

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

  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };
}

