import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User, UserApiResponse} from "./forum/forum.module";
import {environment} from "../enviroments/envoriment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

    usersUrl = environment.API_URL + '/api/users';

  getUsers():Observable<User[]>{


    return this.http.get(this.usersUrl)
      .pipe(
        map((res: any) => res.users)
      ) as Observable<User[]>;
  }



  addUsers(user:User){

    console.log("addUsers");
    return this.http.post(this.usersUrl,user);

  }




}
