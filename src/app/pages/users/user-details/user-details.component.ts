import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../modules/post.module';
import { UserService } from '../../../services/user.service';
import { User } from '../../../modules/user.module';

import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  postService = inject(PostService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);

  userId = signal<number | null>(null);
  posts = signal<Post[]>([]);
  users = signal<User[]>([]);
  loading = signal(true);
  selectedPost = signal<Post | null>(null);

  filteredPosts = computed(() => {
    const user_id = this.userId();
    const all = this.posts() || [];
    return user_id ? all.filter((p: Post) => p.userId === user_id) : all;
  });

  ngOnInit() {
    this.getAllUser();

    this.route.queryParams.subscribe(query => {
      const id = query['userId'] ? +query['userId'] : null;
      this.userId.set(id);

      if (id) {
        this.getPosts(id);
      }
    });
  }

  getPosts(userId: number) {
    this.loading.set(true);
    this.postService.getPostsByUserId(userId).subscribe({
      next: (data: Post[]) => {
        this.posts.set(data);
        console.log('Posts fetched:', data);
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching posts:', error);
        this.loading.set(false);
      }
    });
  }

  getAllUser() {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users.set(data);
        console.log('Posts fetched:', data);
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching posts:', error);
        this.loading.set(false);
      }
    })
  }

  getUserName(userId: number): string {
    const user = this.users().find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  }

  openDetail(post: Post) {
    this.selectedPost.set(post);
  }

  trackById(index: number, item: Post) {
    return item.id;
  }

}