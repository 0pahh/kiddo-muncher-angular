import { Component, OnInit } from '@angular/core';
import { Simulation } from './models/Simulation';

@Component({
  selector: 'kiddo-muncher-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kiddo-muncher';
  test = new Simulation();
  simulation2: any[][] = [];
  start = false;

  interval: any;

  startSimulation(): void {
    this.start = !this.start;
    if (this.start) {
      let simulation = this.test.returnSimulation();
      let i = 0;
      this.interval = setInterval(() => {
        if (i === simulation.length - 1) {
          clearInterval(this.interval);
          this.start = false;
        }
        this.simulation2 = simulation[i];
        i++;
      }, 110);
    } else {
      this.simulation2 = [];

      if (this.interval) clearInterval(this.interval);
    }
  }
}
