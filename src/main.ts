import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from 'src/app/interceptors/auth-interceptor';
import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/app/constants';
import { AppComponent } from 'src/app/app.component';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
