import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentService } from '../services/appointment/appointment.service';
import { UserService } from '../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {

lresponseData:any;  appointmentData: any; loading:boolean = false;
appointment:any; isEdit:boolean = false; filterForm:any; fetching:boolean = false;

constructor(private modalService: NgbModal, public appointmentService: AppointmentService, public userService: UserService, private formBuilder: FormBuilder){

 }

ngOnInit(): void {
 this.getAllAppointments();
 this.getAllUsers();

 this.filterForm = this.formBuilder.group({
  userId:[''],
  date:[''],
});

}

openModal(isEdit:any) {
  const modalRef = this.modalService.open(AppointmentAddComponent);
  modalRef.componentInstance.appointment = this.appointment;
  modalRef.componentInstance.isEdit = isEdit;
  this.isEdit = isEdit;
  modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
    this.appointmentData = receivedEntry;
    if(isEdit){
      this.updateAppointment();
    }else{
      this.submitAppointment();
    }
  })
}

update(value:any){
this.appointment = value;
this.openModal(true);
}

 appointments:any;
getAllAppointments(): void {
  this.fetching = true;
  this.appointmentService.getAll().subscribe({
    next: (res) => {
      this.fetching = false;
      this.appointments = res;
    },
    error: (e) => 
      this.alert('error', 'Opps! Something went wrong')
  });
}

users:any;
getAllUsers(): void {
  this.userService.getAll().subscribe({
    next: (res) => {
        this.users = res;
    },
    error: (e) => 
      this.alert('error', 'Opps! Something went wrong')
  });
}

onAppointmentFilter(): void {
  this.fetching = true;
  this.appointmentService.getByUserAndDate(this.filterForm.value).subscribe({
    next: (res) => {
      this.fetching = false;
      this.appointments = res;
    },
    error: (e) => 
      this.alert('error', 'Opps! Something went wrong')
  });
}


submitAppointment() {
    this.loading = true;
    this.appointmentService.create(this.appointmentData).subscribe({
      next: (res) => {
        if(res.id){
          this.alert('success', 'Apppointment has been created successfully');
          this.getAllAppointments();
        }else { 
          this.alert('error', 'Opps! Something went wrong');
        }
        this.loading = false;
      },
      error: (e) => 
         this.alert('error', e.error.message)
      // this.alert('error', 'Opps! Something went wrong')
      }); 
    }

    updateAppointment() {
      this.loading = true;
      this.appointmentService.update(this.appointmentData.id, this.appointmentData).subscribe({
        next: (res) => {
            this.message = res.message
            ? res.message
            : 'The status was updated successfully!';
            this.alert('success', this.message);
            this.getAllAppointments();
          this.loading = false;
        },
        error: (e) => 
         // this.alert('error', e.message)
        this.alert('error', 'Opps! Something went wrong')
        }); 
      }

      delete(item:any): void {
        this.appointmentService.delete(item._id).subscribe({
          next: (res) => {
            this.getAllAppointments();
          },
          error: (e) => 
            this.alert('error', 'Opps! Something went wrong')
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
