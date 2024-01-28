import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled8';
  constructor(private auth:AuthService){
  }

  ngOnInit(){
    let user = this.auth.getUser();
  }
}
