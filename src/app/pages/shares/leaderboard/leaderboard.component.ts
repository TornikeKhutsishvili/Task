import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  LeaderboardEntry,
  WeekType
} from '../../../modules/leaderboard.module';

import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  weeks: WeekType[] = ['I', 'II', 'III', 'IV'];
  filters: ('ALL' | WeekType)[] = ['ALL', 'I', 'II', 'III', 'IV'];
  activeFilter = signal<'ALL' | WeekType>('ALL');

  leaderboardData = signal<LeaderboardEntry[]>([]);
  filteredData = computed(() => {
    if (this.activeFilter() === 'ALL') return this.leaderboardData();
    return this.leaderboardData().filter(e => e.week === this.activeFilter());
  });

  ngOnInit(): void {
    const saved = localStorage.getItem('leaderboardData');

    if (saved) {
      this.leaderboardData.set(JSON.parse(saved));
      return;
    }

    const data: LeaderboardEntry[] = [];
    const weekTypes: WeekType[] = ['I', 'II', 'III', 'IV'];

    let customerId = 1;
    weekTypes.forEach(week => {
      const playersCount = Math.floor(Math.random() * 10) + 10;

      for (let i = 0; i < playersCount; i++) {
        data.push({
          customerId: customerId++,
          loginName: `user${ Math.floor(Math.random() * 1000) }`,
          place: i + 1,
          week
        });
      }
    });

    localStorage.setItem('leaderboardData', JSON.stringify(data));
    this.leaderboardData.set(data);
  }

  ngOnDestroy() {
    localStorage.removeItem('leaderboardData');
  }

  setFilter(week: 'ALL' | WeekType) {
    this.activeFilter.set(week);
  }

  isActive(week: 'ALL' | WeekType) {
    return this.activeFilter() === week;
  }

}