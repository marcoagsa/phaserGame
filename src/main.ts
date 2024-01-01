import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from './environments/environment';
import { ROUTES } from './app/constants';
import { AppComponent } from './app/app.component';
import { PhaserSingletonService } from './app/services/phaser-single.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(ROUTES, {
        preloadingStrategy: PreloadAllModules,
      }),
      IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
      PhaserSingletonService.forRoot()
    ),
    BrowserModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
}).catch((err) => console.error(err));
