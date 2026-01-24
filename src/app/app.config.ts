// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { authInterceptor } from './interceptors/auth-interceptor';
// import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
// import { Auth } from './services/auth';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideRouter(routes), 
//     provideClientHydration(withEventReplay()),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideHttpClient(withInterceptors([authInterceptor])),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: Auth,
//       multi: true
//     }
//   ]
  
// };

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './interceptors/auth-interceptor';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { Auth } from './services/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Zone-based change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth,
      multi: true
    }
  ]
};
