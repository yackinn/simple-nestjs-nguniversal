import { Component, OnInit }       from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nat-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    firstName: [''],
    lastName: [''],
  });

  constructor(
    private readonly fb: FormBuilder
  ) {}
}
