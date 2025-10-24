import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Component,
  signal
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isMenuOpen = signal<boolean>(false);

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}