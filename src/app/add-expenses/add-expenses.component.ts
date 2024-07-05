import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent {
  addExpenseForm!: FormGroup;
  groupId: any;
  constructor(
    private commonService: CommonService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddExpensesComponent>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.groupId = Number(params.groupId);
    })
  }

  ngOnInit(): void {
    this.addExpenseForm = this.fb.group({
      id: [this.data],
      groupId: [this.groupId],
      amount: [0]
    })
  }


  cancel() {
    this.dialogRef.close();
  }

  addMember() {
    debugger
    if (this.addExpenseForm.invalid) {
      this.addExpenseForm.markAllAsTouched();
      return;
    }
    if (this.data === 0) {
      this.commonService.createExpense(this.addExpenseForm.value).subscribe(response => {
        // if (response) {
        this.toastrService.success("Expense Added Successfully !")
        this.dialogRef.close(response);
        // }
      })
    } else {
      this.commonService.updateExpense(this.addExpenseForm.value).subscribe(response => {
        // if (response) {
        this.toastrService.success("Expense Added Successfully !")
        this.dialogRef.close(response);
        // }
      })
    }
  }
}
