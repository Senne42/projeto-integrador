import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CONST from '../environments/consts';
import { Subject } from 'rxjs';

/**
 * Armazena o calendário na memória do dispositivo;
 */
@Injectable() 
export class LocalStorageProvider{
    
    constructor(private storage: Storage) { }
    
    calendar = new Subject<Object>();

    /**
     * Recebe o calendário a ser salvo no dispositivo, 
     * e alerta quando seu conteudo é altertado;
     * @param obj Objeto Calendário (Formato de exibição e eventos);
     */
    public async onSetCalendar(obj : any){
        let calendar = await this.storage.set(CONST.CALENDAR, obj);
        this.calendar.next(calendar);
        return calendar;
    }

    /**
     * Retorna o calendario salvo no dispositivo;
     */
    public async onGetCalendar(){
        return await this.storage.get(CONST.CALENDAR);
    }
}
