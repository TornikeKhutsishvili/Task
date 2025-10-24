import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';
import { Todo } from '../../modules/todo.module';
import { User } from '../../modules/user.module';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  route = inject(ActivatedRoute);
  userService = inject(UserService);

  todos = signal<Todo[]>([]);
  users = signal<User[]>([]);
  selectedUser = signal<User | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.queryParamMap.get('userId'));
    if (userId) this.fetchTodos(userId);
  }

  fetchTodos(userId: number) {
    this.loading.set(true);
    this.userService.getUserTodos(userId).subscribe({
      next: (data: Todo[]) => {
        this.todos.set(data);
        console.log("this is todo", data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });

    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users.set(data);

        const user = data.find((u: User) => u.id === userId);
        this.selectedUser.set(user || null);

        console.log("this is users", data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    })
  }

}