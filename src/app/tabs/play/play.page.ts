import { Component, OnInit } from '@angular/core';
import { launch } from '../../../game/game';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  showButton: boolean = true;

  constructor() {}

  ngOnInit() {}

  handleClickStart() {
    // hides launch button
    this.showButton = false;

    // Runs the launch function
    launch();
  }
}
