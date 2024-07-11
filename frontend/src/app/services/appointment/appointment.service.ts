import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment/appointment.model';

const baseUrl = 'http://localhost:8080/api/appointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  currentUser:any; header:any;
  constructor(private http: HttpClient) {
    if(localStorage.getItem('currentUser')){
      this.currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(this.currentUser);
    }
      this.header = new HttpHeaders({ 
     'x-access-token': this.currentUser.accessToken
      });
  }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(baseUrl, { headers: this.header });
  }

  getByUserAndDate(data: any): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(`${baseUrl}/getByUserAndDate`, data, { headers: this.header });
  }

  get(id: any): Observable<Appointment> {
    return this.http.get<Appointment>(`${baseUrl}/${id}`, { headers: this.header });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data, { headers: this.header });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, { headers: this.header });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { headers: this.header });
  }

}
