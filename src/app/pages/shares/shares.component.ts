import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WheelComponent } from "./wheel/wheel.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";

@Component({
  selector: 'app-shares',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WheelComponent,
    LeaderboardComponent
],
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.scss']
})
export class sharesComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}