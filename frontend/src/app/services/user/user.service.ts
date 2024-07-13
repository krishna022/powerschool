import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user.model';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser:any; header:any;
  constructor(private http: HttpClient) {
    if(localStorage.getItem('currentUser')){
      this.currentUser = localStorage.getItem('currentUser');
      this.currentUser = JSON.parse(this.currentUser);
      this.header = new HttpHeaders({ 
        'x-access-token': this.currentUser.accessToken
         });
    }else{
      this.header = new HttpHeaders({ });
    }
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl, { headers: this.header });
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`, { headers: this.header });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/signup`, data);
  }

  validate(data: any): Observable<User> {
    return this.http.post(`${baseUrl}/validate_email`, data);
  }

  login(data: any): Observable<User> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { headers: this.header });
  }
}
