import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  OnDestroy,
  signal,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnDestroy, AfterViewInit {

  @ViewChild('wheel') wheelRef!: ElementRef<HTMLDivElement>;
  @ViewChild('indicator') indicatorRef!: ElementRef<HTMLDivElement>;

  sectorCount = signal(10);
  rotation = signal(0);
  inputValue = signal<number | null>(null);
  error = signal('');
  isSpinning = signal(false);
  activeSector = signal<number | null>(null);

  private offset = 0;

  ngAfterViewInit() {
    this.calculateOffset();
  }

  calculateOffset() {
    const wheel = this.wheelRef.nativeElement.getBoundingClientRect();
    const indicator = this.indicatorRef.nativeElement.getBoundingClientRect();

    const ix = indicator.left + indicator.width / 2;
    const iy = indicator.top + indicator.height / 2;

    const wx = wheel.left + wheel.width / 2;
    const wy = wheel.top + wheel.height / 2;

    const angleRad = Math.atan2(wy - iy, ix - wx);
    const angleDeg = (angleRad * 180) / Math.PI;

    this.offset = (angleDeg + 360) % 360;
  }

  constructor() {
    const savedRotation = localStorage.getItem('wheelRotation');
    if (savedRotation) {
      this.rotation.set(+savedRotation);
    }

    effect(() => {
      localStorage.setItem('wheelRotation', this.rotation().toString());
    });
  }

  spinWheel() {
    const value = this.inputValue();
    const sectors = this.sectorCount();

    if (!value || value < 1 || value > sectors) {
      this.error.set('The specified sector could not be found.');
      return;
    }

    this.error.set('');
    this.isSpinning.set(true);
    this.activeSector.set(null);

    const sectorAngle = 360 / sectors;
    const targetAngle = ((((sectors - value) * sectorAngle) + ((sectorAngle / 2)) + this.offset));
    const randomExtraSpins = 4 + Math.floor(Math.random() * 2);
    const finalRotation = randomExtraSpins * 360 + targetAngle - 72;

    this.rotation.set(finalRotation);

    setTimeout(() => {
      this.isSpinning.set(false);
      this.activeSector.set(value);
    }, 4000);
  }

  rotationStyle() {
    return `rotate(${this.rotation()}deg)`;
  }

  ngOnDestroy() {
    localStorage.removeItem('wheelRotation');
  }

}