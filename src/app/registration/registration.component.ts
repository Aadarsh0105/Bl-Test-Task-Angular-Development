import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  signIn() {
    this.router.navigate(['/'])
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.commonService.createUser(this.registrationForm.value).subscribe(response => {
      if (response) {
        this.toastrService.success("User Register Successfully !")
        this.router.navigate(['/'])
      }
    })
  }
}
