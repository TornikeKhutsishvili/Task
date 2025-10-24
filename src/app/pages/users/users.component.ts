import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/user.module';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  router = inject(Router);
  userService = inject(UserService);
  searchService = inject(SearchService);

  loading = signal(true);
  users = signal<User[]>([]);
  searchTerm = signal('');

  filteredUsers = computed(() => {
    const query = this.searchService.searchQuery().toLowerCase().trim();
    if (!query) return this.users();
    return this.users().filter(u =>
      u.name.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
    );
  });

  constructor() {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users.set(data);
        console.log('Users fetched:', data);
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching users', error);
        this.loading.set(false);
      }
    });
  }

  goToPosts(userId: number): void {
    this.router.navigate(['/user-details'], { queryParams: { userId } });
  }

  goToTodos(userId: number): void {
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.updateSearchQuery(value);
  }

}