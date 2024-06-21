import { Component, OnInit, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter/>
      <button class="primary" type="button"
      (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    // this.housingLocationList =  this.housingService.getAllHousingLocations().subscribe();
    
  }

  ngOnInit(): void {
    this.housingService.getAllHousingLocations().subscribe({
      next: data => {
        this.housingLocationList = data,
        this.filteredLocationList = this.housingLocationList;
      },
      error: error => { console.error('There was an error!', error)}
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
