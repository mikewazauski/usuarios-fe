import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  user: User;
  users: User[];
  flagCreate: boolean;
  flagUpdate: boolean;
  showUsers: boolean;

  constructor(private router: Router, private service: ApiService) {
  }

  ngOnInit() {
    this.flagCreate = true;
    this.flagUpdate = false;
    this.showUsers = false;

    this.service.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }

  create(u: User) {
    //API call to create user then redirect to users table
    this.service.addUser(u).subscribe(
      () => {
        this.users.push(u);
        this.router.navigate(['/Users'], {
          state: { users: this.users }
        });
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }
}
