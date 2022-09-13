import { Component }    from '@angular/core';
import { map }          from 'rxjs';
import { StateService } from '../../data/state.service';

@Component({
  selector: 'nat-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoggedIn$ = this.stateService.state.pipe(map(state => state.uiState?.isLoggedIn));

  constructor(
    private readonly stateService: StateService
  ) {
    console.log("yes yes")
  }

}
