import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // T08: withComponentInputBinding entrega parámetros de ruta y de consulta a input().
    provideRouter(routes, withComponentInputBinding()),
  ],
};
