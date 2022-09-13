import { NgModule }                from '@angular/core';
import { ReactiveFormsModule }     from '@angular/forms';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule }            from '@angular/router';
import { TransferStateService }    from '@nxarch/nguniversal';
import { AppComponent }            from './app.component';
import { AuthComponent }           from './components/auth/auth.component';
import { LoginComponent }          from './components/login/login.component';
import { RegisterComponent }       from './components/register/register.component';
import { ROUTES }                  from './routes';
import { SESSION_STATE }           from './shared/tokens';

@NgModule({
  declarations: [AppComponent, AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ssrApp' }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: SESSION_STATE,
      useFactory: (transferState: TransferStateService) => {
        const sessionState = transferState.get('sessionState');
        console.log('[AppBrowserModule] Get Session State Factory', sessionState);
        return sessionState;
      },
      deps: [TransferStateService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {
  constructor() {
    console.log('app browser start');
  }
}
