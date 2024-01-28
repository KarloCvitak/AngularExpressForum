import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../forum/forum.module";
import {UsersService} from "../../users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage : string = '';
  signinForm! : FormGroup;
  users : User[] = [];
  constructor(private auth : AuthService, private router: Router, private usersService:UsersService) { }

  registerButton(){
  this.router.navigate(['register']);
}


  ngOnInit() {



    this.usersService.getUsers()
      .subscribe((res: User[]) => {
        console.log(res);
        this.users = res;
        this.auth.setUsers(this.users);
      });




    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });

  }

  onLogin(){
    this.auth.login(this.signinForm.value);
  }

}
