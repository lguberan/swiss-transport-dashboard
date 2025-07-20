import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeparturesComponent } from './departures/departures.component';

@Component({
  selector: 'app-root',
  imports: [DeparturesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'transport';
}
