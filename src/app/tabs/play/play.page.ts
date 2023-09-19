import { Component, OnInit } from '@angular/core';
import { PhaserSingletonService } from 'src/app/services/phaser-single.module';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  get showButton() {
    return false;
  }

  constructor() {}

  async ngOnInit(): Promise<void> {
    console.log('HomePageComponent', 'ngOnInit');
    setTimeout(this.init, 500);
  }

  async init(): Promise<void> {
    await PhaserSingletonService.init();
  }
}
