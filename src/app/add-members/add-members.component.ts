import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.css'
})
export class AddMembersComponent {
  addMembersForm!: FormGroup;
  groupId: any;
  constructor(
    private commonService: CommonService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddMembersComponent>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.groupId = Number(params.groupId);
    })
  }

  ngOnInit(): void {
    this.addMembersForm = this.fb.group({
      id: [null],
      groupId: [this.groupId],
      memberName: [''],
      amount: [0],
      dueAmount: [0],
      paymentStatus: ['N/A']
    })
  }

  
  cancel() {
    this.dialogRef.close();
  }

  addMember() {
    debugger
    if (this.addMembersForm.invalid) {
      this.addMembersForm.markAllAsTouched();
      return;
    }
      this.commonService.createMember(this.addMembersForm.value).subscribe(response => {
        if (response) {
          this.toastrService.success("Member Added Successfully !")
          this.dialogRef.close(response);
        }
      })
  }
}
