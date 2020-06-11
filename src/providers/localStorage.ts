import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CONST from '../environments/consts';
import { Subject } from 'rxjs';

@Injectable()
export class LocalStorageProvider{
    
    constructor(private storage: Storage) { }
    
    calendar = new Subject<Object>();

    public async onSetCalendar(obj : any){
        let calendar = await this.storage.set(CONST.CALENDAR, obj);
        this.calendar.next(calendar);
        return calendar;
    }

    public async onGetCalendar(){
        return await this.storage.get(CONST.CALENDAR);
    }
}
