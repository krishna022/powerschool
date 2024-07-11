import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent implements OnInit {
  @Input('appointment') public appointment: any;
  @Input('isEdit') public isEdit: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  appointmentForm:any; currentUser:any;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { 
    if(localStorage.getItem('currentUser')){
      this.currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(this.currentUser);
      }  
  }

  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      id:[''],
      title:['', Validators.required],
      date:['', Validators.required],
      start_time:['', Validators.required],
      end_time:['', Validators.required],
      status: ['', Validators.required],
      userId:[this.currentUser .id]
    });

    if(this.isEdit){
      // console.log(this.appointment);
      const start_time = (this.appointment.start_time.split('T')[1]).split(':');
      const end_time = (this.appointment.end_time.split('T')[1]).split(':');
      this.appointmentForm.controls['id'].setValue(this.appointment._id); 
      this.appointmentForm.controls['title'].setValue(this.appointment.title); 
      this.appointmentForm.controls['date'].setValue(this.appointment.date.split('T')[0]);
      this.appointmentForm.controls['start_time'].setValue(start_time[0]+':'+start_time[1]);  
      this.appointmentForm.controls['end_time'].setValue(end_time[0]+':'+end_time[1]);  
      this.appointmentForm.controls['status'].setValue(this.appointment.status);  
    }
  }

  get f() { return this.appointmentForm.controls; }

  passBack() {
    this.activeModal.close(this.appointment);
  }

  submitted:boolean = false;
  onAppointmentAdd(){
    this.submitted = true;
    if (this.appointmentForm.invalid) { return; }
    this.appointmentForm.controls['start_time'].setValue(new Date(this.appointmentForm.value.date +' '+ this.appointmentForm.value.start_time)); 
    this.appointmentForm.controls['end_time'].setValue(new Date(this.appointmentForm.value.date +' '+ this.appointmentForm.value.end_time)); 
    this.passEntry.emit(this.appointmentForm.value);
    this.activeModal.close(this.appointment);
  }

}
