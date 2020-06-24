import { Component, OnInit } from '@angular/core';
import { LocalStorageProvider } from 'src/providers/localStorage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {

  private subscription: Subscription;

  constructor(private storageProvider: LocalStorageProvider) {
}

  lembretes = [];

  async ngOnInit() {
    let reminder = await this.storageProvider.onGetReminder();
        if (!reminder) {
            this.storageProvider.onSetReminder([]);
        }
        else{
            this.lembretes = reminder;
        }
        this.subscription = this.storageProvider.reminderSubject.subscribe((obj: any) => {
            this.lembretes = obj;
        })
  }

}
