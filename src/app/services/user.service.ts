import { HttpClient } from '@angular/common/http';
import { Player } from '../modules/leaderboard.module';
import { User } from '../modules/user.module';

import {
  map,
  Observable
} from 'rxjs';

import {
  inject,
  Injectable,
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private http = inject(HttpClient);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUsersWithScore(): Observable<Player[]> {
    return this.getUsers().pipe(
      map((users: User[]) =>
        users.map((user: User) => ({
          id: user.id,
          name: user.name,
          score: Math.floor(Math.random() * 1000),
          avatar: `https://i.pravatar.cc/100?img=${user.id}`
        }))
      )
    );
  }

  getUserTodos(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/todos`, {
      params: { userId: userId.toString() }
    });
  }

}