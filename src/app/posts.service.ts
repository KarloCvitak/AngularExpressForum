import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ForumComment} from "./forum/forum.module";
import {environment} from "../enviroments/envoriment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsUrl = environment.API_URL + '/api/posts';
  constructor(private http:HttpClient) { }

  getPosts():Observable<ForumComment[]>{

    return this.http.get(this.postsUrl)
      .pipe(
        map((res: any) => res.posts)
      ) as Observable<ForumComment[]>;


  }

  addPost(post:ForumComment){
    return this.http.post(this.postsUrl,post);

  }



  deletePost(id:string){
    return this.http.delete(`${this.postsUrl}/${id}`)
  }

  editPost(post:ForumComment){
    return this.http.put(`${this.postsUrl}`,post)
  }

}
