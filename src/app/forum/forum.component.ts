import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForumComment, User} from "./forum.module";
import {FormRecord, FormsModule} from "@angular/forms";
import {PostsService} from "../posts.service";
import {UsersService} from "../users.service";
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit{

  posts : ForumComment[] = [];


  user : User | null = null;
  authenticated=false;
  authChangeSubscription : Subscription | null = null;

  new : ForumComment = new ForumComment();
  private users: User[] = [];
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  ngOnInit() {


    this.user = this.auth.getUser();
    this.authenticated=this.auth.isAuthenticated();

    console.log(this.user);

    this.authChangeSubscription=this.auth.authChange
      .subscribe(authenticated => {
        this.authenticated=authenticated;
      });

    if (!this.authenticated) {
      console.log('Navigating to login...');
      this.router.navigate(['login']);
    }

    this.postsService.getPosts()
      .subscribe((res: ForumComment[]) => {
        console.log(res);
        this.posts = res;
      });





    if(this.user && this.user._id)
      this.new.userId = this.user._id;



  }

  constructor(private router: Router, private http:HttpClient, private postsService:PostsService, private userService:UsersService, public auth : AuthService) {

    this.userService.getUsers()
      .subscribe((res: User[]) => {
        console.log(res);
        this.users = res;
        this.usersSubject.next([...this.users]);
      });

  }




  editingIndex : number = -1;
  editingComment : ForumComment = {_id:'', userId:'',timestamp:new Date(),comment:''};
  showDiv: boolean = false;

  findUserById(userId:string) {

    const user = this.users.find(u => u._id === userId);

    if (user)
      return {...user};
    return null;
  }


  addPost(){

    if (this.new.userId && this.new.comment.length > 0){
      console.log(this.new);
      this.postsService.addPost(this.new)
        .subscribe((res => {
          console.log(res);
          this.posts.push(this.new);
          this.new=new ForumComment();

          if(this.user && this.user._id)
              this.new.userId = this.user._id;

          this.ngOnInit();
        }))

    }

  }


  deletePost(i:number){
    console.log(i);
    let c = this.posts[i];
    console.log(c._id);
    if (c._id) this.postsService.deletePost(c._id)
      .subscribe((res => {
        console.log(res);
        this.posts.splice(i,1);
      }));

  }

  setEdit(i:number){
    this.editingComment= {...this.posts[i]};
    this.editingIndex=i;
    console.log(this.editingComment + "trouble1");
  }

  doneEditing(i: number) {
    let c = this.posts[i];

    this.postsService.editPost(this.editingComment).subscribe({
      next: (res) => {
        console.log(res);
        this.editingIndex = -1;
        this.posts[i] = this.editingComment;
        this.editingComment = new ForumComment();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.editingIndex = -1;
  }


  ngOnDestroy(){
    if (this.authChangeSubscription)
      this.authChangeSubscription.unsubscribe();
  }

}
