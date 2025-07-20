import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-departures',
   imports: [CommonModule, FormsModule],
  templateUrl: './departures.component.html',
  styleUrl: './departures.component.css'
})
export class DeparturesComponent {
  stationName = '';
  departures: any[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  search() {
    this.http.get<any>(`${environment.apiUrl}/api/station/${encodeURIComponent(this.stationName)}`)
      .subscribe({
        next: (data) => {
          this.departures = data.stationboard;
          this.errorMessage = null;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Unable to reach the server. Please try again later.';
          this.departures = [];
        }
      });
  }
}

