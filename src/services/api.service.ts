import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { User } from '../app/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  addUser(u: User) {
    return this.http.post(`${environment.url}/user`, u);
  }

  getUsers() {
    return this.http.get(`${environment.url}/user`).pipe(
      map((data: User[]) => {
        return data;
      })
    );
  }

  updateUser(u: User) {
    return this.http.put(`${environment.url}/user`, u);
  }

  deleteUser(u: User) {
    return this.http.delete(`${environment.url}/user`, {
      params: {
        id: u.id.toString()
      }
    });
  }
}
