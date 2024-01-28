import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }


