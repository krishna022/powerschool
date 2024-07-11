import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  currentUser:any;
  constructor( private router: Router, public userService: UserService){ 
    if(!localStorage.getItem('currentUser')){
      this.router.navigate(['/login']);
    } else{
      this.currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(this.currentUser);
    }
  }


  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

    deleteAccount(): void {
      this.userService.delete(this.currentUser._id).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (e) => 
          console.log(e)
      });
    }

}
