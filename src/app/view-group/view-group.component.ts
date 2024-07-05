import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { AddMembersComponent } from '../add-members/add-members.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddExpensesComponent } from '../add-expenses/add-expenses.component';

@Component({
  selector: 'app-view-group',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.css'
})
export class ViewGroupComponent {
  groupId: any;
  groupDetail: any;
  expense: any;
  membersList: any;

  displayedColumns: string[] = ['id', 'memberName', 'amount', 'paymentStatus', 'action'];
  memberDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) memberPaginator!: MatPaginator;
  @ViewChild(MatSort) memberSort!: MatSort;
  userDetail: any | null;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.groupId = Number(params.groupId);
    })
  }

  ngOnInit(): void {
    this.userDetail = localStorage.getItem("userDetails")
    this.addDefaultMember();
    this.getAllMember()
    this.getGroup();
    this.getExpenses();
  }

  addDefaultMember() {
    debugger
    let obj: any = {
      id: 1,
      groupId: this.groupId,
      memberName: JSON.parse(this.userDetail).name,
      amount: 0,
      dueAmount: 0,
      paymentStatus: 'N/A'
    }
    this.commonService.createMember(obj).subscribe(response => {
      if (response) {
        // this.toastrService.success("Member Added Successfully !")
      }
    })
  }

  ngAfterViewInit() {
    this.cdref.detectChanges();
  }

  getGroup() {
    this.commonService.getGroup(this.groupId).subscribe(response => {
      this.groupDetail = response
    })
  }

  getExpenses() {
    debugger
    this.commonService.getAllExpenses().subscribe(response => {
      this.expense = response.find((item: any) => item.groupId === this.groupId)
      this.cdref.detectChanges();
    })
  }

  getAllMember() {
    this.commonService.getAllMembers().subscribe(response => {
      this.membersList = response.filter((item: any) => item.groupId === this.groupId)
      this.memberDataSource = new MatTableDataSource(this.membersList);
      this.memberDataSource.paginator = this.memberPaginator;
      this.memberDataSource.sort = this.memberSort;
    })
  }

  addMember() {
    this.ngZone.runOutsideAngular(() => {
      this.dialog.open(AddMembersComponent, {
        width: '30%',
      }).afterClosed().subscribe(response => {
        if (response) {
          this.getAllMember();
        }
      })
    });
  }

  addExpenses() {
    this.ngZone.runOutsideAngular(() => {
      this.dialog?.open(AddExpensesComponent, {
        width: '30%',
        data: this.expense?.id ? this.expense.id : 0
      })?.afterClosed().subscribe(response => {
        // if (response) {
        this.getExpenses();
        // }
      })
    });
  }

  splitExpense() {
    debugger
    let perHeadAmount = this.expense.amount / this.membersList?.length;
    this.membersList.map((item: any) => { item.amount = perHeadAmount, item.paymentStatus = 'Due' })
    this.memberDataSource = new MatTableDataSource(this.membersList);
    this.memberDataSource.paginator = this.memberPaginator;
    this.memberDataSource.sort = this.memberSort;
    this.toastrService.success("Expenses splited equally !")
  }

  updateStatus(element: any) {
    this.membersList.map((item: any) => item.id === element.id ? item.paymentStatus = 'Paid' : '')
    this.memberDataSource = new MatTableDataSource(this.membersList);
    this.memberDataSource.paginator = this.memberPaginator;
    this.memberDataSource.sort = this.memberSort;
  }


}
