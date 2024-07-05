import { Component, Inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {
  addGroupForm!: FormGroup;
  constructor(
    private commonService: CommonService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddGroupComponent>,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.addGroupForm = this.fb.group({
      id: [1],
      groupName: ['', [Validators.required]],
      description: [''],
    })

    if (this.data) {
      this.addGroupForm.patchValue(this.data);
    }
    else (
      this.addGroupForm.reset()
    )
  }

  cancel() {
    this.dialogRef.close();
  }

  addGroup() {
    debugger
    if (this.addGroupForm.invalid) {
      this.addGroupForm.markAllAsTouched();
      return;
    }
    if (this.data) {
      this.commonService.UpdateGroup(this.addGroupForm.value).subscribe(response => {
        this.toastrService.success("Group Updated Successfully !")
        this.dialogRef.close(response);
      })
    } else {
      if(this.addGroupForm.value.id === null){
        this.addGroupForm.value.id = 1
      }
      this.commonService.createGroup(this.addGroupForm.value).subscribe(response => {
        this.toastrService.success("Group Created Successfully !")
        this.dialogRef.close(response);
      })
    }
  }
}
