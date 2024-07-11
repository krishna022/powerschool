import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm:any;
  loading:boolean = false;
  submitted:boolean = false;
  constructor( private formBuilder: FormBuilder, private router: Router, public userService: UserService){ 
    if(localStorage.getItem('currentUser')){
      this.router.navigate(['/appointment']);
      }  
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
     });
  }

  get f() { return this.loginForm.controls; }

  activeTab:string = 'Login';
  changeTab(value:string){
    this.activeTab = value;
  }

  lresponseData:any; 
  tryLogin() {
      this.submitted = true;
      if (this.loginForm.invalid) { return; }
      this.loading = true;
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if(res.id){
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.router.navigate(['/appointment']);
          }else { 
            this.alert('error', 'Opps! Wrong Email or Password');
          }
          this.loading = false;
        },
        error: (e) => 
          //this.alert('error', e.message)
        this.alert('error', 'Opps! Wrong Email or Password')
        }); 
      }

  show_alert:boolean = false; message:any;
  alert(type:any, message:any){
    this.show_alert = true;
    this.message={'type':type,'text':message};
    setTimeout(() => {
      this.show_alert = false;
    }, 5000);
  }
  close_alert(){
    this.show_alert = false;
    this.message = '';
  }

}
