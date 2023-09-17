import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PhaserContainerComponent } from '.';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [PhaserContainerComponent],
  declarations: [PhaserContainerComponent],
  providers: [],
})
export class SharedComponentsModule {}
