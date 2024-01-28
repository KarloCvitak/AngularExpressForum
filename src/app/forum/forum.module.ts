export class ForumComment{
  _id?:string;
  userId:string="";
  timestamp:Date =new Date()
  comment:string="";

}
export class User {
  _id? : string = '';
  username : string= '';
  password : string= '';
  name : string= '';
  email : string= '';


}


export interface UserApiResponse {
  status: string;
  users: User[];
}

export interface CommentApiRespone {
  status: string;
  posts: ForumComment[];
}
