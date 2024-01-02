import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonicModule],
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
