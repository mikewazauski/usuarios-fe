import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: ApiService) {

  }

  user: User;
  users: User[];
  showUsers: boolean;

  ngOnInit() {
    this.user = null;
    this.users = null;
    this.showUsers = false;

    this.service.getUsers().subscribe(
      (data: User[]) => {
        this.showUsers = true;
        this.users = data;
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );

  }

  getCurrentUser(u: User){
    this.user = u;
    this.showUsers = !this.showUsers;
  }

  delete(u: User) {
    this.service.deleteUser(u).subscribe(
      () => {
        const indexOf = this.users.indexOf(u);
        this.users.splice(indexOf, 1);
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }

  edit(u: User) {
    this.service.updateUser(u).subscribe(
      () => {
        const index: number = this.users.findIndex(x => x.id === u.id);
        this.users[index] = u;
        this.showUsers = true;
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }

}
