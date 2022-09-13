import { Inject, Injectable, Optional } from '@angular/core';
import { SessionState, UiState, User }  from '@nestjs-angular-talk/core/domain';
import { BehaviorSubject }              from 'rxjs';
import { SESSION_STATE }                from '../shared/tokens';

interface State {
  uiState?: UiState,
  user?: User
}

@Injectable({ providedIn: 'root' })
export class StateService {
  private _state = new BehaviorSubject<State>({});

  public state = this._state.asObservable();

  constructor(
    @Optional() @Inject(SESSION_STATE) sessionState: SessionState
  ) {
    console.log('[StateService] sessionState', sessionState);
  }

  nextState(state: Partial<State>) {
    this._state.next({ ...this._state.getValue(), ...state });
  }

}
