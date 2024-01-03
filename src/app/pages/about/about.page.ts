import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonTitle } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonContent, IonTitle],
  template: `<ion-content>
    <ion-title>About</ion-title>
  </ion-content>`,
  styles: [``],
})
export class AboutPage implements OnInit {
  public utils = inject(UtilsService);

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.utils.openTabs();
  }
}
