import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  editProfileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditProfileComponent>,
  ) {
  }

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
debugger
    if (this.data) {
      this.editProfileForm.patchValue(this.data)
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  updateProfile() {
    debugger
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    this.commonService.updateUser(this.editProfileForm.value).subscribe(response => {
      // if (response) {
        this.toastrService.success("Profile Updated Successfully !")
        this.dialogRef.close(this.editProfileForm.value);
      // }
    })
  }
}
