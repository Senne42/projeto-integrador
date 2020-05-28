import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
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
