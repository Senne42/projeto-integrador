import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CONST from '../../environments/consts';

@Injectable()
export class LocalStorageProvider{
    
    constructor(private storage: Storage) { }

    public onSetCalendar(calendar : any){
        return this.storage.set(CONST.CALENDAR, calendar);
    }

    public onGetCalendar(){
        return this.storage.get(CONST.CALENDAR);
    }
}
