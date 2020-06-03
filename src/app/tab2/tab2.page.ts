import { Component, OnInit } from '@angular/core';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private storageProvider: LocalStorageProvider) {}
  ngOnInit(): void {
    let var1 = this.storageProvider.onGetCalendar();
    console.log(var1);
  }
  titulo = '';
  descricao = '';
  data = '';
  eventos = [];
  onSubmit(){
    this.eventos.push({
      "titulo": this.titulo,
      "descricao": this.descricao,
      "data": this.data
    });
    console.log(this.eventos);
    console.log(this.eventos[0].titulo);
  }

}
