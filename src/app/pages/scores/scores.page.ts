import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonTitle } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [IonContent, IonTitle],
  template: `<ion-content>
    <ion-title>Scores</ion-title>
  </ion-content>`,
  styles: [],
})
export class ScoresPage implements OnInit {
  private utils = inject(UtilsService);

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.utils.openTabs();
  }
}
