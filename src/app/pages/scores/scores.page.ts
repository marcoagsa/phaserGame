import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-content>
    <ion-title>Scores</ion-title>
  </ion-content>`,
  styles: [],
})
export class ScoresPage implements OnInit {
  ngOnInit(): void {
    console.log('test');
  }
}