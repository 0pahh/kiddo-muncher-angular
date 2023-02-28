import { Component, OnInit } from '@angular/core';
import { Simulation } from './models/Simulation';

@Component({
  selector: 'kiddo-muncher-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kiddo-muncher';
  test = new Simulation();
  simulation2: any[][] = [];
  async ngOnInit(): Promise<void> {
    const simulation = this.test.returnSimulation();
    // this.simulation2 = simulation[0];

    for (const array of simulation) {
      this.simulation2 = array;
      await new Promise((resolve) => setTimeout(resolve, 250)); // Wait for 500ms before logging the next array
    }
  }
}
