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
  flagCreate: boolean;
  flagUpdate: boolean;
  showUsers: boolean;
  spinner: boolean;

  constructor(private router: Router, private service: ApiService) {
  }

  ngOnInit() {
    this.flagCreate = true;
    this.flagUpdate = false;
    this.showUsers = false;
  }

  create(u: User) {
    //API call to create user then redirect to users table
    this.spinner = true;
    this.service.addUser(u).subscribe(
      () => {
        this.router.navigate(['/Users']);
        this.spinner = false;
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }
}
