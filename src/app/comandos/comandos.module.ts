import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComandosPageRoutingModule } from './comandos-routing.module';

import { ComandosPage } from './comandos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComandosPageRoutingModule
  ],
  declarations: [ComandosPage]
})
export class ComandosPageModule {}
