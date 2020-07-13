import { Component, OnInit } from '@angular/core';
import { LocalStorageProvider } from 'src/providers/localStorage';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {

  private subscription: Subscription;

  constructor(private storageProvider: LocalStorageProvider, private menu: MenuController) {}

  lembretes = [];

  async ngOnInit() {
    let reminder = await this.storageProvider.onGetReminder();
    if (!reminder) {
      this.storageProvider.onSetReminder([]);
    } else {
      this.lembretes = reminder;
      for (let i = 0; i<this.lembretes.length; i++) {
        this.lembretes[i] = this.lembretes[i].charAt(0).toUpperCase()+this.lembretes[i].slice(1);
      }
    }
    this.subscription = this.storageProvider.reminderSubject.subscribe((obj: any) => {
      this.lembretes = obj;
      for (let i = 0; i<this.lembretes.length; i++) {
        this.lembretes[i] = this.lembretes[i].charAt(0).toUpperCase()+this.lembretes[i].slice(1);
      }
    })
  }

  abreMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}