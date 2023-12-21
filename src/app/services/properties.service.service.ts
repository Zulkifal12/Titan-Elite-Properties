import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Property } from '../interfaces/properties';
import { apiURL } from '../utilities/app.const';

@Injectable({
  providedIn: 'root',
})
export class PropertiesServiceService {
  endPointUrl = apiURL;
  constructor(public http: HttpClient) {}
  //Getting properties from the API
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.endPointUrl).pipe(
      tap((resp) => {
        resp = new Array<Property>();
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }
  //Updating properties from the API
  updateProperties(property: Property) {
    return this.http
      .put<Property>(this.endPointUrl + `/${property.id}`, property)
      .pipe(
        tap(() => {}),
        catchError((err) => {
          return of(err);
        })
      );
  }

  //Deleting properties from the API

  deleteProperty(id: number) {
    return this.http.delete(this.endPointUrl + `/${id}`).pipe(
      tap(() => {}),
      catchError((err) => {
        return of(err);
      })
    );
  }

  //Adding properties from the API
  addProperty(property: Property) {
    return this.http.post(this.endPointUrl, property).pipe(
      tap(() => {}),
      catchError((err) => {
        return of(err);
      })
    );
  }
}
