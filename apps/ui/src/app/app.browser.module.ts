import { HttpClientModule }        from '@angular/common/http';
import { NgModule }                from '@angular/core';
import { ReactiveFormsModule }     from '@angular/forms';
import { MatButtonModule }         from '@angular/material/button';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule }            from '@angular/router';
import { TransferStateService }    from '@nxarch/nguniversal';
import { AppComponent }            from './app.component';
import { LoginComponent }          from './components/login/login.component';
import { ProductListComponent }    from './components/product-list/product-list.component';
import { RegisterComponent }       from './components/register/register.component';
import { ROUTES }                  from './routes';
import { SESSION_STATE }           from './shared/tokens';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, ProductListComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ssrApp' }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(ROUTES),
    MatButtonModule,
    HttpClientModule
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
export class AppBrowserModule {}
