import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from "../navigation/navigation.component";

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  Component,
  OnDestroy,
  signal
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    NavigationComponent
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  now = signal(new Date());
  private timerId: any;

  constructor() {
    this.timerId = setInterval(() => this.now.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

}
