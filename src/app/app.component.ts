import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bl-Test-Task-Angular-Development';
  userDetail: any;

  constructor(
    private cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    let userDetails: any = localStorage.getItem("userDetails")
    this.userDetail = JSON.parse(userDetails)

  }

  isLoggedIn(){
    this.cdref.detectChanges();
    if(this.userDetail){
      return true
    }
    else{
      return false
    }
  }
}
