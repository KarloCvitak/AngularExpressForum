import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {ForumComment, User} from "../forum/forum.module";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable, Subject} from "rxjs";
import {UsersService} from "../users.service";
import {PostsService} from "../posts.service";

@Injectable()
export class AuthService implements OnInit{

  private user : User | null = null;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();

  ngOnInit() {


  }


  users : User[] = [];

  setUsers(users: User[]): void {
    this.users = users;
  }
  constructor(private http : HttpClient, private router : Router,  private usersService:UsersService) { }

  login(credentials : {username : string, password: string}){


    //console.log("heh" + this.users[0].name);
    //console.log("heh" + this.users[0].password);
    console.log("heh" + this.users[0].username);

    new Observable(observer => {
      setTimeout(()=>{
        let u = this.users.find(u => u.username==credentials.username && u.password==credentials.password);
        observer.next(u);
      },1000);
    }).subscribe( (user : any)=>{

      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authChange.next(true);
        this.router.navigate(['/']);
      } else {

      }

    });



  }

  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser():User{
    let u = localStorage.getItem('user');
    if (!this.user && u) this.user=JSON.parse(u);
    return {...this.user} as User;
  }


  isAuthenticated(){
    return this.user!=null;
  }



}
