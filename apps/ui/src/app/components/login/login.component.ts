import { Component, OnInit }       from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// interface LoginForm {
//   email: string;
//   password: string;
// }

@Component({
  selector: 'nat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder
  ) {}
}
