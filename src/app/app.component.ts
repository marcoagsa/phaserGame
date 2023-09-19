import { Component, OnDestroy } from '@angular/core';
import { PhaserSingletonService } from './services/phaser-single.module';

@Component({
  selector: 'phaser-app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  constructor() {}

  /**
   * * Need to handle the destroy method so we dont lock up our computer!
   */
  ngOnDestroy(): void {
    PhaserSingletonService.destroyActiveGame();
  }
}
