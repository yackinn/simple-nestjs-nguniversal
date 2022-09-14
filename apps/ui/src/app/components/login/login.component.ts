import { HttpClient }                           from '@angular/common/http';
import { Component }                            from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router }                               from '@angular/router';
import { ILoginDto, IUserResponse }             from '@nestjs-angular-talk/core/domain';
import { take }                                 from 'rxjs';
import { StateService }                         from '../../data/state.service';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;

}

@Component({
  selector: 'nat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly stateService: StateService,
    private readonly router: Router
  ) {



  }

  onSubmit() {
    const requestBody: ILoginDto = this.form.getRawValue();
    this.httpClient.post<IUserResponse>(
      'http://localhost:4200/api/auth/login',
      requestBody
    ).pipe(
      take(1)
    ).subscribe(user => {
      this.stateService.nextState({ user });
      this.router.navigate(['/']);
    });
  }
}

