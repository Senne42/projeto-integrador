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
    
    calendarSubject = new Subject<Object>();

    /**
     * Recebe o calendário a ser salvo no dispositivo, 
     * e alerta quando seu conteudo é altertado;
     * @param obj Objeto Calendário (Formato de exibição e eventos);
     */
    public onSetCalendar(obj : any){
        this.storage.set(CONST.CALENDAR, obj);
        this.calendarSubject.next(obj);
    }

    /**
     * Retorna o calendario salvo no dispositivo;
     */
    public onGetCalendar(){
        return this.storage.get(CONST.CALENDAR);
    }

    reminderSubject = new Subject<Object>();

    /**
     * Recebe o calendário a ser salvo no dispositivo, 
     * e alerta quando seu conteudo é altertado;
     * @param obj Objeto Calendário (Formato de exibição e eventos);
     */
    public onSetReminder(obj : any){
        this.storage.set(CONST.REMINDER, obj);
        this.reminderSubject.next(obj);
    }

    /**
     * Retorna o calendario salvo no dispositivo;
     */
    public onGetReminder(){
        return this.storage.get(CONST.REMINDER);
    }
}
