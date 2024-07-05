import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authForm!: FormGroup;
  userDetail: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })

    this.getAllUser();
  }

  registration() {
    this.router.navigate(['/registration'])
  }

  login() {
    if(this.authForm.invalid){
      return;
    }
    this.commonService.getAllUser().subscribe(response => {
      this.userDetail = response.find(item => item.email === this.authForm.value.email && item.password === this.authForm.value.password)
      console.log("logi success", response)
      console.log("this.userDetail", this.userDetail)
      if(this.userDetail){
        this.toastrService.success("User Login Successfully !")
        localStorage.setItem("userDetails", JSON.stringify(this.userDetail))
        this.router.navigate(['/home'])
      }
      else {
        this.authForm.reset();
        this.userDetail = null;
      }
    })
  }

  getAllUser(){
    this.commonService.getAllUser().subscribe(response => {
      console.log('get all users response', response)
    })
  }
}
