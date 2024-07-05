import { Component, NgZone, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { AddGroupComponent } from '../add-group/add-group.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  groupDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) groupPaginator!: MatPaginator;
  @ViewChild(MatSort) groupSort!: MatSort;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getAllGroup()
  }

  getAllGroup() {
    this.commonService.getAllGroup().subscribe(response => {
      this.groupDataSource = new MatTableDataSource(response);
      this.groupDataSource.paginator = this.groupPaginator;
      this.groupDataSource.sort = this.groupSort
    })
  }

  addGroup(element: any) {
    this.ngZone.runOutsideAngular(() => {
      this.dialog.open(AddGroupComponent, {
        width: '30%',
        data: element
      }).afterClosed().subscribe(response => {
        this.getAllGroup();
      })
    });
  }

  view(element: any) {
    this.router.navigate(['/view-group'], { queryParams: { groupId: element.id } })
  }
}
