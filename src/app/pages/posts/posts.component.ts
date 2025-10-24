import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../modules/post.module';
import { UserService } from '../../services/user.service';
import { User } from '../../modules/user.module';

declare var bootstrap: any;

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postService = inject(PostService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);

  userId = signal<number | null>(null);
  posts = signal<Post[]>([]);
  users = signal<User[]>([]);
  loading = signal(true);
  selectedPost = signal<Post | null>(null);

  modalInstance: any;

  constructor() { }

  ngOnInit() {
    this.getAllUser();

    this.route.queryParams.subscribe(query => {
      const id = query['userId'] ? +query['userId'] : null;
      this.userId.set(id);

      if (id) {
        this.getPosts(id);
      } else {
        this.getAllPosts();
      }
    });
  }

  ngAfterViewInit() {
    const modalEl = document.querySelector('#exampleModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
    }
  }

  getAllPosts() {
    this.loading.set(true);
    this.postService.getAllPosts().subscribe({
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
      next: (us: User[]) => {
        this.users.set(us);
        console.log('Users fetched:', us);
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
    return user?.name ?? user?.username ?? 'Unknown User';
  }

  openDetail(post: Post) {
    this.selectedPost.set(post);
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
    this.selectedPost.set(null);
  }

  trackById(index: number, item: Post) {
    return item.id;
  }

}