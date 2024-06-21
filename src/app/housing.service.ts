import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HousingService {
  constructor(private http: HttpClient) { 
     // This service can now make HTTP requests via `this.http`.
  }
  url = 'http://localhost:3000/locations';

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url).pipe(
      map(data => data ?? [])
    );
  }
  
  getHousingLocationById(id: number): Observable<HousingLocation | 
undefined> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`).pipe(
      map(data => data ?? {})
    );
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

}
