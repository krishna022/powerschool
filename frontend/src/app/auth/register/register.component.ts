import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  @Output() onRegister = new EventEmitter<any>();
  registerForm: any;
  loading:boolean = false;
  submitted:boolean = false; 
  constructor( private formBuilder: FormBuilder, public userService: UserService){ 

  }

  public successRegister(): void{
    setTimeout(() => {
      this.onRegister.emit('Login');
    }, 2000);
 }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
     });
  }

  get f() { return this.registerForm.controls; }

  isValid:boolean = true;
  validateEmail(): void {
    this.isValid = true;
    this.userService.validate(this.registerForm.value).subscribe({
      next: (res) => {
        if(res.id){
          this.isValid = false;
          this.alert('error', 'Email already registered.');
        }
      },
      error: (e) => 
       // console.error(e)
      this.alert('error', 'Something Went Wrong')
    });
  }


  lresponseData:any; 
  tryRegister() {
      this.submitted = true;
      if (this.registerForm.invalid) { return; }
      if (!this.isValid) { return; }
      this.loading = true;
      this.userService.create(this.registerForm.value).subscribe({
        next: (res) => {
          if(res._id){
            this.alert('success', 'Your account has been successfully registered. Login to proceed.');
            this.successRegister();
          }else { 
            this.alert('error', 'Something Went Wrong');
          }
          this.loading = false;
        },
        error: (e) => 
          // this.alert('error', e.message)
        this.alert('error', 'Something Went Wrong')
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
