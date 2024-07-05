import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CommonService } from '../../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userDetail: any;
  constructor(
    private commonService: CommonService,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private router: Router

  ) {

  }

  ngOnItit(): void {

  }

  editProfile() {
    let userDetails: any = localStorage.getItem("userDetails")
    this.userDetail = JSON.parse(userDetails)
    this.ngZone.runOutsideAngular(() => {
      this.dialog?.open(EditProfileComponent, {
        width: '30%',
        data: this.userDetail
      })?.afterClosed().subscribe(response => {
        // if (response) {
        localStorage.setItem("userDetails", JSON.stringify(response))
        // }
      })
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
