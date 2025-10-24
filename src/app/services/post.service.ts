import { HttpClient } from '@angular/common/http';
import { Post } from '../modules/post.module';
import { Observable } from 'rxjs';

import {
  inject,
  Injectable,
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private http = inject(HttpClient);

  constructor() { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostsByUserId(userId: number) {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, {
      params: { userId: userId.toString() }
    });
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

}