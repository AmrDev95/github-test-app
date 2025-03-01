import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  StoreModule,
  combineReducers,
  provideState,
  provideStore
} from '@ngrx/store'
import { usersReducer } from './modules/github-users/store/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './modules/github-users/store/user.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideStore({usersReducer}),
    provideEffects(UserEffects)
  ]
};
