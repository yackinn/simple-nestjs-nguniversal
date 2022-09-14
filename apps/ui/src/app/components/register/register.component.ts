import { HttpClient }                           from '@angular/common/http';
import { Component }                            from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router }                               from '@angular/router';
import { ICreateUserDto, IUserResponse }        from '@nestjs-angular-talk/core/domain';
import { take }                                 from 'rxjs';
import { StateService }                         from '../../data/state.service';

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
}

@Component({
  selector: 'nat-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group<RegisterForm>({
    email: this.fb.nonNullable.control('', [Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpClient: HttpClient,
    private readonly stateService: StateService,
    private readonly router: Router
  ) {}

  onSubmit() {
    const requestBody: ICreateUserDto = this.form.getRawValue();
    this.httpClient.post<IUserResponse>(
      'http://localhost:4200/api/users/register',
      requestBody
    ).pipe(
      take(1)
    ).subscribe(user => {
      this.stateService.nextState({ user });
      this.router.navigate(['/']);
    });
  }
}
