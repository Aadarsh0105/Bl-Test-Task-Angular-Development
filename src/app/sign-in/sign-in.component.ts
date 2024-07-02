import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
) {
}

ngOnInit() {
    this.authForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    })
}
}
