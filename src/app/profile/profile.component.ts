import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {PostsService} from "../posts.service";
import {ForumComment, User} from "../forum/forum.module";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{


  constructor(private userService: UsersService,private router: Router, private http:HttpClient, private postsService:PostsService, private auth : AuthService) {
  }
  users : User[] = [];
  posts : ForumComment[] = [];
  user : User | null = null;

  ngOnInit(): void {

    this.user = this.auth.getUser();

    this.userService.getUsers()
      .subscribe((res : User[]) => {
        console.log(res);
        this.users=res;
      });

    this.postsService.getPosts()
      .subscribe((res: ForumComment[]) => {
        console.log(res);
        this.posts = res.filter((post) => post.userId === this.user?._id);
      });




  }


  protected readonly ForumComment = ForumComment;
}
