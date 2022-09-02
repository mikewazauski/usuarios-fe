import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  createUserForm: FormGroup;
  @Input() user: User;
  @Input() title: string;
  @Output() outputUser = new EventEmitter<User>();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      firstname: [
        this.isNullOrUndefined(this.user) ? null : this.user.firstName,
        [Validators.required],
      ],
      lastname: [
        this.isNullOrUndefined(this.user) ? null : this.user.lastName,
        [Validators.required],
      ],
      email: [
        this.isNullOrUndefined(this.user) ? null : this.user.email,
        [Validators.required, Validators.email],
      ],
    });

    console.log('UserForm is invalid: ' + this.createUserForm.invalid)

  }

  onSubmit() {

    const u: User = {
      id: this.isNullOrUndefined(this.user) ? 0 : this.user.id,
      firstName: this.createUserForm.get('firstname').value,
      lastName: this.createUserForm.get('lastname').value,
      email: this.createUserForm.get('email').value,
    }

    this.outputUser.emit(u);
  }

  private isNullOrUndefined(obj: any) {
    return obj === undefined || obj === null;
  }

}
