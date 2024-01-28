import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ForumComment} from "../../forum/forum.module";
import {UsersService} from "../../users.service";
import {User} from "../../forum/forum.module"
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user : User | null = null;

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
        if (this.registrationForm.valid && this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
          const newUser: User = {
            username: this.registrationForm.value.username,
            name: this.registrationForm.value.name,
            password: this.registrationForm.value.password,
            email: this.registrationForm.value.email
          };

          console.log(newUser.username);

          this.usersService.addUsers(newUser)
            .subscribe(
              (res) => {
                console.log('Response:', res);
                this.user = newUser;
                this.registrationForm.reset();

              },
              (error) => {
                console.error('Error:', error);
              }
            );



        } else {
          this.registrationForm.setErrors({ 'passwordMismatch': true });

          console.log('forma nicht');
    }
  }



  //addUser(){




  //}
  //this.loginPage();

  loginPage(){
    this.router.navigate(['login']);
  }


}
