import { NgModule }             from '@angular/core';
import { ServerModule }         from '@angular/platform-server';
import { REQUEST }              from '@nguniversal/express-engine/tokens';
import { TransferStateService } from '@nxarch/nguniversal';
import { Request }              from 'express';
import { AppBrowserModule }     from './app.browser.module';
import { AppComponent }         from './app.component';
import { SESSION_STATE }        from './shared/tokens';

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule,
  ],
  providers: [
    {
      provide: SESSION_STATE,
      useFactory: (request: Request, transferState: TransferStateService) => {
        const sessionState = request.session?.context?.sessionState;
        transferState.set('sessionState', sessionState);
        console.log('[AppSsrModule] Set Session State Factory', sessionState);

        return sessionState;
      },
      deps: [REQUEST, TransferStateService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppSsrModule {}

// todo check ssr changes not rendered on request
// should be reflected on request as javascript bundle is used
