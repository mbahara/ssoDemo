import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthConfig,OAuthModuleConfig, OAuthService, OAuthStorage, provideOAuthClient} from 'angular-oauth2-oidc';
import {APP_INITIALIZER} from '@angular/core';
import {AuthInterceptorDI} from './app/oauth2.interceptor';
import {environment} from './environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  issuer: `https://<server-frontend-url>:<https-port>/realms/<realm>`,
  tokenEndpoint: `https://<server-frontend-url>:<https-port>/realms/<realm>/protocol/openid-connect/token`,
  redirectUri: window.location.origin,
  clientId: 'optimization-app',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true
}

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  })
}

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: [environment.apiURL],
    sendAccessToken: true,
  }
};

bootstrapApplication(AppComponent,{
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthservice: OAuthService) => {
        return () => {
          initializeOAuth(oauthservice);
        }
      },
      multi: true,
      deps: [OAuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorDI,
      multi: true
    },
    { provide: OAuthStorage, useValue: localStorage },
    { provide: OAuthModuleConfig, useValue: authModuleConfig }
  ]
})
  .catch((err) => console.error(err));
